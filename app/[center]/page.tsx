import { CenterLanding } from "@/components/center-landing";
import { CENTERS } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ center: string }>;
}) {
  const { center } = await params;

  return {
    title: CENTERS.find((item) => item.id === center)?.name,
  };
}

export default function CenterPage({
  params,
}: {
  params: Promise<{ center: string }>;
}) {
  return <CenterLanding params={params} />;
}
