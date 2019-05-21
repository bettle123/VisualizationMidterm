function barplot_Columbus()
{
	var svg = d3.select("body")
	.append("svg")
	.attr("width", map_width)
	.attr("height",map_height)
	.attr("id", "barPlotColumbus");
	var svg_width = svg.attr("width");
	var svg_height = svg.attr("height");		
	var margin = {top: svg_height/20, right: svg_height/20, bottom: svg_width/20, left: svg_width/20};
	var width = svg.attr("width") - margin.left - margin.right;
	var height = svg.attr("height") - margin.top - margin.bottom;
	var padding = width/100+5;
	var barWidth = width/100;	
	var g = svg.append("g").attr("transform", "translate(" + 0 + "," + margin.top + ")");


var xScale = d3.scaleLinear()
		  .rangeRound([100, width]);

var yScale = d3.scaleLinear()
          .rangeRound([height, 100]);

var colorScale = ["#008000", "#00FFFF"]		  
		  
var datasetA = [];
var datasetB = [];
	   
d3.csv("summary_table.csv", BarChart);


var count =0;

function BarChart(error, data) {
			if (error) throw error;
			
			data.forEach(function(d) {
				d.ARR_Pr = +d.ARR_Pr;
				d.DEP_Pr = +d.DEP_Pr;
				datasetB.push(d.DEP_Pr);
			});
			
			
			data = data.filter(function(d,i){
				if(d.ARR=="CMH"||d.DEP=="CMH")
				{
					count++;
					datasetA.push(d.ARR_Pr);
				}
				return d.ARR=="CMH"||d.DEP=="CMH";
			});
			
			
			//console.log(data);
			
			data.sort(function(a, b) { return b.ARR_Pr - a.ARR_Pr; });
			datasetA = datasetA.sort(d3.descending);
			
			xScale.domain([0, count+1]);
			yScale.domain([0, 1]).nice();
			
			
			var tmp_color;
			
			// draw Bar Chart
			var rects = g.selectAll("rect")
			   .data(data)
			   .enter().append("rect")
			   .attr("x",  function(d, i) {
				   //console.log(i);
				   return (xScale(i+1)-5);
			   })
			   .attr("y", function(d){
				   return yScale(d.ARR_Pr);
			   })
			   .attr("width", barWidth)
			   .attr("height", function(d){
				   return  height- yScale(d.ARR_Pr);
			   })
			   .style("fill", function(d){
				   if(d.total_flight<50)
				   {
					   return colorScale[0];
				   }
				   if(d.total_flight>=50)
				   {
					   return colorScale[1];
				   }
			   })
			   
				.on("mouseover", function(d,i){
					// save current color and change color
					tmp_color = d3.select(this).style("fill"); 
					d3.select(this).style("fill", "blue");
				
				
					var center_x = (xScale(i+1)-5);
					var center_y = yScale(d.ARR_Pr);
					var tmp_value;
					if(d.ARR=="CMH")
					{
						tmp_value = d.ARR_Pr;
					}
					if(d.DEP=="CMH")
					{
						tmp_value = d.DEP_Pr;
					}
					var tmp_flight = d.total_flight;
					// draw tooltip rect
					g.append("rect")
					.attr("x", center_x)
					.attr("y", center_y)
					.attr("width", 210)
					.attr("height", 30)
					.attr("fill", "black")
					.attr("id", "toolbox");
				
					// draw tooltip text	
					g.append("text")
					.attr("x", center_x)
					.attr("y", center_y+15)
					.attr("dy", "0.32em")
					.attr("fill", "white")
					.attr('font-size', 16)
					.attr("font-weight", "bold")
					.attr("text-anchor", "start")
					.attr("id", "tooltip_text")
					.text(function(d){
						return ( " Pr(delay): "
							+d3.format(".2s")(tmp_value*100)+"%"
							+", flights: "+ tmp_flight
						);
					});	
				
				})
				.on("mousemove", function(){
					arrow_down();	
				})
				.on("mouseout", function(){
					// reset color
					d3.select("#toolbox").remove();
					d3.select("#tooltip_text").remove();
					d3.select(this).style("fill", tmp_color);
				});
			
			
			// dep airport text on bar
			var texts = g.selectAll("text")
				.data(data)
				.enter().append("text")
				.attr("x",  function(d, i) {
					return (xScale(i+1)-15);
				})
				.attr("y", function(d){
					return yScale(d.ARR_Pr)-40;
				})
				.text(function(d) { 
					return (d.DEP);
				})
				.attr("dy", "0.32em")
				.attr("fill", "#000")
				.attr('font-size', 9.5)
				.attr("font-weight", "bold")
				.attr("text-anchor", "start");	
			
			// arr airport text on bar
			g.append("g")
			.selectAll("text")
			.append("text")
			.data(data)
			.enter().append("text")
			.attr("x",  function(d, i) {
				return (xScale(i+1)-15);
			})
			.attr("y", function(d){
				return yScale(d.ARR_Pr)-10;
			})
			.text(function(d) { 
				return (d.ARR);
			})
			.attr("dy", "0.32em")
			.attr("fill", "#000")
			.attr('font-size', 9.5)
			.attr("font-weight", "bold")
			.attr("text-anchor", "start");

			
			// arrow images
			for (var i=0;i<count;i++)
			{
					var imgs = g.append('image')
						.attr("xlink:href", function(d){
						return("arrow_down.png");
					})
					.attr("x", (xScale(i+1)-10))
					.attr("y", yScale(datasetA[i])-50)
					.attr("width", 20)
					.attr("height", 0)
					.transition()
					.attr("width", 20)
					.attr("height", 50)
					.duration(1000);
			}
			
			
			
			// arrow animation
			arrow_down();
			function arrow_down(){
			
				for (var i=0;i<count;i++)
				{
					var imgs = g.append('image')
						.attr("xlink:href", function(d){
						return("arrow_down.png");
					})
					.attr("x", (xScale(i+1)-10))
					.attr("y", yScale(datasetA[i])-50)
					.attr("width", 20)
					.attr("height", 0)
					.transition()
					.attr("width", 20)
					.attr("height", 50)
					.duration(1000)
					.transition()
					.attr("width", 20)
					.attr("height", 0)
					.duration(1000);
				}
			}
			
			// draw x-axis
			g.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0,"+height+")")
			.call(d3.axisBottom(xScale).ticks(count, "s"));

			// draw y-axis
			g.append("g")
			.attr("class", "axis")
			.attr("transform", "translate("+100+",0)")
			.call(d3.axisLeft(yScale).ticks(null, "s"))
			.append("text")
			.attr("x", -50)
			.attr("y", 30)
			.attr("dy", "0.32em")
			.attr("fill", "#000")
			.attr('font-size', 18)
			.attr("font-weight", "bold")
			.attr("text-anchor", "start")
			.text("Probability");

			
			// draw legends
			var legend_data = [];
			for (var i=0;i<=1;i++){
				legend_data.push(i*50+1);
			}
			var legend = g.append("g")
				.attr("font-family", "sans-serif")
				.attr("font-size", 18)
				.attr("text-anchor", "end")
				.selectAll("g")
				.data(legend_data)
				.enter().append("g")
				.attr("transform", function(d, i) { return "translate(0," + i * 10 + ")"; });

	
			// legend rect
			legend.append("rect")
			.attr("x", width - 200)
			.attr("y", function(d, i) { return i * 20; })
			.attr("width", 50)
			.attr("height", 20)
			.attr("fill", function(d){
				if(d<=50)
				{
					return colorScale[0];
				}
				if(d>50)
				{
					return colorScale[1];
				}
		
			})
			.attr("stroke", "black");			
			
			// legend text
			legend.append("text")
			.attr("x", width - 19)
			.attr("y", function(d, i) { return i * 20+10; })
			.attr("dy", "0.32em")
			.text(function(d) { 
				if(d<=50)
				{
					return("# of flight <= 50");
				}
				if(d>50)
				{
					return("# of flight >50");
				}
			});
			
			
			// draw title
			g.append("g")
			.append("text")
			.attr("x", width/4)
			.attr("y", 20)
			.attr("dy", "0.32em")
			.attr("fill", "#000")
			.attr('font-size', 24)
			.attr("font-weight", "bold")
			.attr("text-anchor", "start")
			.text("delay Probability of all flights from/to airport CMH");
			
			// draw x_axis title
			g.append("g")
			.append("text")
			.attr("x", width/2)
			.attr("y", height+25)
			.attr("dy", "0.32em")
			.attr("fill", "#000")
			.attr('font-size', 18)
			.attr("font-weight", "bold")
			.attr("text-anchor", "start")
			.text("Rank");

			
	}
}


function displayBarplot_Columbus(){
	// remore the current svg first
	reset_barplot_Columbus();
	barplot_Columbus();
}