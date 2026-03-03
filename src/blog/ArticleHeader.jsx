const ArticleHeader = ({ title, subtitle, date, readingTime }) => {
  return (
    <header className="article-header">
      <p className="article-header__meta">
        {date}{readingTime ? ` · ${readingTime}` : ''}
      </p>
      <h1 className="article-header__title">{title}</h1>
      {subtitle && <p className="article-header__subtitle">{subtitle}</p>}
      <hr className="article-header__rule" />
    </header>
  );
};

export default ArticleHeader;
