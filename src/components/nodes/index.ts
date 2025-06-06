import type { NodeTypes } from '@xyflow/react';

import { AppNode } from './types.ts';
import {CustomNode} from "./CustomNode.tsx";

export const initialNodes: AppNode[] = [
  { id: 'a', type: 'customNode', position: { x: 0, y: 0 }, data: { value: 'Get Started' } },
];

export const nodeTypes = {
  'customNode': CustomNode,
} satisfies NodeTypes;
