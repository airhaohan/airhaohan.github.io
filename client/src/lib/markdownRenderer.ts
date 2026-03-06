/**
 * Markdown renderer with KaTeX math support
 * Uses markdown-it for Markdown parsing
 * Uses window.katex (loaded via CDN in index.html) for math rendering
 */

import MarkdownIt from "markdown-it";

// Initialize markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
});

function renderMath(tex: string, displayMode: boolean): string {
  try {
    // Use global katex loaded from CDN
    const katex = (window as any).katex;
    if (!katex) {
      return displayMode
        ? `<div class="katex-display-wrapper"><code>$$${tex}$$</code></div>`
        : `<code>$${tex}$</code>`;
    }
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      trust: false,
    });
  } catch {
    return displayMode
      ? `<div class="katex-display-wrapper"><code>${tex}</code></div>`
      : `<code>${tex}</code>`;
  }
}

export function renderMarkdown(content: string): string {
  // Pre-process: handle display math $$...$$ first (before inline)
  const processed = content
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
      const rendered = renderMath(tex.trim(), true);
      return `\n\n<div class="katex-display-wrapper">${rendered}</div>\n\n`;
    })
    .replace(/\$([^\n$]+?)\$/g, (_, tex) => {
      return renderMath(tex.trim(), false);
    });

  return md.render(processed);
}
