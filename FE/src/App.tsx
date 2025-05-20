import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SoundProvider } from "@/lib/SoundContext";
import { useEffect, useState } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import LoveButton from "@/components/LoveButton";
import LoadingScreen from "@/components/LoadingScreen";
import Router from "@/components/Router";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SoundProvider>
        <TooltipProvider>
          <Toaster />
          {loading ? <LoadingScreen /> : (
            <>
              <Router />
              <MusicPlayer />
              <LoveButton />
            </>
          )}
        </TooltipProvider>
      </SoundProvider>
    </QueryClientProvider>
  );
}

export default App;
