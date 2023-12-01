import {useCallback, useEffect, useState} from 'react';
import {Post, PostsList} from '../../types';
import axiosApi from '../../axiosApi';
import {Link} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const Home = () => {
  const [posts, setPosts] = useState<PostsList>({});
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get('posts.json');
      setPosts(response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {void fetchPosts();}, [fetchPosts]);

  let PostList = (
    <div className="posts mt-3">
      {Object.values(posts).map((post: Post) => (
        <div className="post card mb-3" key={post.id}>
          <div className="card-body">
            <p>Created on: {post.date}</p>
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <Link to={`/posts/${post.id}`}>Read More &gt;</Link>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    PostList = <Spinner/>;
  }

  return (
    <>
      {PostList}
    </>

  );
};

export default Home;