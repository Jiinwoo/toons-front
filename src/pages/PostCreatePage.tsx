import {Button, Form, Input, message, Select} from 'antd';
import {useNavigate} from 'react-router-dom';
import {FC} from "react";
import {useCreatePostMutation} from "../hooks/usePost.ts";
import {ContentTypeObject, PostCreateDto} from "../apis/board.ts";

const {Option} = Select;

const PostCreatePage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const createPostMutation = useCreatePostMutation();

    const onFinish = (values: PostCreateDto) => {
        createPostMutation.mutate(values, {
            onSuccess: () => {
                message.success('Post created successfully');
                navigate('/posts');
            },
            onError: () => {
                message.error('Failed to create post');
            },
        });
    };

    return (
        <div className="post-create-page">
            <h1>Create New Post</h1>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{maxWidth: '600px', margin: '0 auto'}}
            >
                <Form.Item name="title" label="Title" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="content" label="Content" rules={[{required: true}]}>
                    <Input.TextArea rows={6}/>
                </Form.Item>
                <Form.Item name="contentType" label="Content Type" rules={[{required: true}]}>
                    <Select>
                        {Object.values(ContentTypeObject).map((type) => (
                            <Option key={type} value={type}>{type}</Option>
                        ))}
                    </Select>
                </Form.Item>
                {/*<Form.Item name="contentId" label="Content ID">*/}
                {/*    <Input type="number" />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item name="tag" label="Tag">*/}
                {/*    <Input />*/}
                {/*</Form.Item>*/}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={createPostMutation.isPending}>
                        Create Post
                    </Button>
                    <Button onClick={() => navigate('/posts')} style={{marginLeft: '10px'}}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PostCreatePage;