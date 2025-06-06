import {initialNodes} from "../components/nodes";
import {initialEdges} from "../components/edges";

const STORAGE_KEY = 'mindmap-flow-data';

export function loadFromLocalStorage(setNodes, setEdges) {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(stored);
      if (savedNodes && savedEdges) {
        setNodes(savedNodes);
        setEdges(savedEdges);
      }
    } catch (err) {
      console.error('Ошибка загрузки из localStorage', err);
    }
  } else {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }
}

export function saveInLocalStorage(nodes, edges) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ nodes, edges })
  );
}