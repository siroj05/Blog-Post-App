import { DeleteOutlined, EditOutlined, WarningTwoTone } from "@ant-design/icons";
import { Button, Modal, Popover } from "antd";
import { ReactNode, useState } from "react";

interface Props {
  children : ReactNode
  onDelete : (value : number) => void
  id : number
}

export default function ActionPopover(
  {
    children,
    onDelete,
    id
  }:Props
){

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  

  return(
    <>
      <Popover
        content={
          <div className="flex flex-col">
          <Button type="text" icon={<EditOutlined />}>Edit</Button>
          <Button onClick={() => {
            setOpenConfirm(true)
            setOpen(false)
          }} type="text" icon={<DeleteOutlined />}>Delete</Button>
          </div>
        }
        trigger="click"
        open={open}
        placement="bottom"
        onOpenChange={handleOpenChange}
      >
        {children}
      </Popover>
      <Modal
        // title="Delete Post"
        centered
        open={openConfirm}
        onOk={() => onDelete(id)}
        onCancel={() => setOpenConfirm(false)}
        okText="Delete"
      >
        <div className="flex gap-2">
          <WarningTwoTone/>
          <p>
            Delete Post?
          </p>
        </div>
    </Modal>
    </>
  )
}