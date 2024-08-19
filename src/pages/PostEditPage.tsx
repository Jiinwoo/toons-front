import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getPostApi, PostUpdateDto, updatePostApi} from "../apis/board.ts";
import {Button, Card, Form, FormProps, Input, message, Space, Spin} from "antd";
import styled from "@emotion/styled";
import {css} from "@emotion/react";

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
const PostEditPage: React.FC = () => {
    const {postId} = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

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

    const onFinish: FormProps<PostUpdateDto>['onFinish'] = (values) => {
        updateMutation.mutate(values);
    };

    if (isLoading) return <Spin size="large" style={{display: 'block', margin: '20px auto'}}/>;
    if (!post) return null;

    return (
        <StyledCard title="게시글 수정">
            <Form<PostUpdateDto>
                css={formCss}
                initialValues={{
                    title: post.title,
                    content: post.content,
                    contentType: 'GENERAL',  // 예시로 'TEXT'로 설정
                }}
                onFinish={onFinish}
                // onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item<PostUpdateDto> name="title" label="제목" rules={[{required: true, message: '제목을 입력해주세요.'}]}>
                    <Input size="large"/>
                </Form.Item>
                <Form.Item<PostUpdateDto> name="content" label="내용" rules={[{required: true, message: '내용을 입력해주세요.'}]}>
                    <Input.TextArea rows={6}/>
                </Form.Item>
                <Form.Item<PostUpdateDto> name="contentType" hidden>
                    <Input/>
                </Form.Item>
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