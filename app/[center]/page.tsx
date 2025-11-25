import { CenterLanding } from "@/components/center-landing";
import api from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ center: string }>;
}) {
  const { center } = await params;
  const centerData = await api.fetch(center);

  return {
    title: centerData.name,
  };
}

export default function CenterPage({
  params,
}: {
  params: Promise<{ center: string }>;
}) {
  return <CenterLanding params={params} />;
}
