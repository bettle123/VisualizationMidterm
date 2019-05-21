function lineplot_date()
{
	d3.select("#timePlot").remove();
	reset_Pie();
	var svg = d3.select("body")
	.append("svg")
	.attr("width", map_width)
	.attr("height",map_height)
	.attr("id", "timePlot");
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
		  
	   
d3.csv("date_table.csv", LineChart);


var count = 31;

var delay_data = [];
var ontime_data = [];

function LineChart(error, data) {
			if (error) throw error;
			
			data.forEach(function(d) {
				//d.ARR_Pr = +d.ARR_Pr;
				d.DAY_OF_MONTH = +d.DAY_OF_MONTH;
				d.DEP_DEL15 = +d.DEP_DEL15;
				d.ARR_DEL15 = +d.ARR_DEL15;
				d.total_flight = +d.total_flight;
			});
			//console.log(data);
			for(var i=0;i<31;i++)
			{
				delay_data.push(0);
			}
			
			
			data.filter(function(d,i){
				if((d.ARR_DEL15==1||d.DEP_DEL15==1))
				{
					var idx = d.DAY_OF_MONTH-1;
					delay_data[idx] = delay_data[idx] + d.total_flight;
				}
				if((d.ARR_DEL15==0&&d.DEP_DEL15==0))
				{
					ontime_data.push(d.total_flight);
				}
			});
			
			//console.log(ontime_data);
			//console.log(delay_data);
			
			xScale.domain([0, count+1]);
			yScale.domain([0, 20000]).nice();
			
			var tmp_color;
			
			// line chart
			// one line for ontime, one line for delay
			// line function
			var line = d3.line()
				.x(function(d, i) { return xScale(i+1); })
				.y(function(d) { return yScale(d); })
				.curve(d3.curveMonotoneX);
			
			// line for ontime
			var lineGraph = g.append("path")
				 .attr("stroke", "blue")
                 .attr("stroke-width", 2)
				 .attr("fill", "none")
				 .attr("d", line(ontime_data));
			
			var ontime_circles = g.append("g").selectAll('circle')
					.data(ontime_data)
					.enter()
					.append("circle")
					.attr("cx", function(d,i) {
						return xScale(i+1);
					})
					.attr("cy", function(d) {
							return yScale(d);
					})
					.attr("r", 7)
					.attr("fill", "blue")
					.attr("stroke", "black")
					.on("mouseover", function(d,i){
				
							// save current color and change color
							tmp_color = d3.select(this).style("fill"); 
							d3.select(this).style("fill", "green");
				
				
							var center_x = (xScale(i+1)-5);
							var center_y = yScale(d);
							var tmp_ontime = d;
							var tmp_delay = delay_data[i];
							var tmp_pr = tmp_delay/(tmp_ontime+tmp_delay);
							// draw tooltip rect
							g.append("rect")
							.attr("x", center_x)
							.attr("y", center_y)
							.attr("width", 200)
							.attr("height", 60)
							.attr("fill", "black")
							.attr("id", "toolbox");
				
							// draw tooltip text line 1	
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+15)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_1")
							.text(function(d){
								return ( "On-time flight: "
								+d3.format(".2s")(tmp_ontime)
								);
							});	
							// draw tooltip text line 2
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+30)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_2")
							.text(function(d){
								return ( "Delay flight: "+d3.format(".2s")(tmp_delay));
							});	
							// draw tooltip text line 2
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+45)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_3")
							.text(function(d){
								return ( "Pr(delay): " +d3.format(".2s")(tmp_pr*100)+"%");
							});
					})
					.on("mouseout", function(){
						// reset color
						d3.select("#toolbox").remove();
						d3.select("#tooltip_text_1").remove();
						d3.select("#tooltip_text_2").remove();
						d3.select("#tooltip_text_3").remove();
						d3.select(this).style("fill", tmp_color);
					});
			
			///////////////////////////////////////
			// line for delay
			var lineGraph2 = g.append("path")
				 .attr("stroke", "red")
                 .attr("stroke-width", 2)
				 .attr("fill", "none")
				 .attr("d", line(delay_data));
			var delay_circles = g.append("g").selectAll('circle')
					.data(delay_data)
					.enter()
					.append("circle")
					.attr("cx", function(d,i) {
						return xScale(i+1);
					})
					.attr("cy", function(d) {
							return yScale(d);
					})
					.attr("r", 7)
					.attr("fill", "red")
					.attr("stroke", "black")
					.on("mouseover", function(d,i){
				
							// save current color and change color
							tmp_color = d3.select(this).style("fill"); 
							d3.select(this).style("fill", "yellow");
				
				
							var center_x = (xScale(i+1)-5);
							var center_y = yScale(d);
							var tmp_ontime = ontime_data[i];
							var tmp_delay = d;
							var tmp_pr = tmp_delay/(tmp_ontime+tmp_delay);
							// draw tooltip rect
							g.append("rect")
							.attr("x", center_x)
							.attr("y", center_y)
							.attr("width", 200)
							.attr("height", 60)
							.attr("fill", "black")
							.attr("id", "toolbox");
				
							// draw tooltip text line 1	
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+15)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_1")
							.text(function(d){
								return ( "On-time flight: "
								+d3.format(".2s")(tmp_ontime)
								);
							});	
							// draw tooltip text line 2
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+30)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_2")
							.text(function(d){
								return ( "Delay flight: "+d3.format(".2s")(tmp_delay));
							});	
							// draw tooltip text line 2
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+45)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_3")
							.text(function(d){
								return ( "Pr(delay): " +d3.format(".2s")(tmp_pr*100)+"%");
							});
					})
					.on("mouseout", function(){
						// reset color
						d3.select("#toolbox").remove();
						d3.select("#tooltip_text_1").remove();
						d3.select("#tooltip_text_2").remove();
						d3.select("#tooltip_text_3").remove();
						d3.select(this).style("fill", tmp_color);
					});
			//////////////////////////////
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
			.attr("y", 80)
			.attr("dy", "0.32em")
			.attr("fill", "#000")
			.attr('font-size', 18)
			.attr("font-weight", "bold")
			.attr("text-anchor", "start")
			.text("number of flights");
			
			
			// draw legends
			var legend_data = [];
			for (var i=0;i<=1;i++){
				legend_data.push(i);
			}
			//console.log(legend_data);
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
			.attr("y", function(d, i) { return i * 20+50; })
			.attr("width", 50)
			.attr("height", 20)
			.attr("fill", function(d){
				if(d==0)
				{
					return "blue";
				}
				if(d==1)
				{
					return "red";
				}
		
			})
			.attr("stroke", "black");			
			
			// legend text
			legend.append("text")
			.attr("x", width - 19)
			.attr("y", function(d, i) { return i * 20+10+50; })
			.attr("dy", "0.32em")
			.text(function(d) { 
				if(d==0)
				{
					return("on-time flight");
				}
				if(d==1)
				{
					return("delay flight");
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
			.text("time series of all flights in July (date)");
			
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
			.text("Date in July");

			
	}
	displayPie();
}


function lineplot_week()
{
	d3.select("#timePlot").remove();
	reset_Pie();
	var svg = d3.select("body")
	.append("svg")
	.attr("width", map_width)
	.attr("height",map_height)
	.attr("id", "timePlot");
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
		  
	   
d3.csv("week_table.csv", LineChart);


var count = 7;

var delay_data = [];
var ontime_data = [];

function LineChart(error, data) {
			if (error) throw error;
			
			data.forEach(function(d) {
				d.DAY_OF_WEEK = +d.DAY_OF_WEEK;
				d.DEP_DEL15 = +d.DEP_DEL15;
				d.ARR_DEL15 = +d.ARR_DEL15;
				d.total_flight = +d.total_flight;
			});
			//console.log(data);
			for(var i=0;i<7;i++)
			{
				delay_data.push(0);
			}
			
			
			data.filter(function(d,i){
				if((d.ARR_DEL15==1||d.DEP_DEL15==1))
				{
					var idx = d.DAY_OF_WEEK-1;
					delay_data[idx] = delay_data[idx] + d.total_flight;
				}
				if((d.ARR_DEL15==0&&d.DEP_DEL15==0))
				{
					ontime_data.push(d.total_flight);
				}
			});
			
			//console.log(ontime_data);
			//console.log(delay_data);
			
			xScale.domain([0, count+1]);
			yScale.domain([0, d3.max(data, function(d) {return d.total_flight;})]).nice();
			
			var tmp_color;
			
			// line chart
			// one line for ontime, one line for delay
			// line function
			var line = d3.line()
				.x(function(d, i) { return xScale(i+1); })
				.y(function(d) { return yScale(d); })
				.curve(d3.curveMonotoneX);
			
			// line for ontime
			var lineGraph = g.append("path")
				 .attr("stroke", "blue")
                 .attr("stroke-width", 4)
				 .attr("fill", "none")
				 .attr("d", line(ontime_data));
			
			var ontime_circles = g.append("g").selectAll('circle')
					.data(ontime_data)
					.enter()
					.append("circle")
					.attr("cx", function(d,i) {
						return xScale(i+1);
					})
					.attr("cy", function(d) {
							return yScale(d);
					})
					.attr("r", 10)
					.attr("fill", "blue")
					.attr("stroke", "black")
					.on("mouseover", function(d,i){
				
							// save current color and change color
							tmp_color = d3.select(this).style("fill"); 
							d3.select(this).style("fill", "green");
				
				
							var center_x = (xScale(i+1)-5);
							var center_y = yScale(d);
							var tmp_ontime = d;
							var tmp_delay = delay_data[i];
							var tmp_pr = tmp_delay/(tmp_ontime+tmp_delay);
							// draw tooltip rect
							g.append("rect")
							.attr("x", center_x)
							.attr("y", center_y)
							.attr("width", 200)
							.attr("height", 60)
							.attr("fill", "black")
							.attr("id", "toolbox");
				
							// draw tooltip text line 1	
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+15)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_1")
							.text(function(d){
								return ( "On-time flight: "
								+d3.format(".2s")(tmp_ontime)
								);
							});	
							// draw tooltip text line 2
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+30)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_2")
							.text(function(d){
								return ( "Delay flight: "+d3.format(".2s")(tmp_delay));
							});	
							// draw tooltip text line 2
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+45)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_3")
							.text(function(d){
								return ( "Pr(delay): " +d3.format(".2s")(tmp_pr*100)+"%");
							});
					})
					.on("mouseout", function(){
						// reset color
						d3.select("#toolbox").remove();
						d3.select("#tooltip_text_1").remove();
						d3.select("#tooltip_text_2").remove();
						d3.select("#tooltip_text_3").remove();
						d3.select(this).style("fill", tmp_color);
					});
			
			///////////////////////////////////////
			// line for delay
			var lineGraph2 = g.append("path")
				 .attr("stroke", "red")
                 .attr("stroke-width", 4)
				 .attr("fill", "none")
				 .attr("d", line(delay_data));
			var delay_circles = g.append("g").selectAll('circle')
					.data(delay_data)
					.enter()
					.append("circle")
					.attr("cx", function(d,i) {
						return xScale(i+1);
					})
					.attr("cy", function(d) {
							return yScale(d);
					})
					.attr("r", 10)
					.attr("fill", "red")
					.attr("stroke", "black")
					.on("mouseover", function(d,i){
				
							// save current color and change color
							tmp_color = d3.select(this).style("fill"); 
							d3.select(this).style("fill", "yellow");
				
				
							var center_x = (xScale(i+1)-5);
							var center_y = yScale(d);
							var tmp_ontime = ontime_data[i];
							var tmp_delay = d;
							var tmp_pr = tmp_delay/(tmp_ontime+tmp_delay);
							// draw tooltip rect
							g.append("rect")
							.attr("x", center_x)
							.attr("y", center_y)
							.attr("width", 200)
							.attr("height", 60)
							.attr("fill", "black")
							.attr("id", "toolbox");
				
							// draw tooltip text line 1	
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+15)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_1")
							.text(function(d){
								return ( "On-time flight: "
								+d3.format(".2s")(tmp_ontime)
								);
							});	
							// draw tooltip text line 2
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+30)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_2")
							.text(function(d){
								return ( "Delay flight: "+d3.format(".2s")(tmp_delay));
							});	
							// draw tooltip text line 2
							g.append("text")
							.attr("x", center_x)
							.attr("y", center_y+45)
							.attr("dy", "0.32em")
							.attr("fill", "white")
							.attr('font-size', 16)
							.attr("font-weight", "bold")
							.attr("text-anchor", "start")
							.attr("id", "tooltip_text_3")
							.text(function(d){
								return ( "Pr(delay): " +d3.format(".2s")(tmp_pr*100)+"%");
							});
					})
					.on("mouseout", function(){
						// reset color
						d3.select("#toolbox").remove();
						d3.select("#tooltip_text_1").remove();
						d3.select("#tooltip_text_2").remove();
						d3.select("#tooltip_text_3").remove();
						d3.select(this).style("fill", tmp_color);
					});
			//////////////////////////////
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
			.attr("y", 80)
			.attr("dy", "0.32em")
			.attr("fill", "#000")
			.attr('font-size', 18)
			.attr("font-weight", "bold")
			.attr("text-anchor", "start")
			.text("number of flights");
			
			
			// draw legends
			var legend_data = [];
			for (var i=0;i<=1;i++){
				legend_data.push(i);
			}
			//console.log(legend_data);
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
			.attr("y", function(d, i) { return i * 20+50; })
			.attr("width", 50)
			.attr("height", 20)
			.attr("fill", function(d){
				if(d==0)
				{
					return "blue";
				}
				if(d==1)
				{
					return "red";
				}
		
			})
			.attr("stroke", "black");			
			
			// legend text
			legend.append("text")
			.attr("x", width - 19)
			.attr("y", function(d, i) { return i * 20+10+50; })
			.attr("dy", "0.32em")
			.text(function(d) { 
				if(d==0)
				{
					return("on-time flight");
				}
				if(d==1)
				{
					return("delay flight");
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
			.text("time series of all flights in July (day of week)");
			
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
			.text("day of week in July");

			
	}
	displayPie();
}

function Button()
{
	var button_svg = d3.select("body")
	.append("svg")
	.attr("width", 600)
	.attr("height", 50)
	.attr("id", "button_space");
	var button_date = d3.select("body")
	.append('button')
	.attr("class", "button")
	.attr("id", "button_date");
	document.getElementById("button_date").innerHTML = "Date";
	
	var button_week = d3.select("body")
	.append('button')
	.attr("class", "button")
	.attr("id", "button_week");
	document.getElementById("button_week").innerHTML = "Week";
	document.getElementById("button_date").onclick = function() {
		lineplot_date();
	};
	document.getElementById("button_week").onclick = function() {
		lineplot_week();
	};
}



function displayTimePlot(){
	// remore the current svg first
	reset_TimePlot();
	Button();
	
	if(time_idx==0){
		lineplot_date();
	}
	if(time_idx==1)
	{
		lineplot_week();
	}
	
}