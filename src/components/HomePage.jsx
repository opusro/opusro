import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandMark from "./BrandMark";
import Dock from "./Dock";
import AppModal from "./AppModal";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeApp, setActiveApp] = useState(null);

  useEffect(() => {
    document.body.classList.add("body-home-lock");
    return () => {
      document.body.classList.remove("body-home-lock");
    };
  }, []);

  return (
    <main className="home-page">
      <div className="home-page__grain" aria-hidden="true" />
      <div className="home-page__brand">
        <BrandMark />
      </div>

      <Dock
        onOpenProduct={(id) => setActiveApp(id)}
        onOpenBlog={() => navigate("/blog")}
        onOpenContact={() => {
          window.location.href = "mailto:hi@opus.ro";
        }}
      />

      <AppModal appId={activeApp} onClose={() => setActiveApp(null)} />
    </main>
  );
};

export default HomePage;
