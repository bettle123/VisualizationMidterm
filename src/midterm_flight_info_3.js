/*
Author: Su, Ming Yi
Date: 11/06/2018
Goal: Given the dep_airportID, arr_airportID,
	Change the value of global variable as follows.
	
air_time,
distance,
total_flight,
	
dep_delay_pr,
dep_delay_time,
dep_delay_times,

arr_delay_pr,
arr_delay_time,
arr_delay_times


*/

function FlightInfo()
{
	d3.csv("summary_table.csv", function(data)
	{
		var check = 0;
		data = data.filter(function(d){
			if((d.DEP==selectedDepAirportID) &&(d.ARR==selectedArrAirportID))
			{
				air_time = d.AIR_TIME;
				distance = d.DISTANCE;
				total_flight = d.total_flight;
	
				dep_delay_pr = d.DEP_Pr;
				dep_delay_time = d.DEP_delay_time;
				dep_delay_times = d.DEP_delay_times;

				arr_delay_pr = d.ARR_Pr;
				arr_delay_time = d.ARR_delay_time;
				arr_delay_times = d.ARR_delay_times;
						
				check = 1;
						
				return d;
			}
		});
		if(check ==0)
		{
			air_time = 0;
			distance = 0;
			total_flight = 0;
	
			dep_delay_pr = 0;
			dep_delay_time = 0;
			dep_delay_times = 0;

			arr_delay_pr = 0;
			arr_delay_time = 0;
			arr_delay_times = 0;
		}
		DisplayAll();
	});
}