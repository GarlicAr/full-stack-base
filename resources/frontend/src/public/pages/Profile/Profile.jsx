import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, message } from 'antd';
import useAuth from '../../../hooks/useAuth.jsx';
import { BASE_URL } from '../../../config/config.jsx';
import getCookie from '../../../utils/getCookie.jsx';
import Post from '../../../ui/Post/Post.jsx';

export default function Profile() {
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    async function fetchUserPosts() {
      if (!user) return;
      try {
        const response = await axios.get(
          `${BASE_URL}/api/posts/user/${user.id}`,
          {
            withCredentials: true,
            headers: {
              'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            },
          }
        );
        setPosts(response.data);
      } catch (err) {
        console.error(err);
        message.error('Failed to load posts');
      } finally {
        setLoadingPosts(false);
      }
    }

    fetchUserPosts();
  }, [user]);

  if (loading) return <Spin />;
  if (!user) return <div>Unauthorized or not logged in.</div>;
  if (loadingPosts) return <Spin />;

  return (
    <div>
      <h2 className="title">PROFILE: {user.name}</h2>
      <h3 className="subtitle">Your Posts</h3>
      {posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
            />
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
