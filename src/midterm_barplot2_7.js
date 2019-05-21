
///////////////////////////////////////////////////////////////////
/*
date: 10/28/2018
author: Su Ming Yi
goal: arrival barplot
*/
//////////////////////////////////////////////////////////////////////
function Barplot2()
{
	var svg = d3.select("body")
	.append("svg")
	.attr("width", barplot_width)
	.attr("height",barplot_height)
	.attr("id", "barPlot2");
	var svg_width = svg.attr("width");
	var svg_height = svg.attr("height");		
	var margin = {top: svg_height/20, right: svg_height/20, bottom: svg_width/20, left: svg_width/20};
	var width = svg.attr("width") - margin.left - margin.right;
	var height = svg.attr("height") - margin.top - margin.bottom;
	var padding = width/10;
	var barWidth = width/4;	
	var g = svg.append("g").attr("transform", "translate(" + 0 + "," + margin.top + ")");
	
	var xScale = d3.scaleBand()
		.rangeRound([100, width])
		.paddingInner(0.1)
		.align(0.1);	

	
	var yScale = d3.scaleLinear()
          .rangeRound([height, 80])
		  .domain([0, 1]);
		  
	var dep = [{label: "on-time", pr: (1-arr_delay_pr)},
            {label: "delay", pr: arr_delay_pr}];
	
	xScale.domain(dep.map(function(d) { return d.label; }))
	
	
	// tooltip
	var tooltip = d3.select("body")
		.append("div")
		.style("color", "red")
		.style("font-size", 20)
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.data(dep);
	var tmp_color;
	// draw Bar Chart
	var rects = g.selectAll("rect")
		.data(dep)
		.enter().append("rect")
		.attr("x",  function(d, i) {
			return xScale(d.label);
			//return barWidth*i+ padding*(i+1);
		})
		.attr("y", function(d){
			return yScale(d.pr);
		})
		.attr("width", 0)
		.attr("height", 0)
		.style("fill", function(d){
			if(d.label=="on-time"){
				return "blue";
			}
			if(d.label=="delay")
			{
				return "red";
			}
				
		})
		.on("mouseover", function(d){
			// save current color and change color
			tmp_color = d3.select(this).style("fill"); 
			d3.select(this).style("fill", "green");
			var tmp_value = d.pr;
			var tmp_label = d.label;
			var tmp = tooltip.style("visibility", "visible")
				.text(function(d) { 
				return ("Pr("+tmp_label+")= "+(d3.format("0.2s")(tmp_value*100))+"%"); 
				});
			if(tmp_label=="delay")
			{
				tmp.append("div").append("text")
					.text("Average delay time = "+(d3.format("0.2s")(arr_delay_time))+" minutes");
			}
				
			return tmp;				
		})
		.on("mousemove", function(){
			var tmp = tooltip.style("top", (event.pageY-10)+"px")
			.style("left",(event.pageX+10)+"px");
			return tmp;	
		})
		.on("mouseout", function(){
			// reset color
			d3.select(this).style("fill", tmp_color);
			var tmp = tooltip.style("visibility", "hidden");
			return tmp;
		})
		.transition()
		.attr("width", barWidth)
		.attr("height", function(d){
			return  height- yScale(d.pr);
		})
		.duration(1000)
		.ease(d3.easeLinear);
		
	// text on bar
	var texts = g.selectAll("text")
		.data(dep)
		.enter().append("text")
		.attr("x",  function(d, i) {
			return (xScale(d.label)+40);
		})
		.attr("y", function(d){
			return (yScale(d.pr)-10);
		})
		.text(function(d) { 
			return (d3.format("0.2s")(d.pr*100)+"%");
		})
		.attr("dy", "0.32em")
		.attr("fill", "#000")
		.attr('font-size', 24)
		.attr("font-weight", "bold")
		.attr("text-anchor", "start");	
	
	// draw x-axis
	g.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(-10,"+height+")")
	.call(d3.axisBottom(xScale));

	// draw y-axis
	g.append("g")
	.attr("class", "axis")
	.attr("transform", "translate("+90+",0)")
	.call(d3.axisLeft(yScale).ticks(null, "s"))
	.append("text")
	.attr("x", -50)
	.attr("y", 50)
	.attr("dy", "0.32em")
	.attr("fill", "#000")
	.attr('font-size', 18)
	.attr("font-weight", "bold")
	.attr("text-anchor", "start")
	.text("Probability");

	// draw title
	g.append("g")
	.append("text")
	.attr("x", 50)
	.attr("y", 20)
	.attr("dy", "0.32em")
	.attr("fill", "#000")
	.attr('font-size', 24)
	.attr("font-weight", "bold")
	.attr("text-anchor", "start")
	.text("the Probability of Arrival Airport");
			
	// draw x_axis title
	g.append("g")
	.append("text")
	.attr("x", width/2)
	.attr("y", height+15)
	.attr("dy", "0.32em")
	.attr("fill", "#000")
	.attr('font-size', 18)
	.attr("font-weight", "bold")
	.attr("text-anchor", "start")
	.text("Performance");
	
	var legend = g.append("g")
		.attr("font-family", "sans-serif")
		.attr("font-size", 18)
		.attr("text-anchor", "end")
		.selectAll("g")
		.data(dep)
		.enter().append("g")
		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	// legend rect
	legend.append("rect")
		.attr("x", width - 19)
		.attr("y", 40)
		.attr("width", 19)
		.attr("height", 19)
		.attr("fill", function(d){
			if (d.label=="on-time"){
				return "blue";
			}
			if (d.label=="delay"){
				return "red";
			}
		});
	// legend text
	legend.append("text")
		.attr("x", width - 24)
		.attr("y", 50)
		.attr("dy", "0.32em")
		.text(function(d) { return d.label; });
	
}

function displayBarplot2(){
	// remore the current svg first
	reset_barplot2();
	Barplot2();
}