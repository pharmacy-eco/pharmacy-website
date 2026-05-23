"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { generatePaginationLinks } from "./generate-pages";
import { cn } from "@/lib/utils";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  showPreviousNext: boolean;
};

export default function Paginator({ currentPage, totalPages, onPageChange, showPreviousNext }: PaginatorProps) {
  return (
    <div className="flex items-center gap-4">
      <Pagination>
        <PaginationContent>
          {showPreviousNext && totalPages ? (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (currentPage - 1 < 1) return;
                  onPageChange(currentPage - 1);
                }}
                className={cn({
                  "cursor-pointer": true,
                  "bg-gray-100 cursor-not-allowed": currentPage - 1 < 1
                })}
              />
            </PaginationItem>
          ) : null}
          {generatePaginationLinks(currentPage, totalPages, onPageChange)}
          {showPreviousNext && totalPages ? (
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage > totalPages - 1) return;
                  onPageChange(currentPage + 1);
                }}
                className={cn({
                  "cursor-pointer": true,
                  "bg-gray-100 cursor-not-allowed": currentPage > totalPages - 1
                })}
              />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
