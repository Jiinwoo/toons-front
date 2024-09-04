import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import {useNavigate} from 'react-router-dom';
import {FC, useState} from "react";
import {useCreatePostMutation} from "../hooks/usePost.ts";

import {useQuill} from 'react-quilljs';

import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme


const firstTag = [
    {
        value: "GENERAL",
        label: "일반"
    },
    {
        value: "WEBTOON",
        label: "웹툰"
    },
    {
        value: "WEBNOVEL",
        label: "웹소설"
    }
] as const

const PostCreatePage: FC = () => {
    const {quill, quillRef} = useQuill()
    const [subject, setSubject] = useState("GENERAL")
    // const editorRef = useRef<Editor>(null);

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const createPostMutation = useCreatePostMutation();

    const onFinish = (values: { title: string }) => {
        createPostMutation.mutate({
            title: values.title,
            content: quill?.root.innerHTML || "",
            contentType: subject,
        }, {
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
            {/*<h1>Create New Post</h1>*/}
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{maxWidth: '600px', margin: '0 auto'}}
            >
                <Row gutter={16} align="middle">
                    <Col flex="0 1 100px">
                        <Form.Item
                            name="contentType"
                            label="태그"
                            // rules={[{required: true}]}
                            style={{marginBottom: 0}}
                        >
                            <Select
                                style={{width: '100%'}}
                                defaultValue={"GENERAL"}
                                onChange={(value) => setSubject(value)}
                                options={
                                    firstTag.map((contentType) => ({
                                        label: contentType.label,
                                        value: contentType.value,
                                        disabled: contentType.value !== "GENERAL"
                                    }))
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col flex="1 1 auto">
                        <Form.Item
                            name="title"
                            label="제목"
                            rules={[{required: true}]}
                            style={{marginBottom: 0}}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <div
                    ref={quillRef}
                    style={{width: '100%', height: 300}}>
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={createPostMutation.isPending}>
                        작성 완료
                    </Button>
                    <Button onClick={() => navigate('/posts')} style={{marginLeft: '10px'}}>
                        취소
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PostCreatePage;
