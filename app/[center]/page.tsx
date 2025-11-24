import { CenterLanding } from "@/components/center-landing"

export async function generateMetadata({params}: {params: Promise<{center: string}>}) {
  const {center} = await params;

  return {
    title: center,
  };
}


export default function CenterPage({
  params,
}: {
  params: Promise<{ center: string }>
}) {
  return <CenterLanding params={params} />
}
