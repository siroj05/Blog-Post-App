import axios from "axios"
import { PostsModel, UsersModel } from "./type"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createUser = async (name : string, token : string) => {
  const res = await axios.post(
    `${BASE_URL}/users`,
    {
      name,
      email : `${name.toLowerCase().replace(/\s/g, "")}@example.com`,
      gender : "male",
      status : "active"
    },
    {
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    }
  )
  localStorage.setItem("token", token)
  return res.data
}

export const postsList = async (page : number, pageSize: number, search: string) => {
  const token = localStorage.getItem("token")
  const res = await axios.get(
    `${BASE_URL}/posts`,
    {
      params : {
        page : page, 
        per_page : pageSize,
        title : search
      },
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    }
  )

  return {
    posts : res.data,
    totalPosts: parseInt(res.headers["x-pagination-total"])
  }
}

export const detailPost = async (id:string) => {
  const token = localStorage.getItem("token")
  const res = await axios.get(
    `${BASE_URL}/posts/${id}`,
    {
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    }
  )
  return res.data as PostsModel
}

export const detailUser = async (id : number) => {
  const token = localStorage.getItem("token")
  const detailUser = await axios.get(
    `${BASE_URL}/users/${id}`,
    {
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    }
  )
  return detailUser.data as UsersModel
}

export const createPost = async ( title : string, body : string) => {
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")
  const userId = user? JSON.parse(user).id : 0
  const res = await axios.post(
    `${BASE_URL}/users/${userId}/posts`,
    {
      title : title,
      body : body
    },
    {
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    }
  )
  
  return res.data
}

export const deletePost = async (id : number) => {
  const token = localStorage.getItem("token")
  const res = await axios.delete(
    `${BASE_URL}/posts/${id}`,
    {
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    }
  )

  return res.data
}

export const updatePost = async (id : number, title : string, body : string) => {
  const token = localStorage.getItem("token")
  const res = await axios.put(
    `${BASE_URL}/posts/${id}`,
    {
      id : id,
      title : title,
      body : body
    },
    {
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    }
  )

  return res.data
}

export const deleteUser = async (id : string) => {
  const token = localStorage.getItem("token")
  const res = await axios.delete(
    `${BASE_URL}/users/${id}`,
    {
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    }
  )

  return res.data
}
