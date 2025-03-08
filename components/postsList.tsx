import { createPost, postsList } from "@/service/gorestApi";
import { PostsModel } from "@/service/type";
import { FormOutlined } from "@ant-design/icons";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { List, Space, Input, Button, Form, message } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ModalDialogCreatePost from "./modalDialogCreatePost";

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

  const mutation = useMutation({
    mutationFn : ({title, body} : FieldType) => createPost(title, body),
    onSuccess: (newPost) => {
      // ambil data lama dari cache
    queryClient.setQueryData(["posts", page, pageSize, search], (oldData: any) => {
      if (!oldData || !oldData.posts) return { posts: [newPost], totalPosts: 1 };

      return {
        ...oldData,
        posts: [newPost, ...oldData.posts], 
        totalPosts: oldData.totalPosts + 1, 
      };
    });

    queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
      message.success('Publish was successful')
      form.resetFields()
      setOpenDialog(false)
    },
    onError: (error) => {
      message.error(`Failed to publish error ${error.message}`)
    }
  })

  const onPublish = () => {
    form.validateFields().then((values) => {
      mutation.mutate(values);
    });
  }
  
  const { isPending, isError, data, error, isPlaceholderData } = useQuery({
    queryKey: ["posts", page, pageSize, search],
    queryFn: () => postsList(page, pageSize, search),
    placeholderData: keepPreviousData,
  });

  const queryParams = (newParams: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value.toString());
    });
    router.push(`?${params.toString()}`, { scroll: false });
  };

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
                queryParams({ search: value, page: 1 });
              }}
              enterButton="Search"
              size="large"
              className="mb-10"
            />
              <Button onClick={() => setOpenDialog(true)} type="dashed" size="large" icon={<FormOutlined />}>Write</Button>
          </div>
          <List
            pagination={{
              position: "bottom",
              align: "center",
              pageSize: pageSize,
              current: page,
              total: data?.totalPosts || 0,
              onChange: (page, pageSize) => {
                queryParams({ page, pageSize });
              },
            }}
            dataSource={data?.posts}
            renderItem={(item: PostsModel) => (
              <List.Item>
                <List.Item.Meta
                  title={<Link href={`posts/${item.id}`}>{item.title}</Link>}
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
      />
    </>
  );
}