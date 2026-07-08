/** Renders data/working_papers.json (array of preprints, newest first). */
Site.load("./data/working_papers.json", "working-papers-container", (container, papers) => {
  papers.forEach((paper) => container.appendChild(Site.paperCard(paper)));
});
