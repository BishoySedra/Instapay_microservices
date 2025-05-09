import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!form.name || !form.email || !form.message) {
      alert("Please fill out all fields.");
      return;
    }

    // Successful submission alert
    alert("Thanks for contacting us! We will respond to you soon.");
    
    // Reset the form fields
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div id="contact" className="bg-gradient-to-b from-purple-100 to-purple-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-purple-900 mb-6">Contact Us</h2>
          <p className="text-lg text-purple-800 leading-relaxed">
            Have questions or need assistance? Reach out to us, and we’ll be happy to help!
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-purple-900 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-4 border border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-purple-900 mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full p-4 border border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-lg font-medium text-purple-900 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                placeholder="Write your message here"
                className="w-full p-4 border border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-purple-900 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-semibold text-purple-900 mb-4">
            Other Ways to Reach Us
          </h3>
          <p className="text-lg text-purple-800 leading-relaxed mb-6">
            You can also contact us via email or phone for immediate support.
          </p>
          <ul className="space-y-4 text-lg text-purple-800">
            <li>
              <strong>Email:</strong> support@instapay.com
            </li>
            <li>
              <strong>Phone:</strong> +1 234 567 8900
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
