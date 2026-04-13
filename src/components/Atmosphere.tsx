import { motion } from "motion/react";

export function Atmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0c10]">
      {/* Deep Background Gradient */}
      <div className="absolute inset-0 bg-radial-[at_50%_30%] from-[#1a1f26] to-[#0a0c10] opacity-80" />
      
      {/* Fog Layers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-radial-[at_30%_40%] from-white/5 to-transparent blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] bg-radial-[at_70%_60%] from-white/5 to-transparent blur-[100px]" />
      </motion.div>

      {/* Drifting Clouds */}
      <motion.div
        animate={{ x: ["-10%", "10%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]" />
      </motion.div>

      {/* Rain Effect (Subtle) */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 100 + "%" }}
            animate={{ y: "110vh" }}
            transition={{
              duration: 0.5 + Math.random() * 0.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            className="absolute w-[1px] h-10 bg-white"
          />
        ))}
      </div>
    </div>
  );
}
