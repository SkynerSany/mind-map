import {useCallback, useEffect, useState} from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect, Panel, useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { nodeTypes } from './components/nodes';
import { edgeTypes } from './components/edges';
import { Button, ButtonGroup } from "react-bootstrap";
import saveMap from "./scripts/saveMap.ts";
import loadMap from "./scripts/loadMap.ts";
import CreateNodePanel from "./components/createNodePanel";
import {loadFromLocalStorage, saveInLocalStorage} from "./scripts/editLocalStorage.ts";

export default function App() {
  const [nodes, , onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setNodes, getNodes, getEdges } = useReactFlow();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [modal, setModal] = useState(false);

  const defaultEdgeOptions = { animated: false };
  const onConnect: OnConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  useEffect(() => {
    loadFromLocalStorage(setNodes, setEdges);
    setHasLoaded(true);
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (!hasLoaded) return;
    saveInLocalStorage(nodes, edges)
  }, [nodes, edges]);

  function handleSave() {
    saveMap(getNodes, getEdges)
  }

  function handleLoad(event) {
    loadMap(event.target.files[0], setNodes, setEdges)
  }

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the map?')) {
      setNodes([]);
      setEdges([]);
      localStorage.removeItem('mindmap-flow-data'); // 💾 очищаем localStorage
    }
  };

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Panel position="top-right" className="d-flex gap-3">
        <ButtonGroup>
          <Button variant="primary" onClick={handleSave}>Save</Button>
          <Button>
            <label>
              Load
              <input
                type="file"
                accept=".json"
                onChange={handleLoad}
                className="d-none"
              />
            </label>
          </Button>
        </ButtonGroup>
        <Button variant={"danger"} onClick={handleClear}>Delete map</Button>
      </Panel>
      <Panel position="top-left" className="d-flex gap-3">
        <CreateNodePanel />
      </Panel>
      <Background/>
      <MiniMap/>
      <Controls/>
    </ReactFlow>
  );
}
