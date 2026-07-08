/** Renders data/teaching.json (array of courses, newest first). */
Site.load("./data/teaching.json", "teaching-container", (container, courses) => {
  courses.forEach(({ title, role, institution, term, description }) => {
    const item = Site.el("div", "item");
    item.appendChild(Site.el("p", "item-title", title));

    const meta = [role, institution, term].filter(Boolean).join(" — ");
    if (meta) item.appendChild(Site.el("p", "item-meta", meta));

    if (description) {
      item.appendChild(Site.el("p", "item-description", description));
    }
    container.appendChild(item);
  });
});
