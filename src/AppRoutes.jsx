import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import App from "./App.jsx";
import PageTransition from "./components/PageTransition.jsx";

const BlogIndex = lazy(() => import("./blog/BlogIndex.jsx"));
const BlogPost = lazy(() => import("./blog/BlogPost.jsx"));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <App />
            </PageTransition>
          }
        />
        <Route
          path="/blog"
          element={(
            <Suspense fallback={null}>
              <PageTransition>
                <BlogIndex />
              </PageTransition>
            </Suspense>
          )}
        />
        <Route
          path="/blog/:slug"
          element={(
            <Suspense fallback={null}>
              <PageTransition>
                <BlogPost />
              </PageTransition>
            </Suspense>
          )}
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
