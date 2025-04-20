import { useState, useEffect } from "react";

export function TableOfContents({ items }) {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block py-1 text-sm transition-colors hover:text-primary ${
            activeId === item.id
              ? "font-medium text-primary"
              : "text-muted-foreground"
          }`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
