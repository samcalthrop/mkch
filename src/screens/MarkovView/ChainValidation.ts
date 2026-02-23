import { findArc } from "@/screens/MarkovView";
import { Arc, MarkovMatrix, MarkovNode } from "@/types";
import { ok, err } from 'neverthrow';

export const convertChainToMatrix = (nodes: Array<MarkovNode>, arcs: Array<Arc>): MarkovMatrix => {
  let weightsArr = Array<number>(nodes.length * nodes.length).fill(0);
  let statesArr = Array<string>(nodes.length);
  let weightsIndex = 0;
  let statesIndex = 0;
  // iterate through each cell in the matrices simultaneously
  nodes.forEach((rowNode) => {
    nodes.forEach((colNode) => {
      const weight = findArc(rowNode, colNode, arcs)?.weight ?? 0;
      weightsArr[weightsIndex] = weight;
      weightsIndex++;
    })
    statesArr[statesIndex] = nodes[statesIndex].label ?? "unknown";
    statesIndex++;
  })
  return { statesArr, weightsArr, width: nodes.length, height: nodes.length };
}

export const validateChain = (matrix: MarkovMatrix) => {
  if (matrix.statesArr.length === 0) return err({ reason: "no chain found" });
  // return error if no weights are above 0 (no arcs)
  // !! NOT TESTED
  if (matrix.weightsArr.every((weight) => weight === 0)) return err({ reason: "no arcs in chain" });

  let allRowsSumToOne: boolean = false;
  for (let row = 0; row < matrix.width; row++) {
    let sum = 0;
    for (let col = 0; col < matrix.height; col++) {
      sum += matrix.weightsArr[row * matrix.width + col];
    }
    allRowsSumToOne = sum == 1;
  }

  if (!allRowsSumToOne) return err({ reason: "chain is not valid (arc weights out of each node don't sum to 1)" });

  return ok(matrix);
}
