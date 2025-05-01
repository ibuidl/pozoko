'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSegments.length - 1;

    return {
      name: segment,
      path,
      isLast,
    };
  });

  return (
    <div className="flex items-center gap-2 text-sm font-medium mb-6">
      {breadcrumbs.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
          {item.isLast ? (
            <span className="text-gray-900 capitalize">{item.name}</span>
          ) : (
            <Link
              href={item.path}
              className="text-gray-600 hover:text-gray-900 transition-colors capitalize"
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
