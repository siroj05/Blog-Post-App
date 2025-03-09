import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Popover } from "antd";
import Link from "next/link";
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
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const { confirm } = Modal;
  const showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure delete this post?',
    icon: <ExclamationCircleFilled />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    centered : true,
    onOk() {
      onDelete(id)
    },
  });
};
  

  return(
    <>
      <Popover
        content={
          <div className="flex flex-col">
          <Link href={`posts/${id}/edit`}>
            <Button type="text" icon={<EditOutlined />}>Edit</Button>
          </Link>
          <Button onClick={() => {
            showDeleteConfirm()
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
    </>
  )
}