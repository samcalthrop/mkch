import { addEdge, applyEdgeChanges, applyNodeChanges, Background, MiniMap, ReactFlow, ReactFlowProvider, useNodes } from "@xyflow/react"
import { useCallback, useEffect, useRef, useState } from "react";
import classes from './MarkovView.module.css';
import '@xyflow/react/dist/style.css';
// import { Node } from '../../types';

// const initialNodes: Array<Node> = [
//   { id: 1, label: 'Node 1', position: { x: 0, y: 0 }, nodes_in: [], nodes_out: [] },
//   { id: 2, label: 'Node 2', position: { x: 0, y: 100 }, nodes_in: [], nodes_out: [] },
// ];

const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

export const MarkovView = (): JSX.Element => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  // const path = './newFlow';

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background size={1} color="rgba(100, 100, 100, 1)" className={classes.background}/>
        <MiniMap nodeStrokeWidth={3} bgColor='transparent' maskColor="rgba(30, 30, 34, 1)" pannable zoomable/>
        <TechnicalInfo />
      </ReactFlow>
    </ReactFlowProvider>
  )
}

const TechnicalInfo = () => {
  // This hook will only work if the component it's used in is a child of a
  // <ReactFlowProvider />.
  const nodes = useNodes()
  const fps = useFPS();

  return (
    <aside className={classes.techInfo}>
      <div className="font-bold">Performance</div>
      <div className="">fps: {fps}</div>

      <div className="font-bold">Node Data</div>
      {nodes.map((node) => (
        <div key={node.id} className={classes.infoText}>
          node {node.id}:
            x={node.position.x.toFixed(2)},
            y={node.position.y.toFixed(2)}
        </div>
      ))}
    </aside>
  )
}

export const useFPS = (interval = 500): number => {
  const [fps, setFps] = useState(0);
  const frames = useRef(0);

  useEffect(() => {
    let rafId: number;
    let lastInterval = performance.now();

    const tick = () => {
      frames.current += 1;
      const now = performance.now();

      if (now - lastInterval >= interval) {
        const fpsCalc = (frames.current * 1000) / (now - lastInterval);
        setFps(Math.round(fpsCalc));
        frames.current = 0;
        lastInterval = now;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [interval]);

  return fps;
}
