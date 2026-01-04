// Admin shell outline (for future drop-in; not wired to app)
// Assumes React + Vite. Guarded by VITE_ENABLE_ADMIN_UI flag.

import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SupabaseAdminProvider } from "./supabase-admin-provider"; // to be created when wiring

const Dashboard = React.lazy(() => import("./screens/Dashboard"));
const Pages = React.lazy(() => import("./screens/Pages"));
const PageDetail = React.lazy(() => import("./screens/PageDetail"));
const Products = React.lazy(() => import("./screens/Products"));
const ProductDetail = React.lazy(() => import("./screens/ProductDetail"));
const Blogs = React.lazy(() => import("./screens/Blogs"));
const BlogDetail = React.lazy(() => import("./screens/BlogDetail"));
const Media = React.lazy(() => import("./screens/Media"));
const Globals = React.lazy(() => import("./screens/Globals"));
const Activity = React.lazy(() => import("./screens/Activity"));

const queryClient = new QueryClient();

const enableAdmin = import.meta.env.VITE_ENABLE_ADMIN_UI === "true";

export function AdminApp() {
  if (!enableAdmin) return <Navigate to="/" replace />;
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAdminProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading admin…</div>}>
            <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/pages" element={<Pages />} />
              <Route path="/admin/pages/:slug" element={<PageDetail />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/products/:handle" element={<ProductDetail />} />
              <Route path="/admin/blogs" element={<Blogs />} />
              <Route path="/admin/blogs/:slug" element={<BlogDetail />} />
              <Route path="/admin/media" element={<Media />} />
              <Route path="/admin/globals" element={<Globals />} />
              <Route path="/admin/activity" element={<Activity />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SupabaseAdminProvider>
    </QueryClientProvider>
  );
}
