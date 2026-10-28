"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

interface ArticleFormProps {
  initialData?: {
    title?: string;
    content?: string;
    thumbnailUrl?: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
}

export default function ArticleForm({
  initialData,
  onSubmit,
  submitLabel = "Publish",
}: ArticleFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [removeThumbnail, setRemoveThumbnail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("content", content);
      if (thumbnail) fd.append("thumbnail", thumbnail);
      if (removeThumbnail && !thumbnail) fd.append("remove_thumbnail", "true");
      await onSubmit(fd);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Title <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={100}
          className="w-full bg-white border border-border-color rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-text-secondary/60"
          placeholder="Article title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Content <span className="text-red-600">*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={12}
          className="w-full bg-white border border-border-color rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-text-secondary/60"
          placeholder="Write your article…"
        />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Thumbnail
        </label>
        <div className="border border-dashed border-border-color rounded-xl p-4">
          <label
            htmlFor="thumbnail-upload"
            className="flex items-center gap-2 cursor-pointer text-text-secondary text-sm hover:text-primary transition-colors w-fit"
          >
            <Upload size={15} />
            <span>
              {thumbnail
                ? "Replace thumbnail"
                : initialData?.thumbnailUrl && !removeThumbnail
                ? "Replace thumbnail"
                : "Add thumbnail"}
            </span>
          </label>
          <input
            id="thumbnail-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setThumbnail(file);
              setRemoveThumbnail(false);
              if (file) {
                setThumbnailPreview(URL.createObjectURL(file));
              } else {
                setThumbnailPreview(null);
              }
              e.target.value = "";
            }}
            className="hidden"
          />

          {!thumbnail && !removeThumbnail && initialData?.thumbnailUrl && (
            <div className="mt-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={initialData.thumbnailUrl}
                alt="Current thumbnail"
                className="w-20 h-14 object-cover rounded-lg border border-border-color"
              />
              <button
                type="button"
                onClick={() => setRemoveThumbnail(true)}
                className="text-xs text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
              >
                <X size={11} /> Remove thumbnail
              </button>
            </div>
          )}

          {removeThumbnail && !thumbnail && (
            <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
              <span>Thumbnail will be removed.</span>
              <button
                type="button"
                onClick={() => setRemoveThumbnail(false)}
                className="text-primary hover:underline"
              >
                Undo
              </button>
            </div>
          )}

          {thumbnail && (
            <div className="mt-3 flex items-center gap-3">
              {thumbnailPreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-20 h-14 object-cover rounded-lg border border-border-color"
                />
              )}
              <button
                type="button"
                onClick={() => {
                  setThumbnail(null);
                  setThumbnailPreview(null);
                }}
                className="text-xs text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
              >
                <X size={11} /> Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
