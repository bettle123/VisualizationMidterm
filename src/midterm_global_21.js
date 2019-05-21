var map_width = 1500;
var map_height = 550;

var airplane_width = 200;
var airplane_height = 150;

var table_width = 1000;
var table_height = 150;

var barplot_width = 600;
var barplot_height = 300;

var signal_width = 300;
var signal_height = 300;


/////////////////////////////////////////////////////////////////////
// variable for barplot1 and barplot2

var dep_delay_pr;
var dep_delay_time;
var dep_delay_times;

var arr_delay_pr;
var arr_delay_time;
var arr_delay_times;

var air_time;
var distance;

var total_flight;



var table_columns = [
		"air_time", "distance","number_of_flight",
		"depart_airport", "depart_delay_Pr", "depart_delay_time",
		"arrival_airport", "arrival_delay_Pr", "arrival_delay_time"
		];

var table_data;
///////////////////////////////////////////////////////////////////

var time_idx = 0;


		
function DisplayAll()
{

	displayTable();
	displayMap();
	displayBarplot1();
	displayBarplot2();
	displayBarplot_DepPr();
	displayBarplot_ArrPr();
	displayBarplot_Columbus();
	displayTimePlot();
	displayPie();
	
}

function reset()
{
	d3.select("#mapPlot").remove();
}

function reset_barplot1()
{
	d3.select("#barPlot1").remove();
}

function reset_barplot2()
{
	d3.select("#barPlot2").remove();
}

function reset_barplot_DepPr()
{
	d3.select("#barPlotDepPr").remove();
}

function reset_barplot_ArrPr()
{
	d3.select("#barPlotArrPr").remove();
}

function reset_barplot_Columbus()
{
	d3.select("#barPlotColumbus").remove();
}

function reset_TimePlot()
{
	d3.select("#timePlot").remove();
	d3.select("#button_date").remove();
	d3.select("#button_week").remove();
	d3.select("#button_space").remove();
}

function reset_Pie()
{
	d3.select("#pie").remove();
}




function reset_table()
{
	d3.select("#table").remove();
	d3.select("#tablesvg").remove();
	table_data = 
	[{
	air_time: air_time, distance: distance, number_of_flight: total_flight,
	depart_airport: selectedDepAirportID, depart_delay_Pr: dep_delay_pr, depart_delay_time: dep_delay_time,
	arrival_airport: selectedArrAirportID, arrival_delay_Pr: arr_delay_pr , arrival_delay_time: arr_delay_time
	}];
}