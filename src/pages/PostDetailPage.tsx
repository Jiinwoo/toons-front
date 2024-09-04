import {useNavigate, useParams,} from 'react-router-dom';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, Card, Divider, message, Space, Spin, Tag, Typography} from 'antd';
import {DeleteOutlined, EditOutlined, LeftOutlined, LikeFilled, LikeOutlined} from '@ant-design/icons';
import styled from "@emotion/styled";
import useAuth from "../hooks/useAuth.ts";
import {deletePostApi, getPostApi, likePostApi, unlikePostApi} from "../apis/board.ts";

const {Title, Text} = Typography;

// Styled components
const StyledCard = styled(Card)`
    max-width: 800px;
    margin: 20px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled(Title)`
    margin-bottom: 8px !important;
`;

const StyledMeta = styled.div`
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.45);
`;

// API 함수들 (이전과 동일)

// PostDetailPage 컴포넌트
export const PostDetailPage: React.FC = () => {
    const {postId} = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {user, isAuthenticated} = useAuth()

    const {data: post, isLoading, error} = useQuery(
        {queryKey: ['post', postId, isAuthenticated], queryFn: () => getPostApi(parseInt(postId!)), enabled: !!postId},
    )
    const deleteMutation = useMutation({
        mutationFn: deletePostApi,
        onSuccess: () => {
            message.success('게시글이 삭제되었습니다.');
            navigate('/posts');
        },
    })

    const likeMutation = useMutation({
        mutationFn: likePostApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['post', postId]});
            message.success('좋아요를 눌렀습니다.');
        },
    });

    const unLikeMutation = useMutation({
        mutationFn: unlikePostApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['post', postId]});
            message.success('좋아요를 취소했습니다.');
        },
    });


    if (isLoading) return <Spin size="large" style={{display: 'block', margin: '20px auto'}}/>;
    if (error) return <StyledCard><Text type="danger">에러가 발생했습니다.</Text></StyledCard>;
    if (!post) return null;
    // const sanitizedData = () => ({
    //     __html: window.DOMPurify.sanitize(data)
    // })

    const isAuthor = user?.name === post.username;

    const LikeButton = () => (
        <Button
            icon={post.isLiked ? <LikeFilled/> : <LikeOutlined/>}
            onClick={() => {
                if (post.isLiked === null) {
                    return;
                }
                post.isLiked ? unLikeMutation.mutate(parseInt(postId!)) : likeMutation.mutate(parseInt(postId!));
            }}
            type={post.isLiked ? "primary" : "default"}
        >
            {post.isLiked ? '좋아요 취소' : '좋아요'}
        </Button>
    );

    return (
        <StyledCard
            actions={[
                <Button icon={<LeftOutlined/>} onClick={() => navigate('/posts')}>목록으로</Button>,
                <LikeButton/>,
                isAuthor &&
                <Button icon={<EditOutlined/>} onClick={() => navigate(`/posts/${postId}/edit`)}>수정</Button>,
                isAuthor &&
                <Button icon={<DeleteOutlined/>} danger
                        onClick={() => deleteMutation.mutate(parseInt(postId!))}>삭제</Button>
            ].filter(Boolean)}
        >
            <StyledTitle level={2}>{post.title}</StyledTitle>
            <StyledMeta>
                <Space split={<Divider type="vertical"/>}>
                    <Text>작성자: {post.username}</Text>
                    <Text>작성일: {new Date(post.createdAt).toLocaleString()}</Text>
                    {post.tag && <Tag color="blue">{post.tag}</Tag>}
                </Space>
            </StyledMeta>
            {post &&
                <div
                    style={{
                        fontSize: '16px',
                        lineHeight: 1.6,
                        minHeight: '300px',
                    }}
                    dangerouslySetInnerHTML={{__html: post.content}}/>
            }

        </StyledCard>
    );
};
export default PostDetailPage;
