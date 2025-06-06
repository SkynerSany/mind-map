import {Button, FormControl, FormSelect} from "react-bootstrap";
import {useReactFlow} from "@xyflow/react";
import {useState} from "react";

export default function CreateNodePanel() {
  const { setNodes, getViewport } = useReactFlow();
  const [label, setLabel] = useState("");
  const [form, setForm] = useState('rectangle');

  function createNode() {
    const { x, y, zoom } = getViewport();

    const centerPosition = {
      x: (-x + window.innerWidth / 2) / zoom,
      y: (-y + window.innerHeight / 2) / zoom,
    };

    const newNode = {
      id: crypto.randomUUID(),
      type: 'customNode',
      position: centerPosition,
      data: {
        value: label,
        form: form
      },
    };

    setNodes((nodes) => [...nodes, newNode]);
    setLabel("");
  }

  return (
    <>
      <FormControl type={"text"} placeholder={"Write node"} value={label} onChange={(e) => setLabel(e.target.value)}/>
      <FormSelect value={form} onChange={(e) => setForm(e.target.value)}>
        <option value="rectangle">Rectangle</option>
        <option value="oval">Oval</option>
        <option value="circle">Circle</option>
      </FormSelect>
      <Button variant={"success"} onClick={createNode}>CreateNode</Button>
    </>
  );
}