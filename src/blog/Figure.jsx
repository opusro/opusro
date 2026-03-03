const Figure = ({ src, alt, caption, full }) => {
  return (
    <figure className={`figure${full ? ' figure--full' : ''}`}>
      <img
        className="figure__image"
        src={src}
        alt={alt || caption || ''}
        loading="lazy"
      />
      {caption && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  );
};

export default Figure;
