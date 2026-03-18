import BlogLayout from './BlogLayout';
import ArticlePreview from './ArticlePreview';
import { posts } from './posts';

const BlogIndex = () => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <BlogLayout>
      <div className="blog-index">
        <h1 className="blog-index__title">Writing</h1>
        <ul className="blog-index__list">
          {sortedPosts.map((post) => (
            <ArticlePreview
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              readingTime={post.readingTime}
            />
          ))}
        </ul>
      </div>
    </BlogLayout>
  );
};

export default BlogIndex;
