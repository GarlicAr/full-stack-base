import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../../../../ui/Post/Post.jsx';
import axios from 'axios';
import { BASE_URL } from '../../../../config/config.jsx';
import getCookie from '../../../../utils/getCookie.jsx';
import { Input, Button, message } from 'antd';
import CommentProp from '../../../../ui/Post/Comment/Comment.jsx';
import useAuth from '../../../../hooks/useAuth.jsx';

export default function ViewPost() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const [post, setPost] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = async () => {
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
      message.error('Error loading post');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      message.warning('Please write a comment.');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        `${BASE_URL}/api/posts/${id}/comments`,
        {
          body: comment,
        },
        {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          },
        }
      );
      message.success('Comment added!');
      setComment('');
      fetchPost();
    } catch (err) {
      console.error(err);
      message.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingData) return <div>Loading post...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className={'flex flex-col'}>
      <div className="title">VIEW POST</div>
      <div className={'flex items-center justify-center-safe'}>
        <Post id={post.id} title={post.title} content={post.content} />
      </div>

      <div className="comments mt-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <CommentProp
              key={index}
              author={comment.author?.name}
              body={comment.body}
              userId={comment.user_id}
              currentUser={user.id}
              id={comment.id}
            />
          ))
        ) : (
          <div className="text-gray-500">No comments yet.</div>
        )}
      </div>

      <div className="add-comment mt-4">
        <h4 className="text-lg font-semibold mb-2">Add a Comment</h4>
        <Input.TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          rows={4}
        />
        <Button
          type="primary"
          className="mt-2"
          onClick={handleCommentSubmit}
          loading={submitting}
        >
          Submit Comment
        </Button>
      </div>
    </div>
  );
}
