import { DetailViews } from "@/containers";

export default async function DetailScreen({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  return <DetailViews id={slug} />;
}
