
function SummaryTable(){

tabulate(table_columns, table_data);

function tabulate(columnNames, data) {
				
				// signal picture for user
				var svg = d3.select('body')
					.append("svg")
					.attr("width", table_width+signal_width)
					.attr("height", table_height)
					.attr("id", "tablesvg");
				
				if(total_flight==0)
				{
					var imgs = svg.append('image')
					.attr("xlink:href","no_flight.png")
					.attr("width", table_width)
					.attr("height", 0)
					.attr("x", 0)
					.attr("y", 0)
					.transition()
					.attr("width", table_width)
					.attr("height", signal_height)
					.duration(3000);	
				}
				if(total_flight!=0)
				{
					var imgs = svg.append('image')
					.attr("xlink:href","yes_flight.png")
					.attr("width", table_width)
					.attr("height", 0)
					.attr("x", 0)
					.attr("y", 0)
					.transition()
					.attr("width", table_width)
					.attr("height", signal_height)
					.duration(3000);
				}
				
				
				
				
				
				var table = d3.select('body')
				.append('table')
				.attr("width", table_width)
				.attr("height",table_height)
				.attr("id", "table");
				var thead = table.append('thead');
				var	tbody = table.append('tbody');
				
				
				
				// append the header row
				thead.append('tr')
				  .selectAll('th')
				  .data(columnNames)
				  .enter()
				  .append('th')
				  .text(function (d) {
					if(d=="air_time")
					{
						return("Air time");
					}
					if(d=="number_of_flight")
					{
						return("number of flight");
					}
					if(d=="depart_airport")
					{
						return("depart airport");
					}
					if(d=="depart_delay_Pr")
					{
						return("Probability of departure delay");
					}
					if(d=="depart_delay_time")
					{
						return("Average departure delay time");
					}
					if(d=="arrival_airport")
					{
						return("arrival airport");
					}
					if(d=="arrival_delay_Pr")
					{
						return("Probability of arrival delay");
					}
					if(d=="arrival_delay_time")
					{
						return("Average arrival delay time");
					}
				  	return d;					
				  });

				// create a row for each object in the data
				var rows = tbody.selectAll('tr')
				  .data(data)
				  .enter()
				  .append('tr');
				// create a cell in each row for each column
				var cells = rows.selectAll('td')
				  .data(function (row) {
				    return columnNames.map(function (columnName) {
				      return {
				      	key: columnName, 
				      	value: row[columnName]
				      };
				    });
				  })
				  .enter()
				  .append('td')
				  .text(function (d) { 
					if(d.key=="air_time")
					{
						if(d.value==0)
						{
							return ("N/A");
						}
						return(d3.format("0.3s")(d.value)+" mins");
					}
					
					if(d.key=="distance")
					{
						if(d.value==0)
						{
							return ("N/A");
						}
						return(d3.format("0.4s")(d.value)+" miles");
					}
					if(d.key=="number_of_flight")
					{
						if(d.value==0)
						{
							return ("N/A");
						}
					}
					
					if(d.key=="depart_delay_Pr")
					{
						return(d3.format("0.2s")(d.value*100)+" %");
					}
					if(d.key=="depart_delay_time")
					{
						return(d3.format("0.3s")(d.value)+" mins");
					}
					if(d.key=="arrival_delay_Pr")
					{
						return(d3.format("0.2s")(d.value*100)+" %");
					}
					if(d.key=="arrival_delay_time")
					{
						return(d3.format("0.3s")(d.value)+" mins");
					}
				  	return d.value; 
				  });
				 
				////////////////////////////////////////////
				
				
				
				
			  return table;
			}	
}

function displayTable(){
	// remore the current svg first
	reset_table();
	SummaryTable();	
}