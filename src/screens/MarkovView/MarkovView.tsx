import classes from "./MarkovView.module.css";
import { Node, Arc, Coord2D } from "../../types";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// const initialNodes: Map<string, Node> = new Map<string, Node>();
const initialNodes: Node[] = [];
const n1: Node = { id: "n1", label: "n1", position: { x: 10, y: 10 }, nodes_in: [], nodes_out: [], radius: 15 }
const n2: Node = { id: "n2", label: "n2", position: { x: 100, y: 100 }, nodes_in: [], nodes_out: [], radius: 15 }
n1.nodes_out.push(n2);
n2.nodes_in.push(n1);
initialNodes.push(n1);
initialNodes.push(n2);
const arc1: Arc = { toID: "n2", fromID: "n1", weight: 0 };
const initialArcs: Arc[] = [arc1];

export const MarkovView = (): JSX.Element => {
  const navigate = useNavigate();

  // eovneinvererpivmnwe;fmnvwevwemrosibfnvwe
  const nodeRadius = 15;
  const titleOpacity = .6;
  // eorivlnrieognvwiertnb;jvnekrjvnoernveref
  // const {
  //   counter,
  //   selectedFile,
  //   setSelectedFile,
  //   nodeRadius,
  //   setNodeRadius,
  //   titleOpacity,
  // } = useSharedData();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameId = useRef<number>();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [mode, setMode] = useState('view');
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [draggingArc, setDraggingArc] = useState<{
    fromID: string;
    toPos: Coord2D;
  } | null>(null);
  const [prevMousePos, setPrevMousePos] = useState<Coord2D | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // add node to initialNodes
  const addNode = (node: Node) => {
    initialNodes.push(node);
  };

  // return node using ID
  const getNode = (nodeId: string): Node => {
    initialNodes.forEach((node) => {
      if (node.id === nodeId) return node
    });
    return {
      id: "unknown",
      label: "unknown",
      position: { x: 0, y: 0 },
      nodes_in: [],
      nodes_out: [],
      radius: 15,
    }
  };

  // return nodes connected by arc
  const getArcNodes = (arc: string): Array<Node> => {
    let nodeIdArray: Array<Node> = [];
    let strIdArray: Array<string> = arc.split("-");
    strIdArray.forEach((nodeID: string) => nodeIdArray.push(getNode(nodeID)));
    return nodeIdArray;
  };

  // iefoknvioernvioenrvienrvinerv

  /* check if given position is valid (not overlapping with other nodes),
   memoising to optimise expensive calculations */
  const isValidPosition = useCallback(
    (x: number, y: number, existingNodes: Node[]): boolean => {
      const minDistance = 2 * (nodeRadius || 15);
      return !existingNodes.some(
        /* performing pythagoras to check if the distance between the two nodes is less than
       the minimum distance */
        (node) => Math.sqrt(Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2)) < minDistance
      );
    },
    [nodeRadius]
  );

  // generate random position within canvas
  const getRandomPosition = (existingNodes: Node[], attempts = 1000): Coord2D => {
    const padding = 50; // padding from canvas edges
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    for (let i = 0; i < attempts; i++) {
      const x = padding + Math.random() * (canvas.width - 2 * padding);
      const y = padding + Math.random() * (canvas.height - 2 * padding);
      if (isValidPosition(x, y, existingNodes)) {
        return { x, y };
      }
    }
    // if no valid position found after attempts, return a random position
    return { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
  };

  // const debounce = (callback: () => void, delay: number = 5000): void => {
  //   if (debounceTimerRef.current) {
  //     clearTimeout(debounceTimerRef.current);
  //   }
  //   debounceTimerRef.current = setTimeout(callback, delay);
  // };
  //
  // useEffect(() => {
  //   debounce(() => {
  //     if (boids) {
  //       setIsIdle(true);
  //     }
  //   });
  // }, []);

  // canvas drawing function
  const draw = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    // retrieving network styling from css file
    const computedStyle = getComputedStyle(document.documentElement);
    const nodeColour: string = computedStyle.getPropertyValue('--node-colour') || '#2E2B33';
    const nodeTextColour: string =
      computedStyle.getPropertyValue('--node-text-colour') || '#FED5FB';
    const connectionColour: string =
      computedStyle.getPropertyValue('--node-connection-colour') || '#4A4850';
    const selectedColour: string =
      computedStyle.getPropertyValue('--node-selected-colour') || '#61497C';
    const connectionWidth: number =
      parseInt(computedStyle.getPropertyValue('--node-connection-width')) || 2;
    const fontFamily: string = computedStyle.getPropertyValue('--node-font') || 'Fira Code';
    const textSize: string = computedStyle.getPropertyValue('--node-text-size') || '12px';

    // batch similar operations
    ctx.strokeStyle = connectionColour;
    ctx.lineWidth = connectionWidth;

    // draw connections
    ctx.beginPath();
    initialArcs.forEach((arc) => {
      const fromNode = initialNodes.find((node) => node.id === arc.fromID);
      const toNode = initialNodes.find((node) => node.id === arc.toID);
      if (fromNode && toNode) {
        ctx.moveTo(fromNode.position.x, fromNode.position.y);
        ctx.lineTo(toNode.position.x, toNode.position.y);
      }
    });
    ctx.stroke();

    // batch text rendering
    ctx.fillStyle = nodeTextColour;
    ctx.font = `${textSize} ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.globalAlpha = titleOpacity || 0.38;
    initialNodes.forEach((node) => {
      ctx.fillText(node.label ?? "untitled", node.position.x, node.position.y + 30);
    });
    ctx.globalAlpha = 1;

    // batch node drawing
    ctx.fillStyle = nodeColour;
    ctx.beginPath();
    initialNodes.forEach((node) => {
      ctx.moveTo(node.position.x + (nodeRadius || 15), node.position.y);
      ctx.arc(node.position.x, node.position.y, nodeRadius || 15, 0, Math.PI * 2);
    });
    ctx.fill();

    // // drawing selected node
    // ctx.fillStyle = selectedColour;
    // ctx.beginPath();
    // nodes.forEach((node) => {
    //   if (node.label == selectedFile) {
    //     ctx.moveTo(node.position.x + (nodeRadius || 15), node.position.y);
    //     ctx.arc(node.position.x, node.position.y, nodeRadius || 15, 0, Math.PI * 2);
    //     ctx.fill();
    //   }
    // });

    // in the case that edit mode is on, these features are drawn
    if (mode == 'run') {
      // what the chain looks like when the program is running
    }
  }, [
    nodes,
    arcs,
    draggingArc,
    nodeRadius,
    mode,
    titleOpacity,
    // counter,
    // selectedFile,
  ]);

  // check if user has clicked a connection
  const isClickOnArc = (x: number, y: number, arc: Arc): boolean => {
    // this function should only work if user is in edit mode
    if (mode !== 'edit') return false;

    const fromNode = initialNodes.find((n) => n.id === arc.fromID);
    const toNode = initialNodes.find((n) => n.id === arc.toID);
    if (!fromNode || !toNode) return false;

    const nodeA = { x: fromNode.position.x, y: fromNode.position.y };
    const nodeB = { x: toNode.position.x, y: toNode.position.y };
    const click = { x, y };

    // calculate distance from point to line segment
    const lengthAB = Math.sqrt(Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2));
    // perpendicular distance from point to line AB, using vector cross product
    const perpDistance =
      Math.abs(
        (nodeB.y - nodeA.y) * click.x -
        (nodeB.x - nodeA.x) * click.y +
        nodeB.x * nodeA.y -
        nodeB.y * nodeA.x
      ) / lengthAB;

    // calculate angle between line AB and the horizontal
    const theta = Math.atan((nodeB.y - nodeA.y) / (nodeB.x - nodeA.x));
    console.log('angle: ', theta * (180 / Math.PI));

    return (
      perpDistance < 10 && // within 10px of the line
      x >= Math.min(nodeA.x, nodeB.x) + (nodeRadius || 15) * Math.cos(theta) && // click is within line segment, the node's radius
      x <= Math.max(nodeA.x, nodeB.x) - (nodeRadius || 15) * Math.cos(theta) &&
      y >= Math.min(nodeA.y, nodeB.y) - (nodeRadius || 15) * Math.sin(theta) &&
      y <= Math.max(nodeA.y, nodeB.y) + (nodeRadius || 15) * Math.sin(theta)
    );
  };

  const handleMousePosition = (clientX: number, clientY: number): Coord2D => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    const scaleX = rect.width / canvasRef.current!.width;
    const scaleY = rect.height / canvasRef.current!.height;

    return {
      x: (clientX - rect.left) / scaleX,
      y: (clientY - rect.top) / scaleY,
    };
  };

  // mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    // mouse position relative to the canvas
    const { x, y } = handleMousePosition(e.clientX, e.clientY);

    const leftClick: number = 0;
    // const scrollClick: number = 1;
    const rightClick: number = 2;

    // check if clicking on a connection (to remove it)
    if (mode == 'edit') {
      const clickedArc = arcs.find((arc) =>
        isClickOnArc(x, y, arc)
      );

      // remove connection if clicked
      if (clickedArc) {
        setArcs((prev) =>
          prev.filter(
            (arc) =>
              arc.fromID !== clickedArc.fromID || arc.toID !== clickedArc.toID
          )
        );
        // prevents any other mouse handling, graphically removing connection immediately
        return;
      }
    }

    // check if clicking on a node
    const clickedNode = nodes.find(
      (node) => Math.sqrt(Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2)) < (nodeRadius || 15)
    );

    if (clickedNode && mode == 'edit') {
      // start dragging a connection
      if (e.button == rightClick) {
        setDraggingArc({
          fromID: clickedNode.id,
          toPos: { x, y },
        });
      } else if (e.button == leftClick) {
        // start dragging a node
        setDraggedNode(clickedNode.id);
      }
    }
  };

  // throttling mouse move handler
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): void => {
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(() => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;

          const { x, y } = handleMousePosition(e.clientX, e.clientY);
          setPrevMousePos({ x, y });
          // update canvas to draw the node in its new position, and assign it a new position internally
          if (draggedNode) {
            setNodes((prev) =>
              prev.map((node) => (node.id === draggedNode ? { ...node, x, y } : node))
            );
          }

          // update canvas to draw the dragging connection by mouse, and assign it a new position internally
          if (draggingArc) {
            setDraggingArc((prev) => (prev ? { ...prev, toPos: { x, y } } : null));
          }

          animationFrameId.current = undefined;
        });
      }
    },
    // function is only called when a node or connection is being dragged
    [draggedNode, draggingArc, nodes, nodeRadius || 15, draw]
  );

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const { x, y } = handleMousePosition(e.clientX, e.clientY);

    if (draggingArc) {
      // check if mouse unclicked within a node's radius
      const targetNode = nodes.find(
        (node) => Math.sqrt(Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2)) < (nodeRadius || 15)
      );

      if (targetNode && targetNode.id !== draggingArc.fromID) {
        setArcs((prev) => [
          // extends the previous connections array to include the new connection
          ...prev,
          {
            fromID: draggingArc.fromID,
            toID: targetNode.id,
            weight: 0,
          },
        ]);
      }
      setDraggingArc(null);
    }
    setPrevMousePos(null);
    setDraggedNode(null);

    // // code within this statement will only be run if mouseUp has not occurred for the time determined in the `debounce` function (when idle)
    // debounce(() => {
    //   if (boids) {
    //     setIsIdle(true);
    //   }
    // });
  };

  const handleMouseLeave = useCallback(() => {
    setDraggedNode(null);
  }, []);

  // initialize canvas context once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext('2d');
    const ctx = contextRef.current;
    if (!ctx) return;

    const resizeCanvas = (): void => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      // immediately redraw after resize
      draw();
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return (): void => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // clean up the timer when component unmounts
  useEffect(() => {
    return (): void => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // separate render loop effect
  useEffect(() => {
    let frameId: number;
    const animate = (): void => {
      const updatedNodes = [...nodes];
      // check if any nodes actually moved before updating state
      const hasChanges = updatedNodes.some(
        (node, i) => node.position.x !== nodes[i].position.x || node.position.y !== nodes[i].position.y
      );

      if (hasChanges) {
        setNodes(updatedNodes);
      }
      draw();
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return (): void => cancelAnimationFrame(frameId);
  }, [draggedNode, prevMousePos, draw, nodes]);

  return (
    <div className={classes.chainArea}>
      {/*<PhysicsControls {...physicsParams} onUpdate={handlePhysicsUpdate} />
        <div className={classes.viewEditToggle}>
          <SegmentedControl
            className={classes.segmentedControl}
            classNames={{
              indicator: classes.segmentedControlIndicator,
            }}
            value={mode}
            onChange={setMode}
            data={[
              {
                value: 'view',
                label: (
                  <Center className={classes.viewToggled} style={{ gap: 10 }}>
                    <IconEye className={classes.eyeIcon} />
                  </Center>
                ),
              },
              {
                value: 'edit',
                label: (
                  <Center className={classes.editToggled} style={{ gap: 10 }}>
                    <IconPencil className={classes.pencilIcon} />
                  </Center>
                ),
              },
            ]}
            radius="lg"
          />
        </div>*/}
      <canvas
        className={classes.chainCanvas}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};


//  mefovmeinvioenrmvineroivnmer

// const NewNodeButton = (): JSX.Element => {
//   return (
//     <Button variant="outline" size="sm">
//       click me
//     </Button>
//   );
// };
