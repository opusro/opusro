import BlogNav from "./BlogNav";
import "./blog.css";

const BlogLayout = ({ children }) => {
  return (
    <div className="blog-layout">
      <BlogNav />
      <main className="blog-layout__main">{children}</main>
      <footer className="blog-footer">
        <p className="blog-footer__text">
          &copy; {new Date().getFullYear()} OPUS
        </p>
      </footer>
    </div>
  );
};

export default BlogLayout;
