import Figure from './Figure';

const mdxComponents = {
  // Figure is available in MDX as <Figure src="..." caption="..." />
  Figure,

  // Wrap images in figure-like treatment
  img: (props) => (
    <figure className="figure">
      <img className="figure__image" loading="lazy" {...props} />
    </figure>
  ),
};

export default mdxComponents;
