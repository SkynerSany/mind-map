import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';
import {Button} from "react-bootstrap";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, selected }) {
  const { setEdges } = useReactFlow();
  getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const labelX = (sourceX + targetX) / 2;
  const labelY = (sourceY + targetY) / 2;

  const centerY = (targetY - sourceY) / 2 + sourceY;
  const edgePath = `M ${sourceX} ${sourceY} L ${sourceX} ${centerY} L ${targetX} ${centerY} L ${targetX} ${targetY}`;

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        {
          selected &&
            <Button
                variant={"danger"}
                size={"sm"}
                style={{
                  position: 'absolute',
                  transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                  pointerEvents: 'all',
                }}
                onClick={() => {
                  setEdges((es) => es.filter((e) => e.id !== id));
                }}
            >
                Delete
            </Button>
        }
      </EdgeLabelRenderer>
    </>
  );
}