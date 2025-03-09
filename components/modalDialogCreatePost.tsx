import { Button, FormInstance, Modal } from "antd";
import { Form, Input } from "antd";
interface Props {
  isOpenDialog: boolean;
  setIsOpenDialog: (value: boolean) => void;
  form : FormInstance<any>
  onPublish : () => void
  isPending : boolean
}

export default function ModalDialogCreatePost({
  isOpenDialog,
  setIsOpenDialog,
  form,
  onPublish,
  isPending
}: Props) {

  return (
    <Modal
      title="Write Post"
      centered
      open={isOpenDialog}
      onCancel={() => setIsOpenDialog(false)}
      footer={(_, {CancelBtn}) => (
        <>
            <CancelBtn/>
            <Button 
                type="primary" 
                htmlType="submit" 
                loading={isPending}
                onClick={onPublish}
                >
                {
                  isPending? " " : "Publish"
                }
              </Button>
        </>
      )}
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
