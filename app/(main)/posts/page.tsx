'use client'
import { postsList } from "@/service/gorestApi"
import { PostsModel } from "@/service/type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { List, Space, Input } from 'antd';
import Link from "next/link";
import { useState } from "react";

export default function Posts () {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState("")
  const {isPending, isError, data, error, isPlaceholderData} = useQuery({
    queryKey: ['todos', page, pageSize],
    queryFn : () => postsList(page, pageSize),
    placeholderData : keepPreviousData,
  })
  return (
    <div className="w-full">
      <Space direction="vertical" style={{ marginBottom: '20px' }} size="middle" className="w-full">
          <Input.Search 
            placeholder="Search.."  
            onSearch={
              (value) => setSearch(value)
            }
            enterButton="Search"
            size="large"
          />
          <List 
            pagination={
              {
                position : 'bottom', 
                align : 'center',
                pageSize: pageSize,
                current : page,
                total: data?.totalPosts || 0,
                onChange: (page, pageSize) => {
                  setPage(page)
                  setPageSize(pageSize)
                }
              }
            }
            dataSource={data?.posts}
            renderItem={(item : PostsModel) => (
              <List.Item>
                <List.Item.Meta
                  title={<Link href={"#"}>{item.title}</Link>}
                  description={item.body}
                />
              </List.Item>
            )}
          />
      </Space>
    </div>
  )
}