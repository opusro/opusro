import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './blog/ScrollToTop.jsx'

const BlogIndex = lazy(() => import('./blog/BlogIndex.jsx'))
const BlogPost = lazy(() => import('./blog/BlogPost.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Suspense fallback={null}><BlogIndex /></Suspense>} />
        <Route path="/blog/:slug" element={<Suspense fallback={null}><BlogPost /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
