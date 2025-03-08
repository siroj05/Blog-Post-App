import { UsersModel } from "@/service/type"
import { Avatar } from "antd"

const UserInfo = (user : UsersModel | undefined) => {
  return(
    <div>
      <Avatar className="w-14 h-14 my-3"/>
      <p>Email : {user?.email?? "Unknown"}</p>
      <p>Name : {user?.name?? "Unknown"}</p>
      <p>Status : {user?.status?? "Unknown"}</p>
    </div>
  )
}

export default UserInfo