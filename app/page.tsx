// app/page.tsx

import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import siteMetadata from '@/data/siteMetadata';
import Tag from '@/components/Tag';

const MAX_DISPLAY = 5;

export default function Home() {
  const sortedPosts = allCoreContent(sortPosts(allBlogs)).slice(0, MAX_DISPLAY);

  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="relative z-10 mb-12 mt-10 text-center">
        <h1 className="bg-gradient-to-r from-green-600 via-cyan-500 to-blue-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          TEUB-86: Industrial Knowledge Platform
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          Sistem dokumentasi dan blog modern berbasis{' '}
          <span className="font-medium text-primary-500">Next.js</span> &{' '}
          <span className="font-medium text-primary-500">Markdown</span> untuk
          sektor{' '}
          <strong className="text-green-700 dark:text-green-300">
            engineering, project, safety, dan maintenance
          </strong>
          .
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Built with ❤️ for engineers, by engineers.
        </p>
      </div>

      {/* Topics Preview */}
      <div className="mb-10 flex flex-wrap justify-center gap-3 text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {['AI', 'Design', 'Project', 'Maintenance', 'Safety'].map((topic) => (
          <span
            key={topic}
            className="rounded border border-gray-300 px-3 py-1 text-xs font-medium dark:border-gray-600"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Latest Posts */}
      <div className="mx-auto max-w-4xl space-y-10">
        <ul className="space-y-10">
          {sortedPosts.map((post) => (
            <li
              key={post.slug}
              className="transition-all duration-300 hover:-translate-y-1 hover:opacity-95"
            >
              <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary-500"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div className="mt-2 text-gray-600 dark:text-gray-300">
                  {post.summary}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-400 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    Baca selengkapnya →
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Link to All Posts */}
        {allBlogs.length > MAX_DISPLAY && (
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="rounded bg-primary-600 px-6 py-2 text-sm font-medium text-white shadow hover:bg-primary-700"
            >
              Lihat Semua Postingan →
            </Link>
          </div>
        )}
      </div>

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72 bg-gradient-to-r from-[#00FFCB33] via-[#00FFE033] to-[#6EC1E433] blur-3xl" />
    </section>
  );
}
