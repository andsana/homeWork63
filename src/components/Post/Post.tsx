import {useParams, useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import Spinner from '../Spinner/Spinner';
import type {Post} from '../../types';
import {useCallback, useEffect, useState} from 'react';

const Post = () => {
  const navigate = useNavigate();
  const {postId} = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(`posts/${postId}.json`);
      setPost(response.data);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  const deletePost = async () => {
    await axiosApi.delete(`posts/${postId}.json`);
    navigate('/');
  };

  const editPost = () => {
    navigate(`/edit/${postId}`);
  };

  if (loading || !post) {
    return <Spinner/>;
  }

  return (
    <div className="card-body">
      <p>Created on: {post.date}</p>
      <h5 className="card-title">{post.title}</h5>
      <p className="card-text">{post.description}</p>
      <button className="btn btn-danger me-3" type="button" onClick={deletePost}>delete</button>
      <button className="btn btn-success" type="button" onClick={editPost}>edit</button>
    </div>
  );
};

export default Post;