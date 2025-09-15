import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useLocation } from "react-router";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/contact") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [location.pathname]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/contact`, form);
      if (res.status === 200) {
        setSubmissionStatus("success");
        setForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = [
    { icon: <FaFacebookF />, color: "text-blue-600", link: "https://www.facebook.com/biswa.ghosh.927/" },
    { icon: <FaInstagram />, color: "text-pink-500", link: "https://www.instagram.com/i_ambiswarup/" },
    { icon: <FaTwitter />, color: "text-sky-400", link: "https://twitter.com/Im_Biswarup" },
    { icon: <FaLinkedin />, color: "text-blue-500", link: "https://www.linkedin.com/in/biswarup-ghosh-61440828a/" },
  ];

  return (
    <section className="text-gray-400 bg-gray-900 body-font min-h-screen flex items-center">
      <div className="container px-5 mx-auto">
        {/* Title */}
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-4xl text-3xl font-bold text-white">Get in touch</h1>
          <p className="mt-3 lg:w-2/3 mx-auto leading-relaxed text-lg text-gray-400">
            Feel free to drop me a message. I’ll get back to you soon 🚀
          </p>
        </div>

        {/* Form */}
        <div className="lg:w-1/2 md:w-2/3 mx-auto bg-gray-800 bg-opacity-40 rounded-xl p-8 shadow-lg">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Your Name"
                className="w-full bg-gray-900 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 text-white py-2 px-4 outline-none"
              />
            </div>
            <div className="p-2 w-1/2">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Your Email"
                className="w-full bg-gray-900 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 text-white py-2 px-4 outline-none"
              />
            </div>
            <div className="p-2 w-full">
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full bg-gray-900 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 text-white py-2 px-4 h-32 outline-none resize-none"
              ></textarea>
            </div>
            <div className="p-2 w-full">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex mx-auto items-center justify-center gap-2 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg cursor-pointer transition-transform transform hover:scale-110"
              >
                {loading ? "Sending..." : <>Send <IoIosSend /></>}
              </button>
              {submissionStatus === "success" && (
                <p className="text-green-500 mt-3 text-center">✅ Message sent successfully!</p>
              )}
              {submissionStatus === "error" && (
                <p className="text-red-500 mt-3 text-center">❌ Error sending message. Please try again.</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info + Socials */}
        <div className="text-center mt-10">
          <a
            href="mailto:biswarupg451@gmail.com"
            className="text-indigo-400 text-lg font-medium hover:underline"
          >
            biswarupg451@gmail.com
          </a>
          <p className="leading-normal my-4">📍 Kolkata, West Bengal</p>
          <div className="flex justify-center gap-6 mt-4">
            {socialIcons.map((icon, index) => (
              <a
                key={index}
                href={icon.link}
                target="_blank"
                rel="noreferrer"
                className={`text-gray-400 text-2xl hover:${icon.color} transition-transform transform hover:scale-150`}
              >
                {icon.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
