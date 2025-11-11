// app/reuni/page.tsx

import { allReuniDocs } from 'contentlayer/generated';
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer';
import { Metadata } from 'next';
import SimpleListLayout from '@/layouts/SimpleListLayout';

export const metadata: Metadata = {
  title: 'Reuni TEUB-86',
  description: 'Dokumentasi kegiatan reuni alumni TEUB-86',
};

const POSTS_PER_PAGE = 10;

export default function ReuniPage() {
  const posts = allCoreContent(sortPosts(allReuniDocs));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <SimpleListLayout
      posts={posts}
      pagination={pagination}
      title="Dokumentasi Reuni"
      description="Arsip kegiatan reuni alumni Teknik Universitas Brawijaya Angkatan 1986 (TEUB-86)"
    />
  );
}
