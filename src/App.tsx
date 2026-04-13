/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Atmosphere } from "./components/Atmosphere";
import { Story } from "./components/Story";
import { VoiceChat } from "./components/VoiceChat";

export default function App() {
  return (
    <main className="min-h-screen relative selection:bg-white/20">
      <Atmosphere />
      <Story />
      <VoiceChat />
    </main>
  );
}

