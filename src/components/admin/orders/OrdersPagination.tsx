
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface OrdersPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const OrdersPagination: React.FC<OrdersPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Function to generate page numbers with ellipsis for better UX
  const getPageNumbers = () => {
    // Ajuste para telas diferentes
    const isMobile = window.innerWidth < 640;
    const maxPagesToShow = isMobile ? 3 : 5;
    const pageNumbers = [];
    
    if (totalPages <= maxPagesToShow) {
      // If total pages are less than max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of page range around current page
      const startPage = Math.max(2, currentPage - (isMobile ? 0 : 1));
      const endPage = Math.min(totalPages - 1, currentPage + (isMobile ? 0 : 1));
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('ellipsis-start');
      }
      
      // Add pages around current page
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis-end');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <Pagination className="my-4">
      <PaginationContent className="flex-wrap justify-center gap-1">
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm`}
          />
        </PaginationItem>
        
        {getPageNumbers().map((number, index) => (
          number === 'ellipsis-start' || number === 'ellipsis-end' ? (
            <PaginationItem key={`ellipsis-${index}`} className="hidden xs:inline-flex">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={number}>
              <PaginationLink
                isActive={currentPage === number}
                onClick={() => onPageChange(number as number)}
                className="text-xs sm:text-sm h-8 w-8 sm:h-9 sm:w-9"
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          )
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
