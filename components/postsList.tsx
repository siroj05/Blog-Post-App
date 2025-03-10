import { createPost, deletePost, postsList } from "@/service/gorestApi";
import { PostsModel } from "@/service/type";
import { EllipsisOutlined, FormOutlined } from "@ant-design/icons";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { List, Space, Input, Button, Form, message, Skeleton } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ModalDialogCreatePost from "./modalDialogCreatePost";
import ActionPopover from "./actionPopover";
import { queryParams } from "@/service/utils/queryParams";

type FieldType = {
  title : string
  body : string
}

export default function PostsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false)
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const search = searchParams.get("search") || "";

  const deleteMutation = useMutation({
    mutationFn : (id:number) => deletePost(id),
    onSuccess : () =>{
      queryClient.invalidateQueries({queryKey: ["posts"]})
      message.success("Post deleted successfully")
    },
    onError: (error) => {
      message.error(`Failed to delete : ${error.message}`)
    }
  })

  const onDelete = (id : number) => {
    deleteMutation.mutate(id)
  }

  const mutation = useMutation({
    mutationFn : ({title, body} : FieldType) => createPost(title, body),
    onSuccess: () => {
      // ambil data lama dari cache
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success('Publish was successful')
      form.resetFields()
      setOpenDialog(false)
    },
    onError: (error:any) => {
      error && error?.response?.data?.map((res:any) => {
        message.error(`
            ${res?.field} ${res?.message}
          `)
      })
    }
  })

  const onPublish = () => {
    form.validateFields().then((values) => {
      mutation.mutate(values);
    });
  }
  
  const { isPending, data, isFetching, isRefetching } = useQuery({
    queryKey: ["posts", page, pageSize, search],
    queryFn: () => postsList(page, pageSize, search),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className="w-full">
        <Space
          direction="vertical"
          style={{ marginBottom: "20px" }}
          size="middle"
          className="w-full"
        >
          <div className="flex gap-3">
            <Input.Search
              placeholder="Search title.."
              onSearch={(value) => {
                queryParams({ search: value, page: 1 }, router, searchParams);
              }}
              enterButton="Search"
              size="large"
              className="mb-10"
            />
              <Button onClick={() => setOpenDialog(true)} type="dashed" size="large" icon={<FormOutlined />}>Write</Button>
          </div>
          <List
            loading={
             {
              spinning : isPending || mutation.isPending || deleteMutation.isPending || isFetching || isRefetching,
              indicator : <Skeleton active/>
             }
            }
            pagination={{
              position: "bottom",
              align: "center",
              pageSize: pageSize,
              current: page,
              total: data?.totalPosts || 0,
              onChange: (page, pageSize) => {
                queryParams({ page, pageSize }, router, searchParams);
              },
            }}
            dataSource={data?.posts}
            renderItem={(item: PostsModel) => (
              <List.Item>
                <List.Item.Meta
                  title={
                  <div className="flex justify-between">
                    <Link href={`posts/${item.id}`}>{item.title}</Link>
                      <ActionPopover onDelete={onDelete} id={item.id}>
                        <Button type="text"><EllipsisOutlined /></Button>
                      </ActionPopover>
                  </div>
                  }
                  description={item.body}
                />
              </List.Item>
            )}
          />
        </Space>
      </div>
      <ModalDialogCreatePost
        isOpenDialog={openDialog}
        setIsOpenDialog={setOpenDialog}
        form={form}
        onPublish={onPublish}
        isPending={mutation.isPending}
      />
    </>
  );
}