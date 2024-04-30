import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Fill in all the required fields!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Invalid email format", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }

    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}contactData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 200) {
        toast.success("Submitted", {
          position: toast.POSITION.TOP_CENTER,
        });

        setTimeout(() => {
          navigate("/home");
        }, 2000); 
      }
    } catch (error) {
      toast.error("Server Error, Try again", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`w-full px-3 py-2 border rounded ${
                  formData.name.trim() ? "border-gray-300" : "border-red-500"
                }`}
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`w-full px-3 py-2 border rounded ${
                  formData.email.trim() ? "border-gray-300" : "border-red-500"
                }`}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded ${
                  formData.message.trim() ? "border-gray-300" : "border-red-500"
                }`}
                name="message"
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-full w-full hover:bg-blue-600 transition duration-300 ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "transform hover:scale-105"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Contact;
