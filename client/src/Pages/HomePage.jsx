import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Element, scroller } from "react-scroll";
import AboutUs from "./AboutUs";
import QA from "./QA";
import ContactUs from "./ContactUs";
import Card from "../Components/Card";
import SendIcon from "../assets/SendIcon.svg";
import RecieveIcon from "../assets/RecieveIcon.svg";
import HistoryIcon from "../assets/HistoryIcon.svg";
import BankIcon from "../assets/BankIcon.svg";
import "../tailwind.css";
import axios from "axios";
//import { useLoaderData } from "react-router-dom";

export default function HomePage({focus,setFocus}) {
  const location = useLocation();

  const [name, setName] = useState();

  console.log(localStorage.getItem("token"));
  


  useEffect(() => {
    const fetchUserStatus = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/auth/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User data fetched:", response.data);
        setName(response.data.name);
        
      } catch (err) {
        console.log("Error fetching user data:", err.response || err);
        console.log(token);
      }
    };

    fetchUserStatus();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (section) {
      // If section is provided in the URL, scroll to the specific section
      scroller.scrollTo(`${section}-section`, {
        smooth: true,
        duration: 500,
        offset: -50, // Adjust for header height
      });
    } else {
      // If no section is provided, scroll to the top of the page (Home)
      window.scrollTo(0, 0);  // Scroll to the top
    }
  }, [location.search]);  // This will re-run when the location changes

  const handleCardClick = (identifier) => {
    setFocus(identifier)
    console.log(identifier);
    
  };

  return (
    <div id="HomePage">
      {/* Home Section */}
      <Element name="home-section" className="pt-[100px] min-h-screen">
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          {/* Main Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center">
            {/* Left Content */}
            <div className="pt-28">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
                Welcome {name}
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
                Send money to anyone, anywhere, at any time!
              </h2>
              <p className="mt-4 text-purple-900 text-lg">
                You can send money from your bank account instantly 24/7 to any
                bank account, digital wallet, or card.
              </p>
            </div>

            {/* Right Cards Section */}
            <div className="rounded-lg p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card
                title="Send Money"
                image={SendIcon}
                onClick={() => handleCardClick("send")}
                label="send"
              />
              <Card
                title="Account Usage"
                image={BankIcon}
                onClick={() => handleCardClick("account-usage")}
                label="account-usage"
              />
              <Card
                title="View History"
                image={HistoryIcon}
                onClick={() => handleCardClick("view-history")}
                label="view-history"
              />
              <Card
                title="Balance"
                type="balance"
                label="profile"
              />
            </div>
          </div>
        </main>
      </Element>

      {/* About Section */}
      <Element name="about-section" className="pt-[100px] min-h-screen">
        <AboutUs />
      </Element>

      {/* QA Section */}
      <Element name="qa-section" className="pt-[100px] min-h-screen">
        <QA />
      </Element>

      {/* Contact Section */}
      <Element name="contact-section" className="pt-[100px] min-h-screen">
        <ContactUs />
      </Element>
    </div>
  );
}
