"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Blog } from "@/lib/types/models"
import { fadeUp } from "@/lib/motion-variants"

interface PostCardProps {
  post: Blog
  lang: string
  index?: number
}

export function PostCard({ post, lang, index = 0 }: PostCardProps) {
  const isArabic = lang === 'ar'
  const date = new Date(post.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-card/50 backdrop-blur-sm group-hover:-translate-y-2">
        <Link href={`/${lang}/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
            alt={post.featuredImage?.node?.altText || post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {post.categories?.nodes?.[0] && (
            <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground backdrop-blur-md border-none">
              {post.categories.nodes[0].name}
            </Badge>
          )}
        </Link>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {isArabic ? "5 دقائق" : "5 min read"}
            </span>
          </div>
          <Link href={`/${lang}/blog/${post.slug}`}>
            <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
              {post.title}
            </h3>
          </Link>
          <div
            className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
          />
          <Link
            href={`/${lang}/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary group/link"
          >
            {isArabic ? "اقرأ المزيد" : "Read More"}
            <ArrowLeft className={`w-4 h-4 transition-transform duration-300 ${isArabic ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1 rotate-180'}`} />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
