import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

// Cloudinary Config
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Admin Flag
const IS_ADMIN = import.meta.env.VITE_IS_ADMIN === "true";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    title: "",
    techStack: "",
    imageUrl: "",
    liveDemoLink: "",
    githubLink: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/projects`);
      const data = await res.data;
      setProjects(data);
    } catch {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setForm((prev) => ({ ...prev, imageUrl: data.secure_url }));
    } catch {
      setError("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = (e) => uploadToCloudinary(e.target.files[0]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) uploadToCloudinary(file);
  }, []);

  const handleDragOver = (e) => e.preventDefault();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const msg = await res.json();
        throw new Error(msg?.message || "Failed to create project");
      }
      setForm({
        title: "",
        techStack: "",
        imageUrl: "",
        liveDemoLink: "",
        githubLink: "",
      });
      await fetchProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-white bg-gray-900 text-2xl font-bold text-center">
        My Projects
      </h1>

      {/* ✅ Only admin can see Add Project form */}
      {IS_ADMIN && (
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-5 pt-10 pb-4 mx-auto">
            <h2 className="text-white text-xl font-semibold mb-4 text-center">
              Add a Project
            </h2>
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                className="bg-gray-800 text-white p-3 rounded"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={onChange}
                required
              />
              <input
                className="bg-gray-800 text-white p-3 rounded"
                name="techStack"
                placeholder="Tech stack"
                value={form.techStack}
                onChange={onChange}
                required
              />

              {/* Drag & Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="md:col-span-2 border-2 border-dashed border-gray-600 rounded p-6 text-center cursor-pointer hover:border-indigo-500 transition-all"
              >
                <p className="text-gray-300 mb-2">
                  Drag & Drop image here or select a file
                </p>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="text-indigo-400 underline cursor-pointer"
                >
                  Choose File
                </label>
                {uploadingImage && (
                  <p className="text-yellow-400 mt-2">Uploading image...</p>
                )}
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded mx-auto mt-3"
                  />
                )}
              </div>

              <input
                className="bg-gray-800 text-white p-3 rounded"
                name="liveDemoLink"
                placeholder="Live demo URL"
                value={form.liveDemoLink}
                onChange={onChange}
                required
              />
              <input
                className="bg-gray-800 text-white p-3 rounded md:col-span-2"
                name="githubLink"
                placeholder="Github Repo"
                value={form.githubLink}
                onChange={onChange}
                required
              />
              <button
                disabled={submitting}
                className="md:col-span-2 inline-flex justify-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg hover:text-white cursor-pointer"
              >
                {submitting ? "Adding..." : "Add Project"}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ✅ Visible to everyone */}
      {loading ? (
        <p className="text-center text-gray-300 py-10">Loading projects...</p>
      ) : (
        projects.map((item, index) => (
          <section
            key={item._id || index}
            className="text-gray-400 bg-gray-900 body-font"
          >
            <div className="container px-5 py-16 mx-auto flex flex-wrap items-center">
              <div className="lg:w-1/2 w-full mb-10 lg:mb-0 ">
                <img
                  className="object-cover object-center rounded-lg w-full"
                  alt={item.title}
                  src={item.imageUrl}
                />
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10">
                <div className="flex flex-col items-center justify-center text-left mb-8 md:mb-0">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                    {item.title}
                  </h1>
                  <p className="mb-8 leading-relaxed text-center">
                    {item.techStack}
                  </p>
                  <div className="flex w-full justify-center items-end gap-5">
                    <a
                      className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg hover:text-white cursor-pointer hover:scale-110 transition-all"
                      href={item.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                    <a
                      className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg hover:text-white cursor-pointer hover:scale-110 transition-all"
                      href={item.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Project;
