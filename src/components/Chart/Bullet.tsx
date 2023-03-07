import * as d3 from "d3";
import { useEffect, useRef } from "react";

// build the svg container
const drawChart = (
  target: any,
  {
    width,
    height,
    min,
    max,
    measure,
    compare,
    label,
    classes,
    margins,
  }: BulletProps
) => {
  const _margins = {
    top: 0,
    left: 0,
    right: 0,
    bottom: label !== undefined ? 20 : 0,
    ...margins,
  };

  const _classes = {
    axis: "stroke-zinc-700",
    measure: "stroke-sky-400 stroke-[5px]",
    compare: "stroke-zinc-900",
    label: "",
    ...classes,
  };
  const targetAccess = d3.select(target);
  const chart = d3.create("svg").attr("width", width).attr("height", height);
  const xScale = d3
    .scaleLinear()
    .domain([-1, 1])
    .range([_margins.left, width - _margins.right]);
  const yScale = d3
    .scaleLinear()
    .domain([min, max])
    .range([height - _margins.bottom, _margins.top]);
  const scaledLine = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  chart
    .append("path")
    .attr(
      "d",
      scaledLine([
        [0, min],
        [0, max],
      ])
    )
    .attr("class", _classes.axis);

  chart
    .append("path")
    .attr(
      "d",
      scaledLine([
        [0, min],
        [0, measure],
      ])
    )
    .attr("class", _classes.measure);

  if (compare !== undefined) {
    chart
      .append("path")
      .attr(
        "d",
        scaledLine([
          [-1, compare],
          [1, compare],
        ])
      )
      .attr("class", _classes.compare);
  }
  // TODO: Add ability to style label
  if (label !== undefined) {
    chart
      .append("text")
      .text(label)
      .attr("text-anchor", "middle")
      .attr("x", xScale(0))
      .attr("y", yScale(min))
      .attr("dy", 15);
  }
  // TODO: Add tooltips

  targetAccess.selectAll("svg").remove();
  targetAccess.append(() => chart.node());
};

type Data = {
  title: string;
  measure: number;
  compare: number;
  extents: [start: number, end: number];
};

export type BulletProps = {
  width: number;
  height: number;
  min: number;
  max: number;
  measure: number;
  compare?: number;
  label?: string;
  classes?: {
    measure?: string;
    compare?: string;
    axis?: string;
    label?: string;
  };
  margins?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

const Bullet = ({
  width,
  height,
  min,
  max,
  measure,
  compare,
  label,
  classes,
  margins,
}: BulletProps) => {
  const targetRef = useRef();
  useEffect(() => {
    // need to add a clear method otherwise chart just keeps getting redrawn
    if (targetRef.current) {
      drawChart(targetRef.current, {
        width,
        height,
        min,
        max,
        measure,
        compare,
        classes,
        label,
        margins,
      });
    }
  }, [height, width, min, max, measure, compare, classes, label, margins]);
  // Could change it so that we create the svg element here, then pass a ref of it to the draw mthod and only append to it
  return (
    <div style={{ width: width, height: height }} ref={targetRef as any} />
  );
};

export default Bullet;
