"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import blogsData from "@/data/blogs.json";
import type { Blog } from "@/types/blog";

const blogs = blogsData as Blog[];
const featuredBlogs = blogs.filter((b) => b.isFeatured);

export default function BlogPreview() {
  if (featuredBlogs.length === 0) return null;

  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Latest from Our Blog"
          subtitle="Expert insights, guides, and tips for home buyers"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group h-full overflow-hidden">
                {/* Image Placeholder */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 sm:h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <Badge
                    variant="primary"
                    size="sm"
                    className="absolute left-3 top-3 backdrop-blur-sm"
                  >
                    {blog.category}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {blog.readTime} min read
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {blog.author.name}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary">
                      Read More
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Button variant="outline" size="lg" className="gap-2">
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

