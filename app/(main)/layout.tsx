'use client'
import Navbar from "@/components/navbar";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if(!token && !user && pathname !== "/"){
      router.replace("/")
    }
  },[router, pathname])
  return(
    <div>
      <Navbar/>
      <div className="p-10 max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  )
}