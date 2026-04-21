"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, MapPin, Calendar, Filter } from "lucide-react";
import { Project, ProjectType } from "@/lib/types/models";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatArabicDate(raw?: string | null) {
  if (!raw) return null;
  try {
    return new Date(raw).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
    });
  } catch {
    return raw;
  }
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, lang }: { project: Project; lang: string }) {
  const imageUrl = project.featuredImage?.node?.sourceUrl || "/placeholder.svg";
  const imageAlt = project.featuredImage?.node?.altText || project.title;
  const categories = project.projecttypes?.nodes || [];
  const formattedDate = formatArabicDate(project.dateOfAccomplish);

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-accent/50 hover:shadow-xl transition-all duration-300 pt-0 relative bg-card">
      {/* Clickable overlay */}
      <Link
        href={`/${lang}/projects/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={project.title}
      />

      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />

        {/* Category badges overlay */}
        {categories.length > 0 && (
          <div className="absolute top-3 end-3 flex flex-wrap gap-1 z-20 pointer-events-none">
            {categories.slice(0, 2).map((cat) => (
              <Badge
                key={cat.slug}
                className="bg-accent/90 text-accent-foreground text-xs border-0 shadow"
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="pt-4 pointer-events-none relative z-20">
        <h3 className="font-bold text-foreground text-base mb-3 line-clamp-2 leading-snug">
          {project.title}
        </h3>

        <div className="space-y-2">
          {project.address && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
              <span className="line-clamp-1">{project.address}</span>
            </div>
          )}
          {formattedDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-accent shrink-0" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 relative z-20 pointer-events-none">
        <Button
          variant="outline"
          className="w-full gap-2 pointer-events-auto"
          asChild
        >
          <Link href={`/${lang}/projects/${project.slug}`}>
            {lang === "ar" ? "عرض التفاصيل" : "View Details"}
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────

interface ProjectsGridClientProps {
  projects: Project[];
  categories: ProjectType[];
  lang: string;
}

export function ProjectsGridClient({
  projects,
  categories,
  lang,
}: ProjectsGridClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allLabel = lang === "ar" ? "الكل" : "All";

  const filterCategories = [
    { slug: "all", name: allLabel },
    ...categories,
  ];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) =>
      p.projecttypes?.nodes?.some((c) => c.slug === activeCategory)
    );
  }, [activeCategory, projects]);

  return (
    <>
      {/* Filter Bar */}
      <section className="py-5 bg-secondary border-b border-border sticky top-0 z-30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
            <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">
                {lang === "ar" ? "تصنيف:" : "Filter:"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {filterCategories.map((cat) => (
                <Button
                  key={cat.slug}
                  variant={activeCategory === cat.slug ? "default" : "outline"}
                  size="sm"
                  className="shrink-0 transition-all"
                  onClick={() => setActiveCategory(cat.slug)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-14 bg-background min-h-[40vh]">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center text-muted-foreground py-16 space-y-2">
              <p className="text-lg">
                {lang === "ar"
                  ? "لا توجد مشاريع في هذا التصنيف"
                  : "No projects in this category"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
