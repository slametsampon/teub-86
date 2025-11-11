// layouts/SimpleListLayout.tsx

import Link from 'next/link';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { ReuniDoc } from 'contentlayer/generated';

interface Props {
  posts: CoreContent<ReuniDoc>[];
  title: string;
  description?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
  };
}

export default function SimpleListLayout({
  posts,
  title,
  description,
  pagination,
}: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">{title}</h1>
      {description && <p className="mb-6 text-gray-600">{description}</p>}

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link
              href={`/reuni/${post.slug}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}{' '}
              — {post.location}
            </p>
            {post.summary && (
              <p className="mt-2 text-gray-700">{post.summary}</p>
            )}
          </li>
        ))}
      </ul>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex justify-center space-x-4 text-sm">
          {pagination.currentPage > 1 && (
            <Link href={`/reuni/page/${pagination.currentPage - 1}`}>
              ← Sebelumnya
            </Link>
          )}
          <span>
            Halaman {pagination.currentPage} dari {pagination.totalPages}
          </span>
          {pagination.currentPage < pagination.totalPages && (
            <Link href={`/reuni/page/${pagination.currentPage + 1}`}>
              Selanjutnya →
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
