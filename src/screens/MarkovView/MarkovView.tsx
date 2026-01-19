import classes from "./MarkovView.module.css";
import { Node, Arc, Coord2D } from "../../types";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";

// TODO:
// turn nodes array into a set for faster lookup of id

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
  const nodeWidth = 40;
  const nodeHeight = 30;
  const nodeHitboxRadius = Math.sqrt(Math.pow(nodeWidth / 2, 2) + Math.pow(nodeHeight / 2, 2));
  // const {
  //   counter,
  //   selectedFile,
  //   setSelectedFile,
  //   nodeWidth,
  //   setNodeRadius,
  //   titleOpacity,
  // } = useSharedData();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameId = useRef<number>();
  const [nodes, setNodes] = useState<Node[]>([...initialNodes]);
  const nodesRef = useRef<Node[]>([...initialNodes]);
  const [arcs, setArcs] = useState<Arc[]>([...initialArcs]);
  const [mode, setMode] = useState('edit');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const draggedNodeRef = useRef<string | null>(null);
  const [draggingArc, setDraggingArc] = useState<{
    fromID: string;
    toPos: Coord2D;
  } | null>(null);
  const draggingArcRef = useRef<{
    fromID: string;
    toPos: Coord2D;
  } | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // add node to nodes
  const addNode = (node: Node) => {
    setNodes((prev) => {
      const newNodes = [
        ...prev,
        { id: node.id, label: node.label, position: node.position, nodes_in: node.nodes_in, nodes_out: node.nodes_out, radius: node.radius }
      ];
      nodesRef.current = newNodes;
      return newNodes;
    });
  };

  const addArc = (arc: Arc) => {
    setArcs((prev) => [
      ...prev,
      {
        fromID: arc.fromID,
        toID: arc.toID,
        weight: arc.weight,
      },
    ]);
  }

  // return node using ID
  const getNodeByID = (nodeId: string): Node => {
    nodes.forEach((node) => {
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
    strIdArray.forEach((nodeID: string) => nodeIdArray.push(getNodeByID(nodeID)));
    return nodeIdArray;
  };

  /* check if given position is valid (not overlapping with other nodes),
   memoising to optimise expensive calculations */
  const isValidPosition = useCallback(
    (x: number, y: number, existingNodes: Node[]): boolean => {
      const minDistance = 2 * (nodeWidth || 15);
      return !existingNodes.some(
        /* performing pythagoras to check if the distance between the two nodes is less than
       the minimum distance */
        (node) => Math.sqrt(Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2)) < minDistance
      );
    },
    [nodeWidth]
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

  const createID = (length: number = 20): string => {
    var id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    do {
      for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    } while (!(getNodeByID(id).id == "unknown"))
    return id;
  }

  const onNewNodeClicked = () => {
    const uid = createID();
    addNode({ id: uid, label: "untitled node", position: getRandomPosition(nodes), nodes_in: [], nodes_out: [], radius: 15 });
  };

  const NewNodeButton = (): JSX.Element => {
    return (
      <Button variant="outline" size="sm" onClick={onNewNodeClicked}>
        click me
      </Button>
    );
  };

  // canvas drawing function
  const draw = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    // retrieving network styling from css file
    const computedStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
    const nodeColour: string = computedStyle.getPropertyValue('--node-colour') || '#2E2B33';
    const nodeTextColour: string =
      computedStyle.getPropertyValue('--node-text-colour') || '#FED5FB';
    const arcColour: string =
      computedStyle.getPropertyValue('--arc-colour') || '#4A4850';
    const selectedColour: string =
      computedStyle.getPropertyValue('--node-selected-colour') || '#61497C';
    const connectionWidth: number =
      parseInt(computedStyle.getPropertyValue('--node-connection-width')) || 2;
    const fontFamily: string = computedStyle.getPropertyValue('--node-font') || 'Fira Code';
    const textSize: string = computedStyle.getPropertyValue('--node-text-size') || '12px';
    const arrowRadius: number = Number(computedStyle.getPropertyValue('--arrow-radius')) || 15;
    const nodeBorderRadius: number = Number(computedStyle.getPropertyValue('--node-border-radius')) || 10;
    const titleOpacity: number = Number(computedStyle.getPropertyValue('--title-opacity')) || .6;

    // batch similar operations
    ctx.strokeStyle = arcColour;
    ctx.lineWidth = connectionWidth;

    // draw connections
    ctx.beginPath();
    arcs.forEach((arc) => {
      const fromNode = nodes.find((node) => node.id === arc.fromID);
      const toNode = nodes.find((node) => node.id === arc.toID);
      if (fromNode && toNode) {
        ctx.moveTo(fromNode.position.x, fromNode.position.y);
        ctx.lineTo(toNode.position.x, toNode.position.y);
        // draw arrows
        let gamma = Math.atan((toNode.position.y - fromNode.position.y) / (toNode.position.x - fromNode.position.x));
        let theta = 0;
        let alpha = 0;
        if (fromNode.position.x > toNode.position.x || (fromNode.position.y > toNode.position.y && fromNode.position.x > toNode.position.x)) gamma += Math.PI;
        theta = 2 * Math.PI - gamma;
        alpha = 5 * Math.PI / 4 - theta;
        // '+ 5 * Math.cos(gamma)' etc shifts the arrows slightly such that their centre aligns with the centre of the arcs, instead of the tip aligning
        ctx.moveTo((fromNode.position.x + toNode.position.x) / 2 + 5 * Math.cos(gamma), (fromNode.position.y + toNode.position.y) / 2 + 5 * Math.sin(gamma));
        ctx.lineTo(((fromNode.position.x + toNode.position.x) / 2 + 5 * Math.cos(gamma)) + arrowRadius * Math.cos(alpha), ((fromNode.position.y + toNode.position.y) / 2 + 5 * Math.sin(gamma)) + arrowRadius * Math.sin(alpha));
        ctx.moveTo((fromNode.position.x + toNode.position.x) / 2 + 5 * Math.cos(gamma), (fromNode.position.y + toNode.position.y) / 2 + 5 * Math.sin(gamma));
        ctx.lineTo(((fromNode.position.x + toNode.position.x) / 2 + 5 * Math.cos(gamma)) + arrowRadius * Math.sin(alpha), ((fromNode.position.y + toNode.position.y) / 2 + 5 * Math.sin(gamma)) - arrowRadius * Math.cos(alpha));
      }
    });
    ctx.stroke();

    // batch text rendering
    ctx.fillStyle = nodeTextColour;
    ctx.font = `${textSize} ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.globalAlpha = titleOpacity;
    nodes.forEach((node) => {
      ctx.fillText(node.label ?? "untitled", node.position.x, node.position.y + 30);
    });
    ctx.globalAlpha = 1;

    // batch node drawing
    ctx.fillStyle = nodeColour;
    ctx.beginPath();
    nodes.forEach((node) => {
      // ctx.moveTo(node.position.x + (nodeHitboxRadius || 40), node.position.y);
      ctx.roundRect(node.position.x - (nodeWidth / 2), node.position.y - (nodeHeight / 2), nodeWidth, nodeHeight, nodeBorderRadius);
    });
    ctx.fill();

    // drawing selected node
    if (selectedNode) {
      ctx.fillStyle = selectedColour;
      ctx.beginPath();
      nodes.forEach((node) => {
        if (node.id === selectedNode.id) {
          ctx.roundRect(node.position.x - (nodeWidth / 2), node.position.y - (nodeHeight / 2), nodeWidth, nodeHeight, nodeBorderRadius);
          ctx.fill();
        }
      });
    }

    if (mode == 'edit') {
      // draw dragging connection
      if (draggingArc) {
        const fromNode = nodes.find((node) => node.id === draggingArc.fromID);
        if (fromNode) {
          ctx.beginPath();
          ctx.setLineDash([5, 5]);
          ctx.moveTo(fromNode.position.x, fromNode.position.y);
          ctx.lineTo(draggingArc.toPos.x, draggingArc.toPos.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    }

    // in the case that edit mode is on, these features are drawn
    if (mode == 'run') {
      // what the chain looks like when the program is running
    }
  }, [
    nodes,
    arcs,
    draggingArc,
    nodeWidth,
    mode,
    selectedNode,
    // counter,
    // selectedFile,
  ]);

  // check if user has clicked an arc
  const isClickOnArc = (x: number, y: number, arc: Arc): boolean => {
    // this function should only work if user is in edit mode
    if (mode !== 'edit') return false;

    const fromNode = nodes.find((n) => n.id === arc.fromID);
    const toNode = nodes.find((n) => n.id === arc.toID);
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

    const distFromA = Math.pow(nodeA.x - x, 2) + Math.pow(nodeA.y - y, 2);
    const distFromB = Math.pow(nodeB.x - x, 2) + Math.pow(nodeB.y - y, 2);

    return (
      perpDistance < 10 && // within 10px of the line
      x >= Math.min(nodeA.x, nodeB.x) + (nodeHitboxRadius || 15) * Math.cos(theta) && // click is within line segment, the node's radius
      x <= Math.max(nodeA.x, nodeB.x) - (nodeHitboxRadius || 15) * Math.cos(theta) &&
      y >= Math.min(nodeA.y, nodeB.y) - (nodeHitboxRadius || 15) * Math.sin(theta) &&
      y <= Math.max(nodeA.y, nodeB.y) + (nodeHitboxRadius || 15) * Math.sin(theta) &&
      distFromA > nodeHitboxRadius && distFromB > nodeHitboxRadius
    );
  };

  // check if user has clicked a node, returning the node if so
  const nodeClicked = (x: number, y: number, nodeArray: Array<Node>): Node | undefined => {
    return nodeArray.find(
      (node) => Math.sqrt(Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2)) < (nodeHitboxRadius ?? 15)
    );
  }

  // prevent context menu when right-clicking on a node
  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    // mouse position relative to the canvas
    const { x, y } = handleMousePosition(e.clientX, e.clientY);

    // check if clicking on a node
    const clickedNode = nodes.find(
      (node) => Math.sqrt(Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2)) < (nodeHitboxRadius ?? 15)
    );

    // if clicking on a node, prevent context menu
    if (clickedNode) {
      e.preventDefault();
    }
  };

  const handleMousePosition = useCallback((clientX: number, clientY: number): Coord2D => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    const scaleX = rect.width / canvasRef.current!.width;
    const scaleY = rect.height / canvasRef.current!.height;

    return {
      x: (clientX - rect.left) / scaleX,
      y: (clientY - rect.top) / scaleY,
    };
  }, []);

  // mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    e.preventDefault(); // prevent text selection
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    // mouse position relative to the canvas
    const { x, y } = handleMousePosition(e.clientX, e.clientY);

    const leftClick: number = 0;
    // const scrollClick: number = 1;
    const rightClick: number = 2;

    // check if clicking on a connection (to remove it)
    const clickedArc = arcs.find((arc) => {
      return isClickOnArc(x, y, arc);
    });

    // remove connection if clicked
    if (clickedArc) {
      console.log("arc clicked: ", clickedArc)
      setArcs((prev) =>
        prev.filter(
          (arc) =>
            arc.fromID !== clickedArc.fromID || arc.toID !== clickedArc.toID
        )
      );
      return;
    }

    // check if clicking on a node
    const clickedNode = nodeClicked(x, y, nodes);

    if (clickedNode) {
      setSelectedNode(clickedNode);
      if (mode == 'edit') {
        // start dragging a connection
        if (e.button == rightClick) {
          const newDraggingArc = {
            fromID: clickedNode.id,
            toPos: { x, y },
          };
          setDraggingArc(newDraggingArc);
          draggingArcRef.current = newDraggingArc;
        } else if (e.button == leftClick) {
          // start dragging a node
          console.log("dragging node: ", clickedNode);
          setDraggedNode(clickedNode.id);
          draggedNodeRef.current = clickedNode.id;
        }
      }
    }
  };

  // Global mouse move handler for dragging outside canvas
  // Store handler in ref so it can access latest values without recreating listeners
  const handleGlobalMouseMoveRef = useRef<(e: MouseEvent) => void>();

  useEffect(() => {
    handleGlobalMouseMoveRef.current = (e: MouseEvent): void => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      let { x, y } = handleMousePosition(e.clientX, e.clientY);
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Constrain node position to canvas bounds
      const minX = nodeWidth / 2;
      const maxX = canvas.width - nodeWidth / 2;
      const minY = nodeHeight / 2;
      const maxY = canvas.height - nodeHeight / 2;

      x = Math.max(minX, Math.min(maxX, x));
      y = Math.max(minY, Math.min(maxY, y));

      // update canvas to draw the node in its new position, and assign it a new position internally
      const currentDraggedNode = draggedNodeRef.current;
      if (currentDraggedNode) {
        setNodes((prev) => {
          const newNodes = prev.map((node) => (node.id === currentDraggedNode ? { ...node, position: { x, y } } : node));
          nodesRef.current = newNodes;
          return newNodes;
        });
      }

      // update canvas to draw the dragging connection by mouse, and assign it a new position internally
      const currentDraggingArc = draggingArcRef.current;
      if (currentDraggingArc) {
        // for dragging arcs, allow the mouse to go outside canvas
        setDraggingArc({ ...currentDraggingArc, toPos: { x, y } });
        draggingArcRef.current = { ...currentDraggingArc, toPos: { x, y } };
      }
    };
  }, [handleMousePosition, nodeWidth, nodeHeight]);

  const handleGlobalMouseMove = useCallback((e: MouseEvent): void => {
    // Process immediately without throttling to ensure smooth dragging
    if (handleGlobalMouseMoveRef.current) {
      handleGlobalMouseMoveRef.current(e);
    }
  }, []);

  // throttling mouse move handler
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): void => {
      handleGlobalMouseMove(e.nativeEvent);
    },
    [handleGlobalMouseMove]
  );

  // global mouse up handler for dragging outside canvas
  // store handler in ref so it can access latest values without recreating listeners
  const handleGlobalMouseUpRef = useRef<(e: MouseEvent) => void>();
  const selectedNodeRef = useRef<Node | null>(null);

  // keep selectedNodeRef in sync with selectedNode state
  useEffect(() => {
    selectedNodeRef.current = selectedNode;
  }, [selectedNode]);

  // keep nodesRef in sync with nodes state
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  // handle dragging arcs
  useEffect(() => {
    handleGlobalMouseUpRef.current = (e: MouseEvent): void => {
      const rect = canvasRef.current?.getBoundingClientRect();
      // if mouse is outside canvas, stop dragging
      if (!rect) {
        setDraggedNode(null);
        draggedNodeRef.current = null;
        setDraggingArc(null);
        draggingArcRef.current = null;
        return;
      }

      const { x, y } = handleMousePosition(e.clientX, e.clientY);

      if (selectedNodeRef.current) setSelectedNode(null);

      const currentDraggingArc = draggingArcRef.current;
      if (currentDraggingArc) {
        // check if mouse unclicked within a node's radius
        const targetNode = nodesRef.current.find(
          (node) => Math.sqrt(Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2)) < (nodeHitboxRadius ?? 40)
        );

        if (targetNode && targetNode.id !== currentDraggingArc.fromID) {
          addArc({
            fromID: currentDraggingArc.fromID,
            toID: targetNode.id,
            weight: 0,
          });
        }
        setDraggingArc(null);
        draggingArcRef.current = null;
      }
      setDraggedNode(null);
      draggedNodeRef.current = null;
    };
  }, [handleMousePosition, nodeHitboxRadius]);

  const handleGlobalMouseUp = useCallback((e: MouseEvent): void => {
    if (handleGlobalMouseUpRef.current) {
      handleGlobalMouseUpRef.current(e);
    }
  }, []);

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    handleGlobalMouseUp(e.nativeEvent);
  };

  // initialize canvas context once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext('2d');
    const ctx = contextRef.current;
    if (!ctx) return;

    const resizeCanvas = (): void => {
      // Get the display size (CSS pixels)
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      // Set the internal resolution to match the display size
      // This prevents stretching when the container resizes
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        // immediately redraw after resize
        draw();
      }
    };

    // Initial resize
    resizeCanvas();

    // Use ResizeObserver to watch for container size changes
    // This catches resizes from mosaic tiles, not just window resizes
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);

    // Also listen to window resize as a fallback
    window.addEventListener('resize', resizeCanvas);

    return (): void => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [draw]);

  // clean up the timer when component unmounts
  useEffect(() => {
    return (): void => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // add global mouse listeners when dragging
  // use stable wrapper functions that call the refs
  const stableMouseMove = useCallback((e: MouseEvent) => {
    if (handleGlobalMouseMoveRef.current) {
      handleGlobalMouseMoveRef.current(e);
    }
  }, []);

  const stableMouseUp = useCallback((e: MouseEvent) => {
    if (handleGlobalMouseUpRef.current) {
      handleGlobalMouseUpRef.current(e);
    }
  }, []);

  useEffect(() => {
    if (draggedNode || draggingArc) {
      window.addEventListener('mousemove', stableMouseMove, { passive: true });
      window.addEventListener('mouseup', stableMouseUp);

      return (): void => {
        window.removeEventListener('mousemove', stableMouseMove);
        window.removeEventListener('mouseup', stableMouseUp);
      };
    }
  }, [draggedNode, draggingArc, stableMouseMove, stableMouseUp]);

  // separate render loop effect
  useEffect(() => {
    let frameId: number;
    let isRunning = true;

    const animate = (): void => {
      if (!isRunning) return;
      draw();
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return (): void => {
      isRunning = false;
      cancelAnimationFrame(frameId);
    };
  }, [draw]);

  return (
    <div className={classes.chainArea}>
      <canvas
        className={classes.chainCanvas}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
      />
      <div className={classes.toolbarOverlay}>
        <div className={classes.toolbarItem}>
          <NewNodeButton />
        </div>
      </div>
    </div>
  );
};
