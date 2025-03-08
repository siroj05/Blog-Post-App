import { Button, FormInstance, Modal } from "antd";
import { Form, Input } from "antd";
interface Props {
  isOpenDialog: boolean;
  setIsOpenDialog: (value: boolean) => void;
  form : FormInstance<any>
  onPublish : () => void
}

export default function ModalDialogCreatePost({
  isOpenDialog,
  setIsOpenDialog,
  form,
  onPublish
}: Props) {

  return (
    <Modal
      title="Write Post"
      centered
      open={isOpenDialog}
      onOk={onPublish}
      onCancel={() => setIsOpenDialog(false)}
      okText="Publish"
    >
      <Form
        form={form}
        variant="underlined"
        className="w-full"
        layout="vertical"
      >
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
      </Form>
    </Modal>
  );
}
