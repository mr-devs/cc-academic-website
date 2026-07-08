/** Renders data/talks.json (array of talks, newest first). */
Site.load("./data/talks.json", "talks-container", (container, talks) => {
  talks.forEach(({ title, location, date, link }) => {
    const item = Site.el("div", "item");
    const heading = Site.el("p", "item-title");
    if (link) heading.appendChild(Site.link(link, title));
    else heading.textContent = title;
    item.appendChild(heading);

    const meta = [location, date].filter(Boolean).join(" — ");
    if (meta) item.appendChild(Site.el("p", "item-meta", meta));
    container.appendChild(item);
  });
});
