"use client";
import Link from "next/link";

export default function ErrorPage({ error }: { error: Error }) {
  console.error(error);

  return (
    <div className="w-full h-[100vh] bg-primary flex flex-col items-center justify-center">
      <h3 className="text-center text-white text-2xl">
        Something went wrong, try again!
      </h3>
      <Link href="/" className="mt-10 font-semibold text-xl">
        Home
      </Link>
    </div>
  );
}
