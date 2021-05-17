import React from 'react';
import * as d3 from "d3";
import { formatChartData, ONE_WEEK } from "./chartHelpers.js";

export const TemperatureChart = ({ d }) => {

  // const ref = useRef(null);

  const width = 900;
  const height = 900;
  const chartMargins = ({ top: 30, right: 50, bottom: 30, left: 30 });
  const labelPadding = 6;

  if (!d.length) return null;
  const data = formatChartData(d);
  console.log("DATA: ", data)
  const drawChart = () => {
console.log('DRAWING')
    // d3.select("body")
    //   .selectAll("p")
    //   .data(data, (d) => d.date)
    //   .enter().append("p")
    //   .text(function (d) { return `${d.date}: ${d.temp}ºF` });

    // .domain([data[0].date, data[data.length - 1].date])
    const x = d3.scaleUtc()
      .domain([Date.now() - ONE_WEEK, Date.now()])
      .range([chartMargins.left, width - chartMargins.right])
    const y = d3.scaleLinear()
      .domain([0, 110])
      .range([height - chartMargins.bottom, chartMargins.top]);

    const z = d3.scaleOrdinal(data.slice(1), d3.schemeCategory10);

    const xAxis = g => g
      .attr("transform", `translate(0,${height - chartMargins.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    const svg = d3.select("#chart-container")
      .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
      .call(xAxis);

    const serie = svg.append("g")
      .selectAll("g")
      .data(data)
      .join("g");

    serie.append("path")
      .attr("fill", "none")
      .attr("stroke", d => z(d[0].key))
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(d => {
          // console.log("X", x(d.date))
          return x(d.date)
        } )
        .y(d => {
          // console.log("Y",d)
          return y(d.value)
        }));

    serie.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(d => d)
      .join("text")
      .text(d => d.value)
      .attr("dy", "0.35em")
      .attr("x", d => x(d.date))
      .attr("y", d => y(d.value))
      .call(text => text.filter((d, i, data) => i === data.length - 1)
        .append("tspan")
        .attr("font-weight", "bold")
        .text(d => ` ${d.key}`))
      .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", labelPadding);

    //  d3.select("#chart-container")
    //   .append(svg.node())
     return svg.node();

  }
  drawChart()

  return (
    <div>
      <svg id="chart-container" />
    </div>
  )
}