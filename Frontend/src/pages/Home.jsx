import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs`).then(res => setBlogs(res.data));
  }, []);

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/blogs/delete/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(response.status === 200) {
        // console.log("Blog deleted successfully");
        toast.success("Blog deleted successfully")
      }
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }

  const drafts = blogs.filter(b => b.status === 'draft');
  const published = blogs.filter(b => b.status === 'published');

  const BlogItem = ({ blog }) => (
    <div className="border p-3 rounded mb-2">
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <p className="text-sm text-gray-600">{blog.tags?.join(', ')}</p>
      <div className="mt-2">
        <Link to={`/blog/${blog._id}`} className="text-blue-600 mr-4 cursor-pointer">View</Link>
        <Link to={`/editor/${blog._id}`} className="text-yellow-600 cursor-pointer">Edit</Link>
        <button 
          onClick={() => deleteBlog(blog._id)} 
          className="text-red-600 ml-4 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <Link to="/editor" className="px-4 py-2 bg-blue-600 text-white rounded">+ New Blog</Link>
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-2">Published</h2>
      {published.map(blog => <BlogItem key={blog._id} blog={blog} />)}

      <h2 className="text-lg font-semibold mt-6 mb-2">Drafts</h2>
      {drafts.map(blog => <BlogItem key={blog._id} blog={blog} />)}
    </div>
  )
}

export default Home