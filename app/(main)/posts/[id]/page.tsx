'use client'

import UserInfo from "@/components/userInfo"
import { detailPost, detailUser } from "@/service/gorestApi"
import { useQuery } from "@tanstack/react-query"
import { Avatar, Popover } from "antd"

export default function DetailPost({
  params
}:{
  params : { id : string }
}) {

  const {data, isPending, isError} = useQuery({
    queryKey: ["detail", params.id],
    queryFn: () => detailPost(params.id)
  })

  const {data:user, isPending:userPending, isError:userError} = useQuery({
    queryKey: ["user", data?.user_id],
    queryFn: () => detailUser(data?.user_id??0)
  })

  return (
    <div>
      <div className="space-y-10">
        <h1 className="text-5xl font-bold">
          {data?.title}
        </h1>
        <Popover placement="bottom" content={UserInfo(user)} title={"Author"}>
          <div className="gap-2 inline-flex  cursor-pointer">
            <Avatar className="h-10 w-10"/>
            <div className="my-auto hover:underline">
              <p className="text-sm">
                {user?.name?? "Unknown"}
              </p>
              <p className="text-xs text-slate-600">
                {user?.email?? "Unknown"}
              </p>
            </div>
          </div>
        </Popover>
        <hr />
        <hr />
        <p>
          {data?.body}
        </p>
      </div>
    </div>
  )
}