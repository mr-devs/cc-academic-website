/** Renders data/publications.json (array of published papers, newest first). */
Site.load("./data/publications.json", "publications-container", (container, papers) => {
  papers.forEach((paper) => container.appendChild(Site.paperCard(paper)));
});
