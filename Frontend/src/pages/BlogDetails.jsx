import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${blogId}`).then(res => setBlog(res.data));
  }, [blogId]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="block mb-6 text-blue-600 hover:underline">← Back to Blogs</Link>
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Tags: {blog.tags?.join(', ')}</p>
      <div className="whitespace-pre-wrap">{blog.content}</div>

    </div>
  );
};

export default BlogDetails;
