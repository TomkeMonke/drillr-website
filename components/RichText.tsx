import { Fragment } from "react";

const TOKEN_RE = /(https?:\/\/[^\s)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

function isUrl(s: string) {
  return /^https?:\/\//.test(s);
}

function isEmail(s: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(s);
}

export function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN_RE);
  return (
    <>
      {parts.map((part, i) => {
        if (isUrl(part)) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:text-primary-light underline-offset-4 hover:underline transition-colors break-all"
            >
              {part}
            </a>
          );
        }
        if (isEmail(part)) {
          return (
            <a
              key={i}
              href={`mailto:${part}`}
              className="text-primary hover:text-primary-light underline-offset-4 hover:underline transition-colors"
            >
              {part}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
