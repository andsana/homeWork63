import React, {useCallback, useState} from 'react';
import {Post} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const PostForm = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const postChanged = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setPost((prevState: Post) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axiosApi.post('posts.json', post);
      navigate('/');
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
        <label htmlFor="name">Description</label>
        <input
          id="description" type="text" name="description" required
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
        <h4>Add new blog</h4>
        {form}
      </div>
    </div>
  );
};

export default PostForm;