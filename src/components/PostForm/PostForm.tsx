import React, {useCallback, useState} from 'react';
import {PostMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<PostMutation>({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

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
      const date = new Date();
      const formattedDate = `
      ${date.getFullYear()}-
      ${(date.getMonth() + 1).toString().padStart(2, '0')}-
      ${date.getDate().toString().padStart(2, '0')} 
      ${date.getHours().toString().padStart(2, '0')}:
      ${date.getMinutes().toString().padStart(2, '0')}
      `;
      await axiosApi.post('posts.json', {id: Math.random().toString(), date: formattedDate, ...post});
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
        <h4>Add new blog</h4>
        {form}
      </div>
    </div>
  );
};

export default PostForm;