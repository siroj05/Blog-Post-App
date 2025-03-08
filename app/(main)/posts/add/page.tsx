'use client'
import { Form, Input } from "antd";

export default function WritePost(){

  const [form] = Form.useForm()

  return(
    <Form
      form={form}
      variant="underlined"
      className="w-full"
      layout="vertical"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{required: true, message: "Title cannot be blank"}]}
      >
        <Input placeholder="Write title.."/>
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{required: true, message: "Description cannot be blank"}]}
      >
        <Input.TextArea placeholder="Write Description.."/>
      </Form.Item>

    </Form>
  )
}