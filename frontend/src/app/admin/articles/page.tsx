"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Pencil, ExternalLink } from "lucide-react";
import { articlesAPI } from "@/lib/api";

interface ArticleItem {
  _id: string;
  Title: string;
  content?: string;
  pinned?: boolean;
  thumbnailUrl?: string;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const all = await articlesAPI.getAll();
      setArticles(Array.isArray(all) ? all : []);
    } catch {
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (article: ArticleItem) => {
    if (!confirm("Delete this article?")) return;
    try {
      await articlesAPI.delete(article._id);
      load();
    } catch {
      alert("Failed to delete article");
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center gap-2 text-text-secondary text-sm">
        <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        Loading…
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary mb-1">Articles</h1>
          <p className="text-text-secondary text-sm">
            {articles.length} article{articles.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          <Plus size={15} />
          New article
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      {articles.length === 0 ? (
        <div className="border border-dashed border-border-color rounded-2xl p-12 text-center">
          <p className="text-text-secondary text-sm mb-4">No articles yet.</p>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            <Plus size={15} />
            Write your first article
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article._id}
              className="border border-border-color bg-white rounded-2xl px-6 py-4 flex items-center justify-between gap-4"
            >
              {article.thumbnailUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.thumbnailUrl}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-border-color"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-text-primary font-medium text-sm truncate mb-0.5">
                  {article.Title}
                </h3>
                {article.content && (
                  <p className="text-text-secondary text-xs truncate">
                    {article.content.substring(0, 80)}…
                  </p>
                )}
                {article.pinned && (
                  <p className="text-accent-dark text-xs font-medium uppercase tracking-wider mt-1">
                    Pinned
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/admin/articles/${article._id}/edit`}
                  className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Pencil size={15} />
                </Link>
                <button
                  onClick={() => handleDelete(article)}
                  className="p-2 rounded-lg text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
