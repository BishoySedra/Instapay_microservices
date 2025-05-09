import React, { useState } from 'react';

export default function QA() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const questions = [
    {
      question: "What is InstaPay?",
      answer: "InstaPay is a digital payment platform that allows you to send and receive money securely, quickly, and conveniently from anywhere in the world.",
    },
    {
      question: "Is InstaPay secure?",
      answer: "Absolutely! We use advanced encryption technologies to ensure your transactions and personal information remain safe and secure.",
    },
    {
      question: "How can I create an InstaPay account?",
      answer: "Creating an account is easy! Simply download our app or visit our website, click on 'Sign Up,' and follow the instructions to set up your account.",
    },
    {
      question: "Are there any fees for transactions?",
      answer: "Transaction fees vary depending on the type of transaction and your location. For detailed information, please visit our Pricing page.",
    },
    {
      question: "Can I use InstaPay internationally?",
      answer: "Yes! InstaPay supports international transfers to various countries, making it easy to send money across borders.",
    },
  ];

  return (
    <div id="QA" className="bg-gradient-to-b from-purple-50 to-purple-100 min-h-screen py-12 pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-purple-900 mb-4">Q&A</h2>
          <p className="text-lg text-purple-800 font-medium">
            Got questions? We’ve got answers! Explore our FAQs below.
          </p>
        </div>

        {/* Questions Section */}
        <div className="space-y-6">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer transition duration-300 hover:shadow-lg"
              onClick={() => toggleQuestion(index)}
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-purple-900">{item.question}</h3>
                <span className="text-purple-600 text-xl">
                  {activeQuestion === index ? "-" : "+"}
                </span>
              </div>

              {/* Answer */}
              {activeQuestion === index && (
                <p className="mt-4 text-purple-700">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
