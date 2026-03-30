import { useTheme } from "@/hooks/use-theme";

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize theme on mount (applies data-theme attribute)
  useTheme();
  return <>{children}</>;
}
