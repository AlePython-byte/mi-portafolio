import FlatPortfolio from "@/components/FlatPortfolio";
import PortfolioShell from "@/components/PortfolioShell";
import { resolveRetroAssets } from "@/lib/retroAssets";

export default function Home() {
  return (
    <PortfolioShell assets={resolveRetroAssets()}>
      <FlatPortfolio />
    </PortfolioShell>
  );
}
