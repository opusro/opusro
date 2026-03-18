import { Link } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import BlogLayout from './BlogLayout';
import ArticleHeader from './ArticleHeader';
import mdxComponents from './mdxComponents';

const ArticleLayout = ({ meta, children }) => {
  return (
    <BlogLayout>
      <article className="article">
        <ArticleHeader
          title={meta.title}
          subtitle={meta.subtitle}
          date={meta.date}
          readingTime={meta.readingTime}
        />
        <div className="prose">
          <MDXProvider components={mdxComponents}>
            {children}
          </MDXProvider>
        </div>
        <Link to="/blog" className="article-back">
          &larr; All posts
        </Link>
      </article>
    </BlogLayout>
  );
};

export default ArticleLayout;
