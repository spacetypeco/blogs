"use client";

import dayjs from "dayjs";

import Link from "next/link";
import { useMemo, useState } from "react";

type Page = {
  id: string;
  title: string;
  path: string;
  publishedDate: number | null;
  type: string | null;
};

type PageListProps = {
  pages: Page[];
};

export default function PageList({ pages }: PageListProps) {
  // Get unique types
  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(pages.map((p) => p.type))).sort((a, b) => {
      // Sort nulls first
      if (a === null && b === null) return 0;
      if (a === null) return -1;
      if (b === null) return 1;
      return a.localeCompare(b);
    });
  }, [pages]);

  // State for selected type filter (null means "all")
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Filter pages based on selected type (null = show all)
  const filteredPages = useMemo(() => {
    if (selectedType === null) return pages;
    return pages.filter((p) => p.type === selectedType);
  }, [pages, selectedType]);

  const showTabs = uniqueTypes.length > 1;

  return (
    <section className="container w-full flex flex-col pt-12 gap-6 items-start">
      {showTabs && (
        <div className="flex gap-4 pb-2 w-full">
          {uniqueTypes.map((type) => {
            const typeLabel = type === null ? "🏡 home" : type;
            const isActive = selectedType === type;

            return (
              <button
                key={type ?? "null"}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 ${
                  isActive
                    ? "border-b-2 border-current font-medium"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {typeLabel}
              </button>
            );
          })}
        </div>
      )}
      {filteredPages.map((page) => {
        return (
          <div key={page.id} className="flex flex-col gap-1">
            <Link href={page.path} className="color-accent-hover t6">
              {page.title}
            </Link>
            <span className="text-base">
              {page.publishedDate
                ? dayjs(page.publishedDate).format("MMM DD, YYYY")
                : "unpublished"}
            </span>
          </div>
        );
      })}
    </section>
  );
}
