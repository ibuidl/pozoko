'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumb() {
  const pathname = usePathname();
  let pathSegments = pathname.split('/').filter(Boolean);
  // 跳过第一个 'studio' 路由
  if (pathSegments[0] === 'studio') {
    pathSegments = pathSegments.slice(1);
  }

  const breadcrumbs = pathSegments.map((segment, index) => {
    // 路径拼接时补回 studio
    const path = `/studio/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSegments.length - 1;

    // 如果段落以 'detail' 开头，显示 'Detail' 而不是实际的参数值
    const displayName = segment.startsWith('detail') ? 'Detail' : segment;

    return {
      name: displayName,
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
