import { useState } from "react";
import type { Meme } from "@/features/memesSlice";

export function usePagination(filteredList: Meme[]) {
      const [page, setPage] = useState<number>(1);
      const PAGE_SIZE = 12;
      const totalPages = Math.ceil(filteredList.length / PAGE_SIZE);
      const paginatedMemes = filteredList.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
      );

    return { page, setPage, totalPages, paginatedMemes };
} 
