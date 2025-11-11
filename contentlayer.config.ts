// contentlayer.config.ts

import {
  defineDocumentType,
  ComputedFields,
  makeSource,
} from 'contentlayer/source-files';
import { writeFileSync, existsSync } from 'fs';
import readingTime from 'reading-time';
import { slug } from 'github-slugger';
import path from 'path';
import fs from 'fs';

// Remark packages
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import {
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js';
// Rehype packages
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';
import siteMetadata from './data/siteMetadata';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
import type { Blog as BlogType } from 'contentlayer/generated';

const root = process.cwd();
const isProduction = process.env.NODE_ENV === 'production';

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

// ======================================================
// 📘 Blog
// ======================================================
export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    authors: {
      type: 'list',
      of: { type: 'string' },
      default: ['default'],
    },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
        author: doc.authors,
      }),
    },
  },
}));

// ======================================================
// 👤 Authors
// ======================================================
export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    bio: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}));

// ======================================================
// 📄 Page
// ======================================================
export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}));

// ======================================================
// 🧾 Post
// ======================================================
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}));

// ======================================================
// 🎓 ReuniDoc (baru ditambahkan, non-breaking)
// ======================================================
export const ReuniDoc = defineDocumentType(() => ({
  name: 'ReuniDoc',
  filePathPattern: 'reuni/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    location: { type: 'string', required: true },
    host: { type: 'string' },
    summary: { type: 'string' },
    // ❌ Tidak ada thumbnail atau images di sini
    // ✅ Semua gambar ditulis langsung di konten MDX
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: doc.title,
        startDate: doc.date,
        location: {
          '@type': 'Place',
          name: doc.location,
        },
        description: doc.summary,
      }),
    },
  },
}));

// ======================================================
// 🧠 Utility Functions
// ======================================================
function createTagCount(allBlogs: BlogType[]) {
  console.log('🔖 [createTagCount] Starting tag count generation...');
  const tagCount: Record<string, number> = {};
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1;
      });
    }
  });
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount));
  console.log('✅ [createTagCount] tag-data.json created.');
}

function createAuthorCount(allBlogs: BlogType[]) {
  console.log('👤 [createAuthorCount] Generating author counts...');
  const authorCount: Record<string, number> = {};
  allBlogs.forEach((file) => {
    if (file.authors && (!isProduction || file.draft !== true)) {
      file.authors.forEach((author) => {
        const formattedAuthor = slug(author);
        authorCount[formattedAuthor] = (authorCount[formattedAuthor] || 0) + 1;
      });
    }
  });
  writeFileSync('./app/author-data.json', JSON.stringify(authorCount));
  console.log('✅ [createAuthorCount] author-data.json created.');
}

function createSearchIndex(allBlogs: BlogType[]) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    );
    console.log('✅ [createSearchIndex] Local search index generated.');
  }
}

function createKbarSearchIndex(allBlogs: BlogType[]) {
  console.log('🔍 [createKbarSearchIndex] Building Kbar search index...');
  const basePath = process.env.BASE_PATH || '';
  const formatted = allCoreContent(sortPosts(allBlogs)).map((post) => ({
    id: post.slug,
    name: post.title,
    section: 'CONTENT',
    href: `${basePath}/${post.path}`,
    subtitle: new Date(post.date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    keywords: post.tags,
  }));

  writeFileSync('public/search-kbar.json', JSON.stringify(formatted, null, 2));
  console.log('✅ [createKbarSearchIndex] Written to public/search-kbar.json');
}

function readAllBlogsFromFile() {
  const blogDir = path.join(process.cwd(), '.contentlayer/generated/Blog');
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json'));
  return files.map((file) =>
    JSON.parse(fs.readFileSync(path.join(blogDir, file), 'utf-8'))
  );
}

// ======================================================
// 🚀 Export Configuration
// ======================================================
export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog, Authors, Post, Page, ReuniDoc], // ✅ Tambahan ReuniDoc
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [remarkGfm, remarkCodeTitles, remarkMath, remarkImgToJsx],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'content') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    console.log('🚀 [onSuccess] Starting post-build process...');
    let allBlogs = [];
    try {
      const imported = await importData();
      if (Array.isArray(imported?.allBlogs)) {
        allBlogs = imported.allBlogs;
      } else {
        allBlogs = readAllBlogsFromFile();
      }
    } catch {
      allBlogs = readAllBlogsFromFile();
    }

    if (!allBlogs.length) return;
    createAuthorCount(allBlogs);
    createTagCount(allBlogs);
    createSearchIndex(allBlogs);
    createKbarSearchIndex(allBlogs);
    console.log('✅ [onSuccess] Post-build tasks completed.');
  },
});
