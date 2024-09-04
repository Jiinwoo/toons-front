import {usePostsQuery} from "../hooks/usePost.ts";
import {Button, Spin, Table, Tag} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {FC} from "react";
import {PostDto} from "../apis/board.ts";
import {loginModalState} from "../state/loginState.ts";
import {useSetRecoilState} from "recoil";
import useAuth from "../hooks/useAuth.ts";

const PostListPage: FC = () => {
    const {isAuthenticated} = useAuth()
    const setLoginModal = useSetRecoilState(loginModalState)

    const {data: posts, isLoading, error} = usePostsQuery();
    const navigate = useNavigate()

    if (isLoading) return <Spin size="large"/>;
    if (error) return <div>Error loading posts</div>;

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: PostDto) => <Link to={`/posts/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Author',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            render: (tag: string) => tag ? <Tag color="blue">{tag}</Tag> : null,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
    ];


    return (
        <div className="post-list-page">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <h1>글 목록</h1>
                <Button type="primary" onClick={() => {
                    if (!isAuthenticated) {
                        setLoginModal(true)
                        return
                    }
                    navigate('/posts/create')
                }}>Create New Post</Button>
            </div>
            <Table
                dataSource={posts?.content}
                columns={columns}
                rowKey="id"
                pagination={{pageSize: 10}}
            />
        </div>
    );
};

export default PostListPage;
