import { Link } from "react-router-dom";

const BlogNav = () => {
  return (
    <nav className="blog-nav">
      <div className="blog-nav__brand-wrap">
        <Link to="/" className="blog-nav__brand">
          OPUS
        </Link>
        <span className="blog-nav__subtitle">human experience design</span>
      </div>
      <Link to="/blog" className="blog-nav__link">
        Blog
      </Link>
    </nav>
  );
};

export default BlogNav;
