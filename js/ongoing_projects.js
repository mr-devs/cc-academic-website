/** Renders data/ongoing_projects.json (array of ongoing projects). */
Site.load("./data/ongoing_projects.json", "projects-container", (container, projects) => {
  projects.forEach(({ title, description }) => {
    const item = Site.el("div", "item");
    item.appendChild(Site.el("p", "item-title", title));
    if (description) {
      item.appendChild(Site.el("p", "item-description", description));
    }
    container.appendChild(item);
  });
});
