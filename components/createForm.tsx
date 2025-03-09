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
    onError : (error : any) => {
      if(error?.response?.status == 401){
        message.error(`${error?.response?.data?.message??""}`)
      }else if (error?.response?.status == 422){
        if(error?.response?.data[0].field == "name"){
          message.error(`${error?.response?.data[0].field} ${error?.response?.data[0].message}`)
        }else{
          message.error(`Name has already been taken`)
        }
      }
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
              loading={mutation.isPending || mutation.isSuccess}
              >
               Create
            </Button>
          </Form.Item>

        </Form>
      </Card>
  )
  
}