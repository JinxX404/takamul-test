"use client";

import { useEffect, useState, useRef } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({
  content,
  lang,
}: {
  content: string;
  lang: string;
}) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const isArabic = lang === "ar";
  const observer = useRef<IntersectionObserver | null>(null);

  // Track visibility status and position of each heading
  const visibleHeadings = useRef<
    Record<string, { isIntersecting: boolean; top: number }>
  >({});

  useEffect(() => {
    // 1. Extract IDs directly from the injected HTML content to ensure exact match
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headingElements = Array.from(doc.querySelectorAll("h2, h3"));

    const items = headingElements
      .map((el) => {
        const text = el.textContent || "";
        return {
          id: el.id,
          text,
          level: parseInt(el.tagName[1]),
        };
      })
      .filter((item) => item.id);

    setHeadings(items);

    // 2. Setup Intersection Observer for Scroll Spy
    visibleHeadings.current = {};
    const readingZoneTop = 100;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        visibleHeadings.current[entry.target.id] = {
          isIntersecting: entry.isIntersecting,
          top: entry.boundingClientRect.top,
        };
      });

      const visible = Object.entries(visibleHeadings.current).filter(
        ([_, data]) => data.isIntersecting,
      );

      if (visible.length === 0) return;

      const activeHeading = visible.sort((a, b) => {
        const aDistance = Math.abs(a[1].top - readingZoneTop);
        const bDistance = Math.abs(b[1].top - readingZoneTop);
        return aDistance - bDistance || a[1].top - b[1].top;
      })[0];

      if (activeHeading) {
        setActiveId((prev) => (prev === activeHeading[0] ? prev : activeHeading[0]));
      }
    };

    const timer = setTimeout(() => {
      observer.current = new IntersectionObserver(handleIntersect, {
        rootMargin: "-100px 0px -70% 0px",
        threshold: 0.1,
      });

      items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.current?.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.current?.disconnect();
    };
  }, [content]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="bg-secondary/30 rounded-3xl p-8 border shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6 font-tajawal font-bold text-xl">
        <List className="w-5 h-5 text-primary" />
        {isArabic ? "محتويات المقال" : "Table of Contents"}
      </div>
      <nav className="space-y-1 relative">
        <div
          className={cn(
            "absolute top-0 bottom-0 w-0.5 bg-primary/10 rounded-full",
            isArabic ? "right-0" : "left-0",
          )}
        />

        {headings.map((heading, i) => (
          <a
            key={i}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={cn(
              "block py-2 text-sm transition-all duration-300 relative border-transparent outline-none focus:text-primary leading-relaxed",
              isArabic ? "pr-6 border-r-2" : "pl-6 border-l-2",
              heading.level === 3 ? (isArabic ? "pr-10" : "pl-10") : "",
              activeId === heading.id
                ? "text-primary font-bold border-primary bg-primary/10 -translate-x-1"
                : "text-muted-foreground hover:text-foreground hover:bg-primary/5",
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
