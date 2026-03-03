import { Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ArticleLayout from './ArticleLayout';
import { posts } from './posts';

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const PostContent = post.component;

  return (
    <ArticleLayout meta={post}>
      <Suspense fallback={null}>
        <PostContent />
      </Suspense>
    </ArticleLayout>
  );
};

export default BlogPost;
