import React, {useCallback, useEffect, useState} from 'react';
import {PostMutation, Post} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const {postId} = useParams();
  const [post, setPost] = useState<PostMutation>({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(`posts/${postId}.json`);
      const postData: Post = response.data;
      setPost({
        title: postData.title,
        description: postData.description,
      });
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      void fetchData();
    }
  }, [fetchData, postId]);

  const postChanged = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setPost((prevState: PostMutation) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (postId) {
        await axiosApi.put(`posts/${postId}.json`, {
          ...post,
        });
      } else {
        await axiosApi.post('posts.json', {
          ...post,
        });
      }
      navigate(`/`);
    } finally {
      setLoading(false);
    }
  };

  let form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="name">Title</label>
        <input
          id="title" type="text" name="title" required
          className="form-control"
          value={post.title}
          onChange={postChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description" name="description" required
          className="form-control"
          value={post.description}
          onChange={postChanged}
        />
      </div>
      <button disabled={loading} type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );

  if (loading) {
    form = <Spinner/>;
  }

  return (
    <div className="row mt-2">
      <div className="col">
        <h4>{postId ? 'Edit post' : 'Add new post'}</h4>
        {form}
      </div>
    </div>
  );
};

export default PostForm;
