import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import Spinner from '../Spinner/Spinner';
import {Post} from '../../types';

const Home = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get('posts.json');
        setPosts(response.data);
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  if (loading) {
    return <Spinner/>;
  }

  if (!posts) {
    return (
      <div className="no-posts">
        <p>No posts available.</p>
      </div>
    );
  }

  return (
    <div className="posts mt-3">
      {Object.entries(posts).map(([postId, post]: [string, Post]) => (
        <div className="post card mb-3" key={postId}>
          <div className="card-body">
            <p>Created on: {post.date}</p>
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <Link to={`/posts/${postId}`}>Read More &gt;</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
