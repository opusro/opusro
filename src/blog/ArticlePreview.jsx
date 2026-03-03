import { Link } from 'react-router-dom';

const ArticlePreview = ({ slug, title, date, excerpt, readingTime }) => {
  return (
    <li>
      <Link to={`/blog/${slug}`} className="article-preview">
        <p className="article-preview__meta">
          {date}{readingTime ? ` · ${readingTime}` : ''}
        </p>
        <h2 className="article-preview__title">{title}</h2>
        {excerpt && <p className="article-preview__excerpt">{excerpt}</p>}
      </Link>
    </li>
  );
};

export default ArticlePreview;
