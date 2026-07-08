/** Renders data/news.json (array of year groups, newest first). */
Site.load("./data/news.json", "news-container", (container, years) => {
  years.forEach(({ year, items }) => {
    if (!items || !items.length) return;
    const group = Site.el("div", "news-year");
    group.appendChild(Site.el("h3", null, year));

    const list = Site.el("ul", "news-list");
    items.forEach(({ type, htmltext }) => {
      const li = document.createElement("li");
      if (type) li.appendChild(Site.el("span", "news-type", type));
      const span = document.createElement("span");
      // htmltext is trusted site-owner content from data/news.json
      span.innerHTML = htmltext;
      span
        .querySelectorAll("a")
        .forEach((a) => a.setAttribute("rel", "noopener"));
      li.appendChild(span);
      list.appendChild(li);
    });

    group.appendChild(list);
    container.appendChild(group);
  });
});
