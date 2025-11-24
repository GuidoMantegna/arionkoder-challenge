import { CenterLanding } from "@/components/center-landing"

export default function CenterPage({
  params,
}: {
  params: Promise<{ center: string }>
}) {
  return <CenterLanding params={params} />
}
