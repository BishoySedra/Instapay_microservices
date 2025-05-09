import React from "react";
import InstaPayIcon from "../assets/InstaPayIcon.svg";
export default function AboutUs() {
  return (
    <div id="aboutUs" className="bg-gradient-to-b from-purple-50 to-purple-100 min-h-screen py-16 pt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-purple-900 mb-6">About Us</h2>
          <p className="text-lg text-purple-800 leading-relaxed">
            At InstaPay, we’re redefining how the world connects financially.
            Our platform is designed to empower users with seamless, secure, and instant payment solutions.
          </p>
        </div>

        {/* About Us Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div>
            <h3 className="text-3xl font-semibold text-purple-900 mb-6">
              Our Vision
            </h3>
            <p className="text-lg text-purple-800 leading-relaxed mb-6">
              InstaPay is more than a payment service—it’s a commitment to simplifying lives.
              Our vision is to make every financial transaction as effortless and secure as a handshake.
            </p>

            <h3 className="text-3xl font-semibold text-purple-900 mb-6">
              Why Choose Us?
            </h3>
            <ul className="list-disc pl-6 text-lg text-purple-800 space-y-4">
              <li>
                <strong>Speed:</strong> Experience lightning-fast transactions that happen in seconds.
              </li>
              <li>
                <strong>Security:</strong> Your data is protected with industry-leading encryption technology.
              </li>
              <li>
                <strong>Global Reach:</strong> Send and receive money anywhere in the world.
              </li>
              <li>
                <strong>Ease of Use:</strong> A user-friendly platform that makes payments a breeze.
              </li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={InstaPayIcon}
              alt="About Us"
              className="rounded-lg w-full md:w-3/4"
            />
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-semibold text-purple-900 mb-6">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-purple-800 mb-4">Innovation</h4>
              <p className="text-purple-700">
                We constantly push boundaries to deliver cutting-edge solutions for our customers.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-purple-800 mb-4">Transparency</h4>
              <p className="text-purple-700">
                Honesty and openness are at the heart of everything we do.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-purple-800 mb-4">Customer Focus</h4>
              <p className="text-purple-700">
                Our success is built on understanding and exceeding customer expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-xl text-purple-800 leading-relaxed mb-6">
            Ready to experience the future of payments? Join the InstaPay family and discover the difference.
          </p>
          <a
            href="#home"
            className="px-8 py-4 bg-purple-900 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
