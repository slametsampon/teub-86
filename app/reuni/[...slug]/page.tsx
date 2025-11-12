// app/reuni/[...slug]/page.tsx

import { allReuniDocs } from 'contentlayer/generated';
import { Metadata } from 'next';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import { components } from '@/components/MDXComponents';
import PageTitle from '@/components/PageTitle';
import siteMetadata from '@/data/siteMetadata';
import PostLayout from '@/layouts/PostLayoutReuni'; // ⬅️ Layout baru, disiapkan di langkah 3

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }; // ✅ Harus array!
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));
  const post = allReuniDocs.find((p) => p.slug === slug);

  if (!post) return;

  const image = siteMetadata.socialBanner;

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteMetadata.siteUrl}/reuni/${post.slug}`,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [image],
    },
  };
}

export async function generateStaticParams() {
  return allReuniDocs.map((doc) => ({
    slug: doc.slug.split('/'), // ✅ harus array
  }));
}

export default function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'));
  const post = allReuniDocs.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="mt-24 text-center">
        <PageTitle>Reuni tidak ditemukan ❌</PageTitle>
      </div>
    );
  }

  return (
    <PostLayout content={post}>
      <MDXLayoutRenderer code={post.body.code} components={components} />
    </PostLayout>
  );
}
