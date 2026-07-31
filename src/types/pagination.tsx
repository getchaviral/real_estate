'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const getPaginationItems = () => {
    const items: (number | '...')[] = [];
    const siblingCount = 1;
    const totalPageNumbers = siblingCount + 5;

    if (totalPages <= totalPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
      return items;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      for (let i = 1; i <= leftItemCount; i++) items.push(i);
      items.push('...');
      items.push(totalPages);
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      items.push(firstPageIndex);
      items.push('...');
      for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) items.push(i);
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      items.push(firstPageIndex);
      items.push('...');
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) items.push(i);
      items.push('...');
      items.push(lastPageIndex);
    }

    return items;
  };

  return (
    <ShadcnPagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createPageURL(currentPage - 1)} aria-disabled={currentPage <= 1} />
        </PaginationItem>
        {getPaginationItems().map((item, index) =>
          item === '...' ? (
            <PaginationItem key={`ellipsis-${index}`}><PaginationEllipsis /></PaginationItem>
          ) : (
            <PaginationItem key={item}><PaginationLink href={createPageURL(item)} isActive={currentPage === item}>{item}</PaginationLink></PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext href={createPageURL(currentPage + 1)} aria-disabled={currentPage >= totalPages} />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
