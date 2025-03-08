import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createUser = async (name : string, token : string) => {
  
  const res = await axios.post(
    `${BASE_URL}/v2/users`,
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

export const postsList = async (page : number, pageSize: number) => {
  const token = localStorage.getItem("token")
  const res = await axios.get(
    `${BASE_URL}/posts`,
    {
      params : {
        page : page, 
        per_page : pageSize
        // title : title
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