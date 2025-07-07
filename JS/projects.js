export function createModuleXpBarChart(containerId, data) {
  // Clear container and validate input
  const container = d3.select(`#${containerId}`);
  container.html('');
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    container.append('p').text('No data available');
    return;
  }

  // Configuration
  const width = 1000;
  const height = 600;
  const margin = { top: 40, right: 40, bottom: 150, left: 80 }; // Increased bottom margin for rotated labels
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  // Process data - extract module names and sort by XP
  const processedData = data.map(d => ({
    module: d.path.split('/').pop().replace(/-/g, ' '), // Convert "module-name" to "module name"
    amount: d.amount,
    fullPath: d.path
  })).sort((a, b) => b.amount - a.amount); // Sort descending by amount

  // Create scales
  const xScale = d3.scaleBand()
    .domain(processedData.map(d => d.module))
    .range([0, graphWidth])
    .padding(0.2);

  const yMax = d3.max(processedData, d => d.amount) * 1.05; // Add 5% padding
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

  // Add background
  svg.append('rect')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('fill', '#f8f9fa');

  // Create axes
  const xAxis = svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${graphHeight})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .attr('text-anchor', 'end')
    .attr('dx', '-0.8em')
    .attr('dy', '0.15em');

  svg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale).ticks(8))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -50)
    .attr('x', -graphHeight/2)
    .attr('text-anchor', 'middle')
    .text('Experience Points');

  // Add grid lines
  svg.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft(yScale)
      .tickSize(-graphWidth)
      .tickFormat('')
      .ticks(8)
    );

  // Create bars
  svg.selectAll('.bar')
    .data(processedData)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.module))
    .attr('y', d => yScale(d.amount))
    .attr('width', xScale.bandwidth())
    .attr('height', d => graphHeight - yScale(d.amount))
    .attr('fill', '#4a90e2')
    .on('mouseover', function(event, d) {
      d3.select(this).attr('fill', '#2c6cb0');
      
      // Show tooltip
      const tooltip = svg.append('g')
        .attr('class', 'tooltip')
        .attr('transform', `translate(${xScale(d.module) + xScale.bandwidth()/2},${yScale(d.amount) - 10})`);
      
      tooltip.append('rect')
        .attr('x', -50)
        .attr('y', -25)
        .attr('width', 100)
        .attr('height', 20)
        .attr('fill', 'white')
        .attr('stroke', '#333');
      
      tooltip.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.5em')
        .text(d3.format(',')(d.amount) + ' XP');
    })
    .on('mouseout', function() {
      d3.select(this).attr('fill', '#4a90e2');
      svg.selectAll('.tooltip').remove();
    });

  // Add title
  svg.append('text')
    .attr('x', graphWidth / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .style('font-size', '18px')
    .style('font-weight', 'bold')
    .text('Module Experience Points Distribution');

  // Add click interaction (optional)
  svg.selectAll('.bar')
    .on('click', function(event, d) {
      console.log('Module clicked:', d.fullPath);
      // You could add navigation or other interactive behavior here
    });
}

