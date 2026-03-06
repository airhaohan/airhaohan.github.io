/**
 * BibTeX parser utility
 * Parses .bib file content into structured paper objects
 */

export interface Paper {
  key: string;
  type: string;
  title: string;
  authors: string[];
  venue: string;
  year: string;
  url?: string;
  abstract?: string;
  note?: string;
  journal?: string;
  booktitle?: string;
}

function extractField(entry: string, field: string): string {
  const patterns = [
    new RegExp(`${field}\\s*=\\s*\\{([^{}]*)\\}`, 'i'),
    new RegExp(`${field}\\s*=\\s*"([^"]*)"`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = entry.match(pattern);
    if (match) return match[1].trim();
  }
  return '';
}

function parseAuthors(authorStr: string): string[] {
  if (!authorStr) return [];
  return authorStr
    .split(' and ')
    .map(a => a.trim())
    .filter(Boolean);
}

export function parseBibTeX(bibContent: string): Paper[] {
  const papers: Paper[] = [];
  // Match each @type{key, ...} block
  const entryRegex = /@(\w+)\s*\{\s*([^,]+),\s*([\s\S]*?)\n\}/g;
  let match;

  while ((match = entryRegex.exec(bibContent)) !== null) {
    const type = match[1].toLowerCase();
    const key = match[2].trim();
    const body = match[3];

    if (type === 'string' || type === 'preamble' || type === 'comment') continue;

    const title = extractField(body, 'title');
    const authorStr = extractField(body, 'author');
    const year = extractField(body, 'year');
    const venue = extractField(body, 'venue') ||
                  extractField(body, 'booktitle') ||
                  extractField(body, 'journal');
    const url = extractField(body, 'url');
    const abstract = extractField(body, 'abstract');
    const note = extractField(body, 'note');

    papers.push({
      key,
      type,
      title,
      authors: parseAuthors(authorStr),
      venue,
      year,
      url: url || undefined,
      abstract: abstract || undefined,
      note: note || undefined,
    });
  }

  // Sort by year descending
  return papers.sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

/**
 * Highlight the target author name in an author list
 * Returns array of {name, isHighlighted} objects
 */
export function highlightAuthor(
  authors: string[],
  targetName: string
): Array<{ name: string; isHighlighted: boolean }> {
  const normalizedTarget = targetName.toLowerCase();
  return authors.map(author => ({
    name: author,
    isHighlighted: author.toLowerCase().includes(normalizedTarget),
  }));
}
