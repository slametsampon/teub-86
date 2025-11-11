// app/page.tsx

'use client';

import { allReuniDocs, allBlogs } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import SectionList from '@/components/SectionList';
import BlogCard from '@/components/BlogCard';
import ReuniCard from '@/components/ReuniCard';

export default function Home() {
  const blogPosts = allCoreContent(sortPosts(allBlogs));
  const reuniPosts = allCoreContent(sortPosts(allReuniDocs));

  return (
    <section className="relative py-8">
      {/* Hero Section */}
      <div className="relative z-10 mb-12 mt-6 text-center">
        <h1 className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl">
          TEUB-86 Alumni & Blog Platform
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          Dokumentasi kenangan reuni dan berbagi artikel teknik untuk alumni
          Teknik Elektro UB 1986.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Dibangun dengan ❤️ menggunakan Next.js & Contentlayer.
        </p>
      </div>

      {/* Section Reuni */}
      <SectionList
        title="📌 Dokumentasi Reuni"
        items={reuniPosts}
        basePath="/reuni"
        maxDisplay={3}
        renderItem={(post) => <ReuniCard key={post.slug} post={post} />}
      />

      {/* Section Blog */}
      <SectionList
        title="✍️ Artikel Terbaru"
        items={blogPosts}
        basePath="/blog"
        maxDisplay={3}
        renderItem={(post) => <BlogCard key={post.slug} post={post} />}
      />

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-r from-blue-600/20 via-cyan-400/20 to-green-300/20 blur-3xl" />
    </section>
  );
}
