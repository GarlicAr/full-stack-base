import { useEffect, useState } from 'react';
import { fetchPosts } from '../../../services/PostServices.jsx';
import Post from '../../../ui/Post/Post.jsx';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const response = await fetchPosts();
      if (response.data && response.data.length > 0) {
        setPosts(response.data);
      }
    }

    loadPosts();
  }, []);

  return (
    <div>
      <div className={'title'}>POSTS PAGE</div>
      <div className={'flex flex-col justify-center items-center'}>
        {posts &&
          posts.map((post) => {
            return (
              <Post title={post.title} content={post.content} key={post.id} />
            );
          })}
      </div>
    </div>
  );
}
