// components/BlogCard.tsx

import Link from 'next/link';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import Tag from './Tag';

export default function BlogCard({ post }: { post: CoreContent<Blog> }) {
  return (
    <article className="rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        <Link href={`/blog/${post.slug}`} className="hover:text-primary-500">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{post.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
    </article>
  );
}
