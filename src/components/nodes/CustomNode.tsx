import {Handle, Position, NodeResizer, NodeToolbar, useReactFlow} from '@xyflow/react';

import {useCallback, useState} from "react";
import {Button} from "react-bootstrap";

export function CustomNode({ data, selected, id }) {
  const { setNodes, setEdges, getNodes } = useReactFlow();
  const [text, setText] = useState(data.value || "");

  const onChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onDeleteNode = () => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  const copySelectedNode = () => {
    const nodes = getNodes();
    const selected = nodes.find((node) => node.selected);
    if (!selected) return;

    const newNode = {
      ...selected,
      id: crypto.randomUUID(),
      position: {
        x: selected.position.x + 40,
        y: selected.position.y + 40,
      },
      selected: false,
      data: {
        value: text,
        form: data.form
      }
    };

    setNodes([...nodes, newNode]);
  };

  return (
    <>
      <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition} className="d-flex gap-3">
        <Button variant={"danger"} onClick={onDeleteNode}>Delete</Button>
        <Button variant={"success"} onClick={copySelectedNode}>Copy</Button>
      </NodeToolbar>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <input id="text" name="text" onChange={onChange} value={text} className={`resize-node node-${data.form}`} />
      <Handle type="target" position={Position.Top} id="t-top" />
      <Handle type="source" position={Position.Top} id="s-top" />

      <Handle type="target" position={Position.Right} id="t-right" />
      <Handle type="source" position={Position.Right} id="s-right" />

      <Handle type="target" position={Position.Bottom} id="t-bottom" />
      <Handle type="source" position={Position.Bottom} id="s-bottom" />

      <Handle type="target" position={Position.Left} id="t-left" />
      <Handle type="source" position={Position.Left} id="s-left" />
    </>
  );
}
