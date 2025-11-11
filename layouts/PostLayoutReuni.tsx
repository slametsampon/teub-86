// layouts/PostLayoutReuni.tsx

import { ReactNode } from 'react';
import type { ReuniDoc } from 'contentlayer/generated';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import PageTitle from '@/components/PageTitle';

interface Props {
  content: ReuniDoc;
  children: ReactNode;
}

export default function PostLayoutReuni({ content, children }: Props) {
  const { title, date, location, host } = content;

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <header className="py-6 text-center">
          <PageTitle>{title}</PageTitle>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <p>
              📍 {location} •{' '}
              {new Date(date).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            {host && <p>👥 Diselenggarakan oleh: {host}</p>}
          </div>
        </header>
        <div className="prose max-w-none pb-8 dark:prose-invert">
          {children}
        </div>
      </article>
    </SectionContainer>
  );
}
