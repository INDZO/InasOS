import Overview, { overviewMetadata } from "./Overview";

export const metadata = overviewMetadata("en");

export default function OverviewPage() {
  return <Overview language="en" />;
}
