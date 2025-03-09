'use client'

import UserInfo from "@/components/userInfo"
import { detailPost, detailUser } from "@/service/gorestApi"
import { useQuery } from "@tanstack/react-query"
import { Avatar, Popover, Skeleton } from "antd"

export default function DetailPost({
  params
}:{
  params : { id : string }
}) {

  const {data, isPending} = useQuery({
    queryKey: ["detail", params.id],
    queryFn: () => detailPost(params.id)
  })

  const {data:user, isPending:userPending} = useQuery({
    queryKey: ["user", data?.user_id],
    queryFn: () => detailUser(data?.user_id??0)
  })

  return (
    <div>
      <div className="space-y-10">
        {
          (isPending && userPending) ?
          <>

            <Skeleton active paragraph={{ rows: 0 }}/>
            <div className="flex gap-2">
              <Skeleton.Avatar active size={"large"}/>
              <div className="flex flex-col my-auto">
                <Skeleton.Node active style={{ width: 100, height: 10}} />
                <Skeleton.Node active style={{ width: 90, height: 10}} />
              </div>
            </div>
            <hr /><hr />
            <Skeleton active />
          </> :
          <>
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
          </>
        }
      </div>
    </div>
  )
}