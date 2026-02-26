import { cn } from "@/lib/utils";

type LegalSection = {
  title: string;
  content: readonly string[];
  list?: readonly string[];
  afterList?: readonly string[];
};

export function LegalPage({
  title,
  intro,
  sections,
  className,
}: {
  title: string;
  intro?: string;
  sections: readonly LegalSection[];
  className?: string;
}) {
  return (
    <article className={cn("mx-auto max-w-3xl", className)}>
      <header className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {intro}
          </p>
        ) : null}
      </header>

      <div className="mt-12 grid gap-10">
        {sections.map((section) => (
          <section key={section.title} className="grid gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {section.title}
            </h2>
            {section.content.map((paragraph, idx) => {
              const parts = paragraph.split(/(https?:\/\/\S+|support@gitview\.com)/g);
              return (
                <p
                  key={idx}
                  className="text-sm leading-6 text-muted-foreground"
                >
                  {parts.map((part, partIdx) => {
                    const isEmail = part === "support@gitview.com";
                    const isUrl = part.startsWith("http://") || part.startsWith("https://");
                    if (!isEmail && !isUrl) return <span key={partIdx}>{part}</span>;
                    const href = isEmail ? `mailto:${part}` : part;
                    return (
                      <a
                        key={partIdx}
                        href={href}
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {part}
                      </a>
                    );
                  })}
                </p>
              );
            })}
            {section.list?.length ? (
              <ul className="grid gap-2 pl-5 text-sm text-muted-foreground">
                {section.list.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {section.afterList?.length
              ? section.afterList.map((paragraph, idx) => (
                  <p
                    key={`after-${idx}`}
                    className="text-sm leading-6 text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))
              : null}
          </section>
        ))}
      </div>
    </article>
  );
}
