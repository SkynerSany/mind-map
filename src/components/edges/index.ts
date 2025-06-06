import type { Edge, EdgeTypes } from '@xyflow/react';
import CustomEdge from "./customEdge.tsx";

export const initialEdges: Edge[] = [

];

export const edgeTypes = {
    'custom-edge': CustomEdge,
} satisfies EdgeTypes;
