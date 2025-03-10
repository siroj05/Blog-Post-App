import { deleteUser } from "@/service/gorestApi";
import { PoweroffOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Avatar, Button, message, Popover } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);
  const route = useRouter()

  const deleteUserMutation = useMutation({
    mutationFn : (id : string) => deleteUser(id),
    onSuccess : () => {
      message.success("Log out Success!")
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      route.push("/")
    },
    onError : (error) => {
      message.error(`Log out failed error : ${error}`)
    }
  })

  const onlogout = () => {
    deleteUserMutation.mutate(user?.id??0)
  }

  return (
    <div className="sticky top-0 z-40 bg-[#f0f8ff] w-full">
      <div className="flex text-xl p-3 max-w-7xl mx-auto justify-between ">
        <Link href={"/posts"}>
          <h1 className="font-bold">Blog Post</h1>
        </Link>
        <Popover placement="bottomRight" className="hover:underline" content={
          <Button loading={deleteUserMutation.isPending || deleteUserMutation.isSuccess} onClick={onlogout} type="text" icon={<PoweroffOutlined />}>Log out</Button>
        }>
          <div className="flex gap-2 cursor-pointer">
            <p className="my-auto text-sm">{user?.name??""}</p>
            <Avatar/>
          </div>
        </Popover>
      </div>
      <hr />
    </div>
  );
}
