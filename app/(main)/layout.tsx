import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return(
    <div className="p-10 max-w-3xl mx-auto">
      {children}
    </div>
  )
}