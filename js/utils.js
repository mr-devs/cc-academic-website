/**
 * Shared helpers for the JSON-driven sections.
 *
 * Every section module follows the same pattern:
 *   Site.load("data/foo.json", "container-id", renderFn)
 * The section stays hidden unless its JSON file loads and contains data,
 * so removing/emptying a data file cleanly removes the section.
 */
const Site = {
  /**
   * Fetch a JSON data file. Returns null (instead of throwing) when the
   * file is missing or malformed so a broken file hides its section
   * rather than breaking the page. Errors are logged to the console.
   */
  async fetchJSON(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`Failed to load ${path}:`, err);
      return null;
    }
  },

  /**
   * Load a data file and render it into a container. Reveals the parent
   * <section> only when there is data to show.
   */
  async load(dataPath, containerId, render) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = await this.fetchJSON(dataPath);
    const isEmpty =
      data == null ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === "object" && Object.keys(data).length === 0);
    if (isEmpty) return;

    render(container, data);
    const section = container.closest("section");
    if (section) section.hidden = false;
  },

  /** Create an element with a class and optional text content. */
  el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  },

  /**
   * Render one paper card (shared by publications and working papers).
   * Fields used: title, url, authors, publication, year, pdfPath, bibPath.
   */
  paperCard(paper) {
    const card = this.el("article", "paper");

    const title = this.el("p", "paper-title");
    if (paper.url) title.appendChild(this.link(paper.url, paper.title));
    else title.textContent = paper.title;
    card.appendChild(title);

    if (paper.authors) {
      card.appendChild(this.el("p", "paper-authors", paper.authors));
    }

    const venue = [paper.publication, paper.year].filter(Boolean).join(", ");
    if (venue) card.appendChild(this.el("p", "paper-venue", venue));

    const links = this.el("p", "paper-links");
    if (paper.pdfPath) links.appendChild(this.link(paper.pdfPath, "PDF"));
    if (paper.bibPath) links.appendChild(this.link(paper.bibPath, "BibTeX"));
    if (links.childNodes.length) card.appendChild(links);

    return card;
  },

  /** Create an external link (opens in a new tab). */
  link(href, text) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  },
};

// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll(".nav-links a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
});
