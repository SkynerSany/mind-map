import type { Node, BuiltInNode } from '@xyflow/react';

export type CustomNode = Node<{ label: string }, 'customNode'>;
export type AppNode = BuiltInNode | CustomNode;
