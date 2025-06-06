export default function saveMap(getNodes, getEdges) {
  const nodes = getNodes();
  const edges = getEdges();
  const data = JSON.stringify({ nodes, edges }, null, 2);

  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'mindmap.json';
  a.click();
  URL.revokeObjectURL(url);
};