export default function loadMap(file, setNodes, setEdges) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      if (json.nodes && json.edges) {
        setNodes(json.nodes);
        setEdges(json.edges);
      } else {
        alert('Некорректный файл');
      }
    } catch (err) {
      alert('Ошибка чтения файла');
    }
  };
  reader.readAsText(file);
}