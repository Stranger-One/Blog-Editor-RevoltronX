import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogEditor = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const [status, setStatus] = useState("draft");
  const [autoSaveMsg, setAutoSaveMsg] = useState("");
  const token = localStorage.getItem("token");

  // Fetch blog if editing
  useEffect(() => {
    if (blogId) {
      axios
        .get(`http://localhost:5000/api/blogs/${blogId}`)
        .then((res) => setForm(res.data));
    }
  }, [blogId]);

  // Auto-save logic (every 30s OR 5s after typing stops)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (form.title || form.content || form.tags) {
        handleSaveDraft(true);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = async (auto = false) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/blogs/save-draft",
        {
          ...form,
          status: "draft",
          id: blogId,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      if (response.data._id) {
        navigate(`/editor/${response.data._id}`);
      }

      if (auto) {
        setAutoSaveMsg("Draft auto-saved ✅");
      } else {
        setAutoSaveMsg("Draft saved successfully ✅");
        navigate("/");
      }
      setTimeout(() => setAutoSaveMsg(""), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePublish = async () => {
    try {
      await axios.post("http://localhost:5000/api/blogs/publish", {
        ...form,
        status: "published",
        id,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {blogId ? "Edit Blog" : "New Blog"}
      </h1>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
      />

      <textarea
        name="content"
        placeholder="Content"
        rows="10"
        value={form.content}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
      />

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className="w-full p-2 border mb-4 rounded"
      />

      <div className="flex gap-4">
        <button
          onClick={() => handleSaveDraft()}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Save as Draft
        </button>
        <button
          onClick={handlePublish}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Publish
        </button>
      </div>

      {autoSaveMsg && (
        <p className="mt-2 text-sm text-blue-600">{autoSaveMsg}</p>
      )}
    </div>
  );
};

export default BlogEditor;
