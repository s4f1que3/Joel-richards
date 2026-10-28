import Image from "next/image";

interface Article {
  _id: string;
  Title: string;
  content?: string;
  thumbnailUrl?: string;
}

export default function ArticleCard({ article }: { article: Article }) {
  const excerpt =
    article.content && article.content.length > 140
      ? article.content.substring(0, 140) + "…"
      : article.content;

  return (
    <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col">
      {article.thumbnailUrl && (
        <div className="relative w-full aspect-[16/10] bg-surface">
          <Image
            src={article.thumbnailUrl}
            alt={article.Title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 380px"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-text-primary font-semibold text-base mb-2 leading-snug">
          {article.Title}
        </h3>
        {excerpt && (
          <p className="text-text-secondary text-sm leading-relaxed flex-1 line-clamp-3">{excerpt}</p>
        )}
      </div>
    </div>
  );
}
