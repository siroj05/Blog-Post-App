export type PostsModel = {
  id : number
  user_id : number
  name : string
  title : string
  body : string
  usersModel? : UsersModel
}

export type UsersModel = {
  id : number
  name : string
  email : string
  gender : string
  status : string
}