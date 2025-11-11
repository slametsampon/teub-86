// components/SectionList.tsx

'use client';

import Link from 'next/link';

interface SectionListProps<T> {
  title: string;
  items: T[];
  basePath: string;
  maxDisplay?: number;
  showMoreLink?: boolean;
  renderItem: (item: T) => React.ReactNode;
}

export default function SectionList<T>({
  title,
  items,
  basePath,
  maxDisplay = 5,
  showMoreLink = true,
  renderItem,
}: SectionListProps<T>) {
  const displayItems = items.slice(0, maxDisplay);

  return (
    <section className="mx-auto my-12 max-w-4xl">
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
        {title}
      </h2>

      <ul className="space-y-8">
        {displayItems.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>

      {showMoreLink && items.length > maxDisplay && (
        <div className="mt-6 text-center">
          <Link
            href={basePath}
            className="text-sm font-medium text-primary-600 hover:text-primary-400"
          >
            Lihat semua →
          </Link>
        </div>
      )}
    </section>
  );
}
