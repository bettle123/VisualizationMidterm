///////////////////////////////////////////////////////////////////
/*
date: 10/28/2018
author: Su Ming Yi
goal: A USA map example
*/
//////////////////////////////////////////////////////////////////////
function Map_Travel()
{
///////////////////////////
// plot parameter
var svg = d3.select("body")
	.append("svg")
	.attr("width", map_width)
	.attr("height", map_height)
	.attr("id", "mapPlot");
var svg_width = svg.attr("width");
var svg_height = svg.attr("height");
var margin = {top: svg_height/20, right: svg_width/20, bottom: svg_height/20, left: svg_width/20};
var width = svg.attr("width") - margin.left - margin.right;
var height = svg.attr("height") - margin.top - margin.bottom;
var g = svg.append("g").attr("transform", "translate(" + 0 + "," + margin.top + ")");

d3.json("usa_mainland.json", drawUSA);
function drawUSA(error, states) {
	
	var projection = d3.geoEquirectangular()
						.fitExtent([[0,0], [width, height]], states);
	
	var geoGenerator = d3.geoPath()
						.projection(projection);
	
	var paths = g.selectAll('path')
				.data(states.features)
				.enter()
				.append('path')
				.attr("fill","yellow")
				.attr("stroke", "black")
				.attr('d', geoGenerator);
			
	// draw texts
	var state_texts = g.selectAll('text')
				.data(states.features)
				.enter()
				.append('text')
				.attr('text-anchor', 'middle')
				.attr('alignment-baseline', 'middle')
				.attr('opacity', 1)
				.style("fill", "red")
				.text(function(d) {
					return d.properties.STUSPS10;
				})
				.attr('transform', function(d) {
					var center = geoGenerator.centroid(d);
					return 'translate ('+ center+ ')';
				});
	// get location of departure and arrivial
	var dep_loc =[];
	var arr_loc = [];
	// get map location
	g.data(states.features)
	.enter()
	.filter(function(d,i){
		// if user select the same State
		if(selectedDepState==selectedArrState)
		{
			if(d.properties.STUSPS10==selectedDepState){
			var center = geoGenerator.centroid(d);
			dep_loc.push(center[0]);
			dep_loc.push(center[1]);
			arr_loc.push(center[0]-10);
			arr_loc.push(center[1]-10);
			
			}
		}
		if(d.properties.STUSPS10==selectedDepState){
			var center = geoGenerator.centroid(d);
			dep_loc.push(center[0]);
			dep_loc.push(center[1]);
		}
		if(d.properties.STUSPS10==selectedArrState){
			var center = geoGenerator.centroid(d);
			arr_loc.push(center[0]);
			arr_loc.push(center[1]);
		}
		// if user select the same State
		if(selectedDepState==selectedArrState)
		{
			if(d.properties.STUSPS10==selectedDepState){
			var center = geoGenerator.centroid(d);
			dep_loc.push(center[0]);
			dep_loc.push(center[1]);
			arr_loc.push(0);
			arr_loc.push(0);
			
			}
		}
		return 0;
	});
	
	// if the State is from AK or HI
	if(selectedDepState=="AK" || selectedDepState=="HI")
	{
			dep_loc.push(100);
			dep_loc.push(height);
	}
	if(selectedArrState=="AK" || selectedArrState=="HI")
	{
			arr_loc.push(width);
			arr_loc.push(100);
	}

	
	// draw circles
	var circles = g.selectAll('circle')
					.data(states.features)
					.enter()
					.filter(function(d,i){
						if(d.properties.STUSPS10==selectedDepState){
							return d;
						}
						if(d.properties.STUSPS10==selectedArrState){
							var center = geoGenerator.centroid(d);
							return d;
						}
						return 0;
					})
					.append("circle");
	circles.attr("cx", function(d) {
			var center = geoGenerator.centroid(d);
			return center[0];
		})
		.attr("cy", function(d) {
			var center = geoGenerator.centroid(d);
			return center[1]-20;
		})
		.attr("r", 10)
		.attr("fill", "blue")
		.attr("stroke", "black");
	
	// airplane path
	//The data for our line
	var lineData1 = [ { "x":dep_loc[0],   "y": dep_loc[1]-20},
					  { "x": dep_loc[0], "y":dep_loc[1]-20}
        ];
	var lineData2 = [ { "x": arr_loc[0],   "y": arr_loc[1]-20},
					{ "x": dep_loc[0],  "y": dep_loc[1]-20}
        ];
	var lineFunction = d3.line()
					.curve(d3.curveMonotoneX)
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; });
	var lineGraph = g.append("path")
				 .attr("stroke", "blue")
                 .attr("stroke-width", 2);
	repeat_line();
	function repeat_line()
	{
		lineGraph.attr("d", lineFunction(lineData1))
				 .transition()
                 .attr("d", lineFunction(lineData2))
				 .duration(6000)
				 .on("end", repeat_line);
	}

	
	
	// airplane
	var imgs = g.append('image')
		.attr("xlink:href", function(d){
			if((dep_loc[0]-arr_loc[0])<=0)
			{
				return("airplane_left.png");
			}
			if((dep_loc[0]-arr_loc[0])>0)
			{
				return("airplane_right_1105.png");
			}
		})
		//.attr("xlink:href", "example.gif")
		.attr("width", airplane_width)
		.attr("height", airplane_height);
	
	repeat_airplane();
	function repeat_airplane()
	{
		// draw airplane
		imgs
		.attr("x", function(d){
			return (dep_loc[0]-airplane_width/2);
		})
		.attr("y", function(d){
			return (dep_loc[1]-airplane_height/2);
		})
		.transition()
		.attr("x", function(d){
			return (arr_loc[0]-airplane_width/2);
		})
		.attr("y", function(d){
			return (arr_loc[1]-airplane_height/2);
		})
		.duration(6000)
		.on("end", repeat_airplane);
	}	
	
	
	
	// draw title
	g.append("g")
	.append("text")
	.attr("x", width/4)
	.attr("y", -10)
	.attr("dy", "0.32em")
	.attr("fill", "#000")
	.attr('font-size', 24)
	.attr("font-weight", "bold")
	.attr("text-anchor", "start")
	.text("Airline U.S. states in map.");
}
}


function displayMap(){
	// remore the current svg first
	reset();
	Map_Travel();
}