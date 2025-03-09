'use client'

import { detailPost, updatePost } from "@/service/gorestApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Button, Form, Input, message } from "antd"
import { useForm } from "antd/es/form/Form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type FieldType = {
  id : number
  title : string
  body : string
}

export default function EditPost({
  params
}:{
  params : {id : string}
}){
  const route = useRouter()
  console.log(params)
  const [form] = useForm()
  const {data, isPending} = useQuery({
    queryKey: ["detail", params?.id],
    queryFn: () => detailPost(params?.id),
  })

  useEffect(() => {
    form.setFieldsValue({
      title : data?.title??"",
      body : data?.body??"",
      id : data?.id??""
    })
  },[data, form])

  const updateMutation = useMutation({
    mutationFn : ({id, title, body}:FieldType) => updatePost(id,title, body),
    onSuccess : () => {
      form.resetFields()
      message.success("Saved updates!")
      route.push("/posts")
    },
    onError : (error) => {
      message.error(`Failed to save update error : ${error.message}`)
    }
  })

  const onUpdate = (values : FieldType) => {
    updateMutation.mutate(values)
  }

  return(
    <div className="space-y-10">
      <h1 className="font-bold text-3xl">Edit Post</h1>
      <Form
        form={form}
        variant="underlined"
        className="w-full"
        layout="vertical"
        onFinish={onUpdate}
      >
        <Form.Item
          name="id"
          hidden
        >
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title cannot be blank" }]}
        >
          <Input placeholder="Write title.." />
        </Form.Item>
        <Form.Item
          label="Description"
          name="body"
          rules={[{ required: true, message: "Description cannot be blank" }]}
        >
          <Input.TextArea placeholder="Write Description.." />
        </Form.Item>
        <div className="flex justify-end">
          <Form.Item label={null}>
              <Button 
                type="primary" 
                htmlType="submit"
                size="large" 
                loading={updateMutation.isPending}
                >
                {
                  updateMutation.isPending? " " : "Save"
                }
              </Button>
            </Form.Item>
        </div>
      </Form>
    </div>
  )
}