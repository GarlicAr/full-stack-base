import { Button, message } from 'antd';
import axios from 'axios';
import getCookie from '../../../utils/getCookie.jsx';
import { BASE_URL } from '../../../config/config.jsx';

export default function CommentProp({
  id,
  author,
  body,
  userId,
  currentUser,
  onDelete,
}) {
  const isAuthor = userId === currentUser;
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/comments/${id}`, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        },
      });
      message.success('Comment deleted!');
      if (onDelete) onDelete();
    } catch (err) {
      console.error(err);
      message.error('Failed to delete comment');
    }
  };

  return (
    <div className="border p-2 rounded mb-2 bg-gray-100 dark:bg-gray-800">
      <div className="flex justify-between items-center">
        <span className="font-medium text-amber-50">
          {author || 'Anonymous'}
        </span>
        {isAuthor && (
          <Button type="link" danger onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
      <div className="text-amber-50">{body}</div>
    </div>
  );
}
