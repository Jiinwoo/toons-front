import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ContentType, getPostApi, PostUpdateDto, updatePostApi} from "../apis/board.ts";
import {Button, Card, Col, Form, FormProps, Input, message, Row, Select, Space, Spin} from "antd";
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {useQuill} from "react-quilljs";
import {useEffect, useState} from "react";

// Styled components
const StyledCard = styled(Card)`
    max-width: 800px;
    margin: 20px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const formCss = css`
    max-width: 600px;
    margin: 0 auto;
`;

type AntdFormDto = {
    title: string
};

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


const PostEditPage: React.FC = () => {
    const {postId} = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {quillRef, quill} = useQuill()

    const [subject, setSubject] = useState<ContentType>("GENERAL")

    const {data: post, isLoading} = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostApi(parseInt(postId!)),
    },);

    const updateMutation = useMutation({
        mutationFn: (data: PostUpdateDto) => updatePostApi({
            id: parseInt(postId!),
            post: data,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['post', postId],
            });
            message.success('게시글이 수정되었습니다.');
            navigate(`/posts/${postId}`);
        },
    });

    const onFinish: FormProps<AntdFormDto>['onFinish'] = (values) => {
        updateMutation.mutate({
            title: values.title,
            content: quill?.root.innerHTML || "",
            contentType: subject,
        });
    };

    useEffect(() => {
        if (quill && post) {
            quill.clipboard.dangerouslyPasteHTML(post.content)
        }
    }, [post, post?.content, quill])

    if (isLoading) return <Spin size="large" style={{display: 'block', margin: '20px auto'}}/>;
    if (!post) return null;

    return (
        <StyledCard title="게시글 수정">
            <Form<AntdFormDto>
                css={formCss}
                initialValues={{
                    title: post.title,
                }}
                onFinish={onFinish}
                // onFinish={onFinish}
                layout="vertical"
            >
                <Row gutter={16} align="middle">
                    <Col flex="0 1 100px">
                        <Form.Item
                            name="contentType"
                            label="태그"
                            // rules={[{required: true}]}
                            style={{marginBottom: 0}}
                        >
                            <Select<ContentType>
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
                {/*<Form.Item<AntdFormDto> name="title" label="제목" rules={[{required: true, message: '제목을 입력해주세요.'}]}>*/}
                {/*    <Input size="large"/>*/}
                {/*</Form.Item>*/}
                <div
                    ref={quillRef}
                    style={{width: '100%', height: 300}}>
                </div>
                {/*<Form.Item<AntdFormDto> name="contentType" hidden>*/}
                {/*    <Input/>*/}
                {/*</Form.Item>*/}
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" size="large">수정</Button>
                        <Button size="large" onClick={() => navigate(`/posts/${postId}`)}>취소</Button>
                    </Space>
                </Form.Item>
            </Form>
        </StyledCard>
    );
};
export default PostEditPage;
