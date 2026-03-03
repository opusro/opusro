import { Link } from 'react-router-dom';

const BlogNav = () => {
  return (
    <nav className="blog-nav">
      <Link to="/" className="blog-nav__brand">
        OPUS
      </Link>
      <Link to="/blog" className="blog-nav__link">
        Blog
      </Link>
    </nav>
  );
};

export default BlogNav;
