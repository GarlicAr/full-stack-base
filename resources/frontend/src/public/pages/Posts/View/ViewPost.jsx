import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../../../../ui/Post/Post.jsx';
import axios from 'axios';
import { BASE_URL } from '../../../../config/config.jsx';
import getCookie from '../../../../utils/getCookie.jsx';

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`${BASE_URL}/api/posts/${id}`, {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          },
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) return <div>Loading post...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className={'flex flex-col '}>
      <div className="title">VIEW POST</div>
      <div className={'flex items-center justify-center-safe'}>
        <Post id={post.id} title={post.title} content={post.content} />
      </div>

      <div className="comments mt-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <div
              key={index}
              className="border p-2 rounded mb-2 bg-gray-100 dark:bg-gray-800"
            >
              <div className="font-medium text-amber-50">
                {comment.user?.name || 'Anonymous'}
              </div>
              <div className={'text-amber-50'}>{comment.body}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No comments yet.</div>
        )}
      </div>
    </div>
  );
}
