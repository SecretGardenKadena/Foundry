import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Wrapper = ({ children }) => {

  const { openSidebar } = useSelector((state) => state.globalReducer);

  const [showBackToTop, setShowBackToTop] = useState(false);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hamMenu = () => {
    const navigation = document.querySelector('#sidebar');
    navigation.classList.toggle('show-sidebar')
  }

  // Event listener to show/hide the button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`dashboard-page flex-col relative bg-black1`}
    >
      
      <div onClick={hamMenu} className="ham">
        <img src="/images/hamBar.png" alt="" />
      </div>
      <Sidebar />

      <div className="pages-block flex flex-col relative h-full">
        <section className="bg-black1">{children}</section>
        <Footer />
      </div>
      {showBackToTop && (
        <img
          className="back-to-top"
          src="/images/b2t.png"
          onClick={scrollToTop}
          alt=""
        />
      )}
    </div>
  );
};

export default Wrapper;