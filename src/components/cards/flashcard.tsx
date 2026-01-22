import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface FlashcardProps {
  title: string;
  content: string;
  className?: string;
}

export function Flashcard({ title, content, className }: FlashcardProps) {
  return (
    <article
      className={`rounded-xl border border-border bg-card p-6 ${className ?? ""}`}
    >
      <h2 className="mb-4 text-xl font-semibold text-balance text-card-foreground">
        {title}
      </h2>
      <div className="prose prose-sm dark:prose-invert max-w-none text-pretty">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {content}
        </Markdown>
      </div>
    </article>
  );
}
