// app/reuni/page.tsx

import { allReuniDocs } from 'contentlayer/generated';
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer';
import SimpleListLayout from '@/layouts/SimpleListLayout';

const POSTS_PER_PAGE = 10;

export default function ReuniPage() {
  const rawPosts = sortPosts(allReuniDocs);

  // 🔍 Tambahkan log ini
  console.log('📦 Total ReuniDocs ditemukan:', rawPosts.length);
  rawPosts.forEach((doc) => {
    console.log(`- ${doc.title} | ${doc.slug}`);
  });

  const posts = allCoreContent(rawPosts);
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
