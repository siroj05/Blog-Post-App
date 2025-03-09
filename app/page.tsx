"use client";

import CreateForm from "@/components/createForm";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user && pathname == "/") {
      router.replace("/posts");
    }
  }, [router, pathname]);
  return (
    <main className="flex justify-center items-center h-screen">
      <CreateForm />
    </main>
  );
}
