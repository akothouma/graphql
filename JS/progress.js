export function createProgressGraph(containerId, data) {
  try {
    // Clear container and validate input
    const container = d3.select(`#${containerId}`);
    container.html('');
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      container.append('p').text('No data available');
      return;
    }

    // Configuration
    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    // Parse and validate data
    const parseDate = (dateString) => {
      try {
        // Try ISO format first
        let date = new Date(dateString);
        if (!isNaN(date.getTime())) return date;
        
        // Fallback for non-standard formats
        date = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(dateString);
        if (!isNaN(date?.getTime())) return date;
        
        console.warn('Invalid date format:', dateString);
        return null;
      } catch (e) {
        console.warn('Date parsing error:', e);
        return null;
      }
    };

    const dataset = data
      .map(d => {
        if (!d?.progress) return null;
        
        const date = parseDate(d.progress.createdAt);
        const grade = Number(d.progress.grade);
        
        if (!date || isNaN(grade)) {
          console.warn('Invalid data point:', d);
          return null;
        }
        
        return { date, grade };
      })
      .filter(d => d !== null)
      .sort((a, b) => a.date - b.date);

    if (dataset.length === 0) {
      container.append('p').text('No valid data points');
      return;
    }

    // Create scales with fallbacks
    const xExtent = d3.extent(dataset, d => d.date);
    const yMax = Math.max(3, d3.max(dataset, d => d.grade) * 1.1); // Minimum domain of 0-3

    const xScale = d3.scaleTime()
      .domain(xExtent)
      .range([0, graphWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([graphHeight, 0]);

    // Create SVG
    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw axes first
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${graphHeight})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

    // Only draw line if we have at least 2 valid points
    if (dataset.length >= 2) {
      const line = d3.line()
        .defined(d => !isNaN(d.grade))
        .x(d => {
          const x = xScale(d.date);
          if (isNaN(x)) console.warn('NaN x value for date:', d.date);
          return x;
        })
        .y(d => {
          const y = yScale(d.grade);
          if (isNaN(y)) console.warn('NaN y value for grade:', d.grade);
          return y;
        })
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(dataset)
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', '#4a90e2')
        .attr('stroke-width', 3);
    }

    // Add data points
    svg.selectAll('.dot')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.grade))
      .attr('r', 4)
      .attr('fill', '#4a90e2');

    // Add title and labels
    svg.append('text')
      .attr('x', graphWidth / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('Grade Progression');

  } catch (error) {
    console.error('Error rendering graph:', error);
    d3.select(`#${containerId}`).html(`<p class="error">Error displaying graph: ${error.message}</p>`);
  }
}