import { useState, useEffect, useRef } from "react";
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { Mic, MicOff, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AudioStreamer, AudioRecorder } from "@/src/lib/audio-utils";
import { cn } from "@/src/lib/utils";

const SYSTEM_INSTRUCTION = `
あなたはプロのフォトグラファーであり、物語「雲の中の仕事」の作者です。
ユーザーと、山の中での撮影体験、ラリーの魅力、機材へのこだわり、そして「雲の中」という極限状態での仕事について語り合ってください。
落ち着いた、経験豊かなプロフェッショナルな口調で話してください。
物語の背景にある感情や、技術的な苦労、そしてなぜ「B地点」を選んだのかといった哲学についても深く語ることができます。
`;

export function VoiceChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const sessionRef = useRef<any>(null);
  const streamerRef = useRef<AudioStreamer | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      streamerRef.current = new AudioStreamer();
      
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            setIsListening(true);
            
            recorderRef.current = new AudioRecorder((base64Data) => {
              session.sendRealtimeInput({
                audio: { data: base64Data, mimeType: "audio/pcm;rate=16000" }
              });
            });
            recorderRef.current.start();
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              streamerRef.current?.addPCMChunk(message.serverContent.modelTurn.parts[0].inlineData.data);
            }
            
            if (message.serverContent?.modelTurn?.parts?.[0]?.text) {
              // Handle text if needed, but we are using audio
            }

            if (message.serverContent?.interrupted) {
              streamerRef.current?.stop();
              streamerRef.current = new AudioStreamer();
            }
          },
          onclose: () => {
            stopSession();
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Charon" } }
          },
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });
      
      sessionRef.current = session;
    } catch (error) {
      console.error("Failed to connect to Live API:", error);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    sessionRef.current = null;
    recorderRef.current?.stop();
    recorderRef.current = null;
    streamerRef.current?.stop();
    streamerRef.current = null;
    setIsConnected(false);
    setIsListening(false);
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-white/20 transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 z-50 w-80 bg-[#151619]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-serif text-lg">作者と対話する</h3>
                <button 
                  onClick={() => {
                    stopSession();
                    setIsOpen(false);
                  }}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center py-8 space-y-6">
                <div className="relative">
                  <AnimatePresence>
                    {isConnected && isListening && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white/20 rounded-full blur-xl"
                      />
                    )}
                  </AnimatePresence>
                  
                  <button
                    onClick={isConnected ? stopSession : startSession}
                    disabled={isConnecting}
                    className={cn(
                      "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500",
                      isConnected ? "bg-white text-black" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    )}
                  >
                    {isConnecting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : isConnected ? (
                      <Mic className="w-8 h-8" />
                    ) : (
                      <MicOff className="w-8 h-8 opacity-50" />
                    )}
                  </button>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-white font-medium">
                    {isConnecting ? "接続中..." : isConnected ? "お話しください" : "マイクをオンにして開始"}
                  </p>
                  <p className="text-white/40 text-xs px-4">
                    山の中での体験や撮影のこだわりについて、作者に直接聞くことができます。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-4 flex items-center justify-center">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={isConnected ? { height: [4, 12, 4] } : { height: 4 }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-white/30 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
