
// TODO:
// turn nodes array into a set for faster lookup of id

import classes from "./MarkovView.module.css";
import { Arc, ArrowProps, Coord2D, DraggingArcProps, MarkovNode } from "../../types";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import AddIcon from "../../assets/plus.svg?react";
import { useSharedData } from "@/components/SharedDataProvider";

// const initialNodes: Map<string, Node> = new Map<string, Node>();
const initialNodes: Array<MarkovNode> = [];
const n1: MarkovNode = { id: "n1", label: "n1", position: { x: 10, y: 10 }, nodes_in: [], nodes_out: [], radius: 15 }
const n2: MarkovNode = { id: "n2", label: "n2", position: { x: 100, y: 100 }, nodes_in: [], nodes_out: [], radius: 15 }
n1.nodes_out.push(n2);
n2.nodes_in.push(n1);
initialNodes.push(n1);
initialNodes.push(n2);
const arc1: Arc = { toID: "n2", fromID: "n1", weight: 0 };
const initialArcs: Arc[] = [arc1];

export const findArc = (n1: MarkovNode, n2: MarkovNode, arcs: Array<Arc>) => {
  return arcs.find((arc) => {
    (arc.fromID === n1.id && arc.toID === n2.id);
  })
}

export const MarkovView = (): JSX.Element => {
  const NODE_WIDTH = 40;
  const NODE_HEIGHT = 30;
  const OUT_OF_SIGHT: Coord2D = { x: 2000, y: 2000 };
  const nodeHitboxRadius = Math.sqrt(Math.pow(NODE_WIDTH / 2, 2) + Math.pow(NODE_HEIGHT / 2, 2));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameId = useRef<number>();
  const nodesRef = useRef<Array<MarkovNode>>([...initialNodes]);
  const arcsRef = useRef<Array<Arc>>([...initialArcs]);
  const [mode, setMode] = useState('edit');
  const [selectedNode, setSelectedNode] = useState<MarkovNode | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const draggedNodeRef = useRef<string | null>(null);
  const mousePos = useRef<Coord2D | null>(null);
  const [draggingArc, setDraggingArc] = useState<DraggingArcProps | null>(null);
  const draggingArcRef = useRef<DraggingArcProps | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // global mouse up handler for dragging outside canvas
  // store handler in ref so it can access latest values without recreating listeners
  const handleGlobalMouseUpRef = useRef<(e: MouseEvent) => void>();
  const selectedNodeRef = useRef<MarkovNode | null>(null);

  const { currentNodes, setCurrentNodes, currentArcs, setCurrentArcs } = useSharedData();

  // add node to nodes
  const addNode = (node: MarkovNode) => {
    setCurrentNodes((prev) => {
      const safePrev = prev ?? [];
      const newNodes = [
        ...safePrev,
        { id: node.id, label: node.label, position: node.position, nodes_in: node.nodes_in, nodes_out: node.nodes_out, radius: node.radius }
      ];
      nodesRef.current = newNodes;
      return newNodes;
    });
  };

  const addArc = (arc: Arc) => {
    setCurrentArcs((prev) => {
      const safePrev = prev ?? [];
      const newArcs = [
        ...safePrev,
        {
          fromID: arc.fromID,
          fromLabel: arc.fromLabel,
          toID: arc.toID,
          toLabel: arc.toLabel,
          weight: arc.weight,
        },
      ];
      arcsRef.current = newArcs;
      return newArcs;
    });
  }

  // return node using ID
  const getNodeByID = (nodeId: string): MarkovNode => {
    const unknownNode: MarkovNode = {
      id: "unknown",
      label: "unknown",
      position: { x: 0, y: 0 },
      nodes_in: [],
      nodes_out: [],
      radius: 15,
    }
    const nodes = nodesRef.current;
    if (!nodes?.length) {
      return unknownNode;
    }
    return nodes.find(n => n.id === nodeId) ?? unknownNode;
  };

  // return nodes connected by arc
  const getArcNodes = (arc: string): Array<MarkovNode> => {
    let nodeIdArray: Array<MarkovNode> = [];
    let strIdArray: Array<string> = arc.split("-");
    strIdArray.forEach((nodeID: string) => nodeIdArray.push(getNodeByID(nodeID)));
    return nodeIdArray;
  };

  const nodeExistsAtPoint = (x: number, y: number, existingNodes: Array<MarkovNode>): boolean => {
    return !existingNodes.some(
      /* performing pythagoras to check if the distance between the two nodes is less than
     the minimum distance */
      (node) => Math.sqrt(Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2)) < NODE_WIDTH
    );
  };

  /* check if given position is valid (not overlapping with other nodes),
   memoising to optimise expensive calculations */
  const nodeCanSpawnAtPoint = useCallback(
    (x: number, y: number, existingNodes: Array<MarkovNode>): boolean => {
      const MIN_DISTANCE = 2 * (NODE_WIDTH || 15);
      return !existingNodes.some(
        /* performing pythagoras to check if the distance between the two nodes is less than
       the minimum distance */
        (node) => Math.sqrt(Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2)) < MIN_DISTANCE
      );
    },
    [NODE_WIDTH]
  );

  // const arcExistsAtPoint = useCallback(
  //   (x: number, y: number, existingArcs: Array<Arc>): boolean => {
  //     const minDistance = 2 * (NODE_WIDTH || 15);
  //     return !existingArcs.some(
  //       /* performing pythagoras to check if the distance between the two nodes is less than
  //      the minimum distance */
  //       (arc) => Math.sqrt(Math.pow(getNodeByID(arc.fromID).position.x - x, 2) + Math.pow(node.position.y - y, 2)) < minDistance
  //     );
  //   },
  //   [NODE_WIDTH]
  // );

  const isBidirectional = (arc: Arc): boolean => {
    let numArcs = 0;
    currentArcs?.forEach((currentArc) => {
      if ((currentArc.fromID == arc.fromID || currentArc.fromID == arc.toID) &&
        (currentArc.toID == arc.fromID || currentArc.toID == arc.toID) &&
        currentArc.fromID != currentArc.toID) numArcs++;
    });
    if (numArcs == 2) return true;
    return false;
  }

  // generate random position within canvas
  const getRandomPosition = (existingNodes: Array<MarkovNode>, attempts = 1000): Coord2D => {
    const padding = 50; // padding from canvas edges
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    for (let i = 0; i < attempts; i++) {
      const x = Math.floor(padding + Math.random() * (canvas.width - 2 * padding));
      const y = Math.floor(padding + Math.random() * (canvas.height - 2 * padding));
      if (nodeCanSpawnAtPoint(x, y, existingNodes)) {
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
    addNode({ id: uid, label: "untitled node", position: getRandomPosition(currentNodes ?? []), nodes_in: [], nodes_out: [], radius: 15 });
  };

  const NewNodeButton = (): JSX.Element => {
    return (
      <Button variant="ghost" size="sm" onClick={onNewNodeClicked}>
        <AddIcon
          width={40}
          height={40}
          strokeWidth={3}
          className={classes.icon}
        />
      </Button>
    );
  };

  // Drawing functions --------------------------------------------------------

  const drawArrow = (arrowProps: ArrowProps, ctx: CanvasRenderingContext2D) => {
    switch (arrowProps.key) {
      case "angular":
      case "direct":
        const { angle, arrowRadius, centringFactor, midpoint } = arrowProps;
        ctx.moveTo(midpoint.x + centringFactor.x, midpoint.y + centringFactor.y);
        ctx.lineTo((midpoint.x + centringFactor.x) + arrowRadius * Math.cos(angle), (midpoint.y + centringFactor.y) + arrowRadius * Math.sin(angle));
        ctx.moveTo(midpoint.x + centringFactor.x, midpoint.y + centringFactor.y);
        ctx.lineTo((midpoint.x + centringFactor.x) + arrowRadius * Math.sin(angle), (midpoint.y + centringFactor.y) - arrowRadius * Math.cos(angle));
        break;
      case "loop":
        const { ctxPos } = arrowProps;
        ctx.moveTo(ctxPos.x, ctxPos.y);
        ctx.lineTo(ctxPos.x + 10, ctxPos.y - 10);
        ctx.moveTo(ctxPos.x, ctxPos.y);
        ctx.lineTo(ctxPos.x + 10, ctxPos.y + 10);
        break;
    }
  };

  const drawDraggingArc = (ctx: CanvasRenderingContext2D, nodes: Array<MarkovNode>, draggingArc: DraggingArcProps) => {
    const ORIGINAL_FILL_STYLE = ctx.fillStyle;

    const fromNode = nodes.find((node) => node.id === draggingArc.fromID);
    if (fromNode) {
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(fromNode.position.x, fromNode.position.y);
      ctx.lineTo(draggingArc.toPos.x, draggingArc.toPos.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.fillStyle = ORIGINAL_FILL_STYLE;
  }

  const drawWeights = (ctx: CanvasRenderingContext2D, fromNode: MarkovNode, toNode: MarkovNode, arc: Arc, midpoint: Coord2D, textGap: number, invNormal: Coord2D, nodeTextColour: string) => {
    const ORIGINAL_FILL_STYLE = ctx.fillStyle;
    ctx.fillStyle = nodeTextColour;
    if (fromNode.id != toNode.id) {
      if (isBidirectional(arc)) {
        ctx.fillText(arc.weight.toString(), (midpoint.x + textGap * invNormal.x * 1.5), (midpoint.y + textGap * invNormal.y * 1.5));
      } else {
        ctx.fillText(arc.weight.toString(), midpoint.x, (midpoint.y + textGap));
      }
    } else {
      ctx.fillText(arc.weight.toString(), fromNode.position.x, fromNode.position.y - 75 + textGap);
    }
    ctx.fillStyle = ORIGINAL_FILL_STYLE;
  };

  const drawNodeLabels = (ctx: CanvasRenderingContext2D, nodeTextColour: string, titleOpacity: number, nodes: Array<MarkovNode>, textGap: number) => {
    const ORIGINAL_FILL_STYLE = ctx.fillStyle;
    const ORIGINAL_ALPHA = ctx.globalAlpha;

    ctx.fillStyle = nodeTextColour;
    ctx.globalAlpha = titleOpacity;
    nodes.forEach((node) => {
      ctx.fillText(node.label ?? "untitled", node.position.x, node.position.y + textGap);
    });

    ctx.fillStyle = ORIGINAL_FILL_STYLE;
    ctx.globalAlpha = ORIGINAL_ALPHA;
  }

  const drawSelectedNodeLabel = (ctx: CanvasRenderingContext2D, nodeTextColourSelected: string, selectedNode: MarkovNode, textGap: number) => {
    const ORIGINAL_FILL_STYLE = ctx.fillStyle;

    ctx.fillStyle = nodeTextColourSelected;
    ctx.beginPath();
    currentNodes?.forEach((node) => {
      if (node.id === selectedNode.id) {
        ctx.fillText(node.label ?? "untitled", node.position.x, node.position.y + textGap);
      }
    });

    ctx.fillStyle = ORIGINAL_FILL_STYLE;
  }

  const drawRadialMouseBlur = (ctx: CanvasRenderingContext2D, mousePosition: Coord2D, canvasHeight: number, canvasWidth: number, blurColour: string) => {
    const ORIGINAL_FILL_STYLE = ctx.fillStyle;
    const ORIGINAL_ALPHA = ctx.globalAlpha;
    const SMALL_RADIUS = 0;
    const BIG_RADIUS = 200;

    let radgrad = ctx.createRadialGradient(mousePosition.x, mousePosition.y, SMALL_RADIUS, mousePosition.x, mousePosition.y, BIG_RADIUS);
    radgrad.addColorStop(1, 'transparent');
    radgrad.addColorStop(0, blurColour);
    ctx.fillStyle = radgrad;
    ctx.globalAlpha = .21;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = ORIGINAL_FILL_STYLE;
    ctx.globalAlpha = ORIGINAL_ALPHA;
  }

  const drawNode = (ctx: CanvasRenderingContext2D, node: MarkovNode, nodeWidth: number, nodeHeight: number, nodeBorderRadius: number) => {
    ctx.roundRect(node.position.x - (nodeWidth / 2), node.position.y - (nodeHeight / 2), nodeWidth, nodeHeight, nodeBorderRadius);
  };

  const drawNodes = (ctx: CanvasRenderingContext2D, nodes: Array<MarkovNode>, nodeColour: string, nodeWidth: number, nodeHeight: number, nodeBorderRadius: number) => {
    const ORIGINAL_FILL_STYLE = ctx.fillStyle;

    ctx.fillStyle = nodeColour;
    ctx.beginPath();
    nodes.forEach((node) => {
      drawNode(ctx, node, nodeWidth, nodeHeight, nodeBorderRadius);
    });
    ctx.fill();

    ctx.fillStyle = ORIGINAL_FILL_STYLE;
  };

  const drawSelectedNode = (ctx: CanvasRenderingContext2D, nodes: Array<MarkovNode>, selectedNode: MarkovNode, selectedColour: string, nodeWidth: number, nodeHeight: number, nodeBorderRadius: number) => {
    const ORIGINAL_FILL_STYLE = ctx.fillStyle;

    ctx.fillStyle = selectedColour;
    ctx.beginPath();
    nodes.forEach((node) => {
      if (node.id === selectedNode.id) {
        drawNode(ctx, node, nodeWidth, nodeHeight, nodeBorderRadius);
        ctx.fill();
      }
    });

    ctx.fillStyle = ORIGINAL_FILL_STYLE;
  };

  // canvas drawing function
  const draw = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    // retrieving network styling from css file
    const computedStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    // node props
    const nodeColour: string = computedStyle.getPropertyValue('--node-colour') || '#2E2B33';
    const nodeBorderRadius: number = Number(computedStyle.getPropertyValue('--node-border-radius')) || 10;
    const nodeTextColour: string = computedStyle.getPropertyValue('--node-text-colour') || '#FED5FB';
    const nodeTextColourSelected = computedStyle.getPropertyValue('--node-text-selected-colour') || 'white';
    const selectedColour: string = computedStyle.getPropertyValue('--node-selected-colour') || '#61497C';
    const textSize: string = computedStyle.getPropertyValue('--node-text-size') || '12px';
    const titleOpacity: number = Number(computedStyle.getPropertyValue('--title-opacity')) || .6;
    const fontFamily: string = computedStyle.getPropertyValue('--node-font') || 'Fira Code';
    const fontWeight: number = Number(computedStyle.getPropertyValue('--node-font-weight')) || 700;
    const textGap: number = Number(computedStyle.getPropertyValue('--canvas-text-spacing')) || 30;
    const quadraticOffset: number = Number(computedStyle.getPropertyValue('--quadratic-offset')) || 30;

    // arc props
    const arcColour: string = computedStyle.getPropertyValue('--arc-colour') || 'oklch(0.6308 0.143 360)';
    const arcWidth: number = parseInt(computedStyle.getPropertyValue('--node-arc-width')) || 2;
    const arrowRadius: number = Number(computedStyle.getPropertyValue('--arrow-radius')) || 15;

    // other / background
    const blurColour: string = computedStyle.getPropertyValue('--node-selected-colour') || 'oklch(0.244 0.025 264.695)';

    // batch similar operations
    ctx.strokeStyle = arcColour;
    ctx.lineWidth = arcWidth;
    ctx.font = `${fontWeight} ${textSize} ${fontFamily}`;
    ctx.textAlign = 'center';

    // draw arcs + arrows + weights
    // TODO: finish bidirectional logic:
    // - curves
    // - arrows
    // - text
    ctx.beginPath();
    currentArcs?.forEach((arc) => {
      const fromNode = currentNodes?.find((node) => node.id === arc.fromID);
      const toNode = currentNodes?.find((node) => node.id === arc.toID);

      if (fromNode && toNode) {
        const { x: fromX, y: fromY } = fromNode.position;
        const { x: toX, y: toY } = toNode.position;
        const dx: number = toX - fromX;
        const dy: number = toY - fromY;
        const midpoint: Coord2D = { x: fromX + dx / 2, y: fromY + dy / 2 };

        const modulus: number = Math.hypot(dx, dy);
        const normal: Coord2D = { x: dx / modulus, y: dy / modulus };
        const invNormal: Coord2D = { x: -normal.y, y: normal.x };

        let GAMMA: number = Math.atan((toY - fromY) / (toX - fromX));
        if (fromX > toX || (fromY > toY && fromX > toX)) GAMMA += Math.PI;
        const THETA: number = 2 * Math.PI - GAMMA;
        const ALPHA: number = 5 * Math.PI / 4 - THETA;

        drawWeights(ctx, fromNode, toNode, arc, midpoint, textGap, invNormal, nodeTextColour);

        ctx.moveTo(fromX, fromY);

        if (fromNode.id != toNode.id) {
          // shifts the arrows slightly such that their centre aligns with the centre of the arcs, instead of the tip of the arrow aligning
          const ARROW_OFFSET: number = 5;
          let centringFactor: Coord2D = { x: ARROW_OFFSET * Math.cos(GAMMA), y: ARROW_OFFSET * Math.sin(GAMMA) };
          if (isBidirectional(arc)) {
            ctx.quadraticCurveTo(midpoint.x + invNormal.x * quadraticOffset, midpoint.y + invNormal.y * quadraticOffset, toX, toY);
            ctx.moveTo(fromX, fromY);
            centringFactor = { x: centringFactor.x + quadraticOffset * invNormal.x * .5, y: centringFactor.y + quadraticOffset * invNormal.y * .5 };
            drawArrow({ key: "angular", midpoint, centringFactor, arrowRadius, angle: ALPHA }, ctx);
          } else {
            ctx.lineTo(toX, toY);
            drawArrow({ key: "direct", midpoint, centringFactor, arrowRadius, angle: ALPHA }, ctx);
          }
        } else if (fromNode.id == toNode.id) {
          ctx.bezierCurveTo(fromX + 100, fromY - 100, fromX - 100, fromY - 100, toX, toY);
          drawArrow({ key: "loop", ctxPos: { x: fromX - 2, y: fromY - 75 } }, ctx);
        }
      }
    });
    ctx.stroke();

    if (mode == 'edit') {
      // draw dragging connection
      if (draggingArc) {
        drawDraggingArc(ctx, currentNodes ?? [], draggingArc);
      }
    }

    // batch text rendering
    drawNodeLabels(ctx, nodeTextColour, titleOpacity, currentNodes ?? [], textGap);

    // highlighting selected node's label
    if (selectedNode) {
      drawSelectedNodeLabel(ctx, nodeTextColourSelected, selectedNode, textGap);
    }

    // radial blur gradient following mouse
    drawRadialMouseBlur(ctx, mousePos.current ?? OUT_OF_SIGHT, canvasRef.current?.height ?? OUT_OF_SIGHT.x, canvasRef.current?.width ?? OUT_OF_SIGHT.y, blurColour);

    // batch node drawing
    drawNodes(ctx, currentNodes ?? [], nodeColour, NODE_WIDTH, NODE_HEIGHT, nodeBorderRadius);

    // drawing selected node
    if (selectedNode) {
      drawSelectedNode(ctx, currentNodes ?? [], selectedNode, selectedColour, NODE_WIDTH, NODE_HEIGHT, nodeBorderRadius);
    }

    // in the case that edit mode is on, these features are drawn
    if (mode == 'run') {
      // what the chain looks like when the program is running
    }
  }, [
    currentNodes,
    currentArcs,
    draggingArc,
    NODE_WIDTH,
    NODE_HEIGHT,
    mode,
    selectedNode,
  ]);

  // check if user has clicked an arc
  const isClickOnArc = (x: number, y: number, arc: Arc): boolean => {
    // this function should only work if user is in edit mode
    if (mode !== 'edit') return false;

    const fromNode = currentNodes?.find((n) => n.id === arc.fromID);
    const toNode = currentNodes?.find((n) => n.id === arc.toID);
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
    const THETA = Math.atan((nodeB.y - nodeA.y) / (nodeB.x - nodeA.x));

    const distFromA = Math.pow(nodeA.x - x, 2) + Math.pow(nodeA.y - y, 2);
    const distFromB = Math.pow(nodeB.x - x, 2) + Math.pow(nodeB.y - y, 2);

    return (
      perpDistance < 10 && // within 10px of the line
      x >= Math.min(nodeA.x, nodeB.x) + (nodeHitboxRadius || 15) * Math.cos(THETA) && // click is within line segment, the node's radius
      x <= Math.max(nodeA.x, nodeB.x) - (nodeHitboxRadius || 15) * Math.cos(THETA) &&
      y >= Math.min(nodeA.y, nodeB.y) - (nodeHitboxRadius || 15) * Math.sin(THETA) &&
      y <= Math.max(nodeA.y, nodeB.y) + (nodeHitboxRadius || 15) * Math.sin(THETA) &&
      distFromA > nodeHitboxRadius && distFromB > nodeHitboxRadius
    );
  };

  // check if user has clicked a node, returning the node if so
  const nodeClicked = (x: number, y: number, nodeArray: Array<MarkovNode>): MarkovNode | undefined => {
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
    const clickedNode = currentNodes?.find(
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

    const newX = (clientX - rect.left) / scaleX;
    const newY = (clientY - rect.top) / scaleY;

    return { x: newX, y: newY };
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
    const clickedArc = currentArcs?.find((arc) => {
      return isClickOnArc(x, y, arc);
    });

    // remove connection if clicked
    if (clickedArc) {
      console.log("arc clicked: ", clickedArc)
      setCurrentArcs((prev) => {
        const safePrev = prev ?? [];
        return safePrev.filter(
          (arc) =>
            arc.fromID !== clickedArc.fromID || arc.toID !== clickedArc.toID
        )
      });
    }

    // check if clicking on a node
    const clickedNode = nodeClicked(x, y, currentNodes ?? []);

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

  // global mouse move handler for dragging outside canvas
  // store handler in ref so it can access latest values without recreating listeners
  const handleGlobalMouseMoveRef = useRef<(e: MouseEvent) => void>();

  useEffect(() => {
    handleGlobalMouseMoveRef.current = (e: MouseEvent): void => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      let { x, y } = handleMousePosition(e.clientX, e.clientY);
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Constrain node position to canvas bounds
      const minX = NODE_WIDTH / 2;
      const maxX = canvas.width - NODE_WIDTH / 2;
      const minY = NODE_HEIGHT / 2;
      const maxY = canvas.height - NODE_HEIGHT / 2;

      x = Math.max(minX, Math.min(maxX, x));
      y = Math.max(minY, Math.min(maxY, y));

      // update canvas to draw the node in its new position, and assign it a new position internally
      const currentDraggedNode = draggedNodeRef.current;
      if (currentDraggedNode) {
        setCurrentNodes((prev) => {
          const safePrev = prev ?? [];
          const newNodes = safePrev.map((node: MarkovNode) => (node.id === currentDraggedNode ? { ...node, position: { x, y } } : node));
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
  }, [handleMousePosition, NODE_WIDTH, NODE_HEIGHT]);

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
      const { offsetX, offsetY } = e.nativeEvent;
      mousePos.current = { x: offsetX, y: offsetY };

      const { x, y } = handleMousePosition(e.clientX, e.clientY);

      const hoveringNode = nodeExistsAtPoint(x, y, currentNodes ?? []);
      // const hoveringArc = getArcAtPosition(x, y)
      if (canvasRef.current) {
        canvasRef.current.style.cursor = hoveringNode ? "default" : "pointer";
      }
    },
    [handleGlobalMouseMove, currentNodes, nodeExistsAtPoint]
  );

  const handleMouseLeave = useCallback(() => {
    mousePos.current = null;
  }, [])

  // keep selectedNodeRef in sync with selectedNode state
  useEffect(() => {
    selectedNodeRef.current = selectedNode;
  }, [selectedNode]);

  // keep nodesRef, arcsRef in sync with nodes, arcs state
  useEffect(() => {
    nodesRef.current = currentNodes ?? [];
  }, [currentNodes]);

  useEffect(() => {
    arcsRef.current = currentArcs ?? [];
  }, [currentArcs]);

  // handle dragging arcs
  // TODO: use sets instead of arrays for nodes and arcs to prevent duplicates
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
      // setMousePos({ x, y });

      if (selectedNodeRef.current) setSelectedNode(null);

      const currentDraggingArc = draggingArcRef.current;
      if (currentDraggingArc) {
        // check if mouse unclicked within a node's radius
        const targetNode = nodesRef.current.find(
          (node) => Math.sqrt(Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2)) < (nodeHitboxRadius ?? 40)
        );

        if (targetNode) {
          let hasCycle: boolean = false;
          currentArcs?.forEach((arc) => {
            if (arc.fromID == targetNode.id && arc.fromID == targetNode.id) hasCycle = true;
          });
          let hasBidirection = false;
          // turning arrays into sets here will save much time
          targetNode.nodes_in.forEach((nodeA) => {
            targetNode.nodes_out.forEach((nodeB) => {
              if (nodeA.id == nodeB.id) hasBidirection = true;
            })
          })
          let arcExists = targetNode.nodes_in.includes(getNodeByID(currentDraggingArc.fromID));

          if ((((currentDraggingArc.fromID == targetNode.id) && !(hasCycle)) ||
            !(hasBidirection)) &&
            !(arcExists)) {
            addArc({
              fromID: currentDraggingArc.fromID,
              fromLabel: getNodeByID(currentDraggingArc.fromID).label,
              toID: targetNode.id,
              toLabel: targetNode.label,
              weight: 1,
            });
          }
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

    // ResizeObserver to eatches for container size changes
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);

    // also listen to window resize as a fallback
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
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onContextMenu={handleContextMenu}
        onMouseLeave={handleMouseLeave}
      />
      <div className={classes.toolbarOverlay}>
        <div className={classes.toolbarItem}>
          <NewNodeButton />
        </div>
      </div>
    </div>
  );
};
