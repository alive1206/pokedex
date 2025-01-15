import { HomeViews } from "@/containers";
import { Suspense } from "react";

export default function HomeScreen() {
  return (
    <Suspense>
      <HomeViews />
    </Suspense>
  );
}
