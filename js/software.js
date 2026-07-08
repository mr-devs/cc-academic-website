/** Renders data/software.json (array of software/tools). */
Site.load("./data/software.json", "software-container", (container, tools) => {
  tools.forEach(({ title, description, href }) => {
    const item = Site.el("div", "item");
    const heading = Site.el("p", "item-title");
    if (href) heading.appendChild(Site.link(href, title));
    else heading.textContent = title;
    item.appendChild(heading);

    if (description) {
      item.appendChild(Site.el("p", "item-description", description));
    }
    container.appendChild(item);
  });
});
