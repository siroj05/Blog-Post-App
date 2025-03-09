'use client'
import { createUser } from "@/service/gorestApi"
import { useMutation } from "@tanstack/react-query"
import { Card, Input, Form, Button, message } from "antd"
import { useRouter } from "next/navigation"

type FieldType = {
  name : string
  token : string
}
export default function CreateForm(){
  const router = useRouter()
  const [form] = Form.useForm()

  const mutation = useMutation({
    mutationFn : ({name, token}:FieldType) => createUser(name, token),
    onSuccess : (data) => {
      message.success(`User berhasil dibuat`)
      localStorage.setItem("user", JSON.stringify({id : data.id, name : data.name}))
      form.resetFields()
      router.push("/posts")
    },
    onError: (error) => {
      message.error(`Gagal membuat user: ${error.message}`)
    }
  })

  const onSubmit = (values : FieldType) => {
    mutation.mutate(values)
  }

  return (
    <Card title="Welcome" variant="borderless" className="w-96">
        <Form
          name="basic"
          autoComplete="off"
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            layout="vertical"
            rules={[{required : true, message: "Name cannot be blank"}]}
            >
              <Input size="large"/>
          </Form.Item>
          <Form.Item<FieldType>
            label="Go Rest Token"
            name="token"
            layout="vertical"
            rules={[{required : true, message: "Go Rest Token cannot be blank"}]}
            >
              <Input size="large"/>
          </Form.Item>

          <Form.Item label={null}>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full"
              loading={mutation.isPending}
              >
               {
                mutation.isPending? " " : "Create"
               }
            </Button>
          </Form.Item>

        </Form>
      </Card>
  )
  
}