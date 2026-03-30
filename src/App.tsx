import { Providers } from "@/components/providers";
import { SceneCanvas } from "@/components/scene/scene-canvas";
import { Toolbar } from "@/components/hud/toolbar";
import { WelcomeOverlay } from "@/components/hud/welcome-overlay";

export function App() {
  return (
    <Providers>
      <SceneCanvas>
        <Toolbar />
        <WelcomeOverlay />
      </SceneCanvas>
    </Providers>
  );
}
