import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandMark from "./BrandMark";
import Dock from "./Dock";
import AppModal from "./AppModal";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeApp, setActiveApp] = useState(null);
  const [brandExpanded, setBrandExpanded] = useState(false);

  useEffect(() => {
    document.body.classList.add("body-home-lock");
    return () => {
      document.body.classList.remove("body-home-lock");
    };
  }, []);

  return (
    <main
      className="home-page"
      onClick={() => setBrandExpanded((v) => !v)}
    >
      <div className="home-page__grain" aria-hidden="true" />
      <div className="home-page__brand">
        <BrandMark expanded={brandExpanded} onExpandedChange={setBrandExpanded} />
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <Dock
          onOpenProduct={(id) => setActiveApp(id)}
          onOpenBlog={() => navigate("/blog")}
          onOpenContact={() => setActiveApp("contact")}
        />
      </div>

      <p className="home-page__copyright">
        Copyright © 2026 OPUSCULUM SRL. All rights reserved.
      </p>

      <div onClick={(e) => e.stopPropagation()}>
        <AppModal appId={activeApp} onClose={() => setActiveApp(null)} />
      </div>
    </main>
  );
};

export default HomePage;
