//shit seems to be working for the most part
//next things to do:
//1: fix domain/range scaling cor colors -  note below for this - DONE
//2: right now this is hard coded with a_mean, we need to take inputs based on user selections/even listeners - DONE
//3: dropdown selection also needs event listeners - DONE
//5. tooltip using d3
//5.5 refactor to make this shit cleaner. probably can replace a lot of this code with d3. specific functions
//6. style page up looking real nice - DONE
//ADD a legend and labels
//Make whichever data is currently being displayed more obvious
	//bolden the number in the tooltip and keep the button highlighted/a different color

//7. write up process and goals for the project and add to page
//8: profit...?

var projection = d3.geoAlbersUsa()
                       .translate([1200/2, 800/2])
                       .scale([1500]);
var path = d3.geoPath().projection(projection);
var svg = d3.select("#occupationMap");
var dropdown = d3.select("select");
var color = d3.scaleLog().range(["rgb(239,243,255)", /*"rgb(189,215,231)", "rgb(107,174,214)", "rgb(49,130,189)",*/ "rgb(8,81,156)"]);
var currentJob = [];
var dataType = d3.selectAll("div p");
var dt = "tot_emp";
var min,
	max;
var jsonFeatures;
var paths;
var tooltip = d3.select("#hoverData");
dataType.on("click", function() {
	currentJob = [];
	dt = this.id;
	console.log(dt);
	selectedOccupation();
});
dropdown.on("change", function() {
	currentJob = [];
	selectedOccupation(); } 
	);
function hover(paths) {
	paths.on("mouseenter", function(d) {
	
	tooltip
		.style("display", "block");
	tooltip
		.style("left", function(d) { return (d3.event.clientX+15) + "px"});
	tooltip	
		.style("top", function(d) { return (d3.event.clientY-250) + "px"});
	var thisProp = d.properties;
	tooltip.select("h4").text(thisProp.name);
	tooltip.select("#amean").text("$"+thisProp.aMean);
	tooltip.select("#amedian").text("$"+thisProp.aMedian);
	tooltip.select("#apct90").text("$"+thisProp.aPct90);
	tooltip.select("#apct10").text("$"+thisProp.aPct10);
	tooltip.select("#hmean").text("$"+thisProp.hMean);
	tooltip.select("#hmedian").text("$"+thisProp.hMedian);
	tooltip.select("#hpct90").text("$"+thisProp.hPct90);
	tooltip.select("#hpct10").text("$"+thisProp.hPct10);
	tooltip.select("#total").text(thisProp.tot);

			});

paths.on("mouseleave", function(d) {
	tooltip
		.style("display", "none");
})
}
//create a function for hovering over the paths to display the information for the current occupation
//move functions out of the original map creation function for changing between mean, median, 10th, and 90th pct
//rework recoloring functions for above mentioned stats to rely on data attributes placed in the node
//next add the legend. 
//next read into scales

//creates all options in the dropdown - only needs to be run once.
var jobs = d3.csv("../javascripts/occupations.csv", 
	function(d) {return d}, 
	function(data) {
		var occupations = 
			dropdown.selectAll("option")
					.data(data)
					.enter()
					.append("option")
					.attr("name", function(data){
						return data["job"];})
					.attr("id", function(data){
						return data["job"];})
					.text(function(data){
						return data["job"]});
});
//runs through all the data for every occupation and state
function selectedOccupation() {
	d3.csv("../javascripts/occupationsData.csv", 
	//ensures all numbers are numbers and not strings
	function(d) {	
		d.a_mean = +d.a_mean;
		d.a_median = +d.a_median;
		d.a_pct10 = +d.a_pct10;
		d.a_pct90 = +d.a_pct90;
		d.area_type = +d.area_type;
		d.emp_prse = +d.emp_prse;
		d.h_mean = +d.h_mean;
		d.h_median = +d.h_median;
		d.h_pct10 = +d.h_pct10;
		d.h_pct90 = +d.h_pct90;
		d.tot_emp = +d.tot_emp;
		return d; }, 
	//runs through the new 'good' data, object by object 
	//1. defines and runs currentJobArray function to populate the currentJob array with the data from the selected job
	//2. defines color.domain based on the newly made array's min and max
	//3. defines and runs applyColors function which runs through the new array
	//3.2 and applies color based on state id and value of selected data
	function(data) {
		currentJob = [];
		var occupationsData;
		occupationsData = data;
		function currentJobArray(data) {
			for (var i=0; i < data.length; i++) {
				var jobSelected = document.getElementById("occupation").value;
				if (data[i]["occupation"] === jobSelected) {
					currentJob.push(data[i]);
				}
			}
		}

		currentJobArray(data);	
		min = d3.min(currentJob, function(d){if(isNaN(d[dt]) === false) {return d[dt];}});
		max = d3.max(currentJob, function(d){if(isNaN(d[dt]) === false) {return d[dt];}});
		color.domain([ min, max ]);
	
		d3.json("../javascripts/US_States.json", function(json){
			//using GeoJSON we now create the map of the US, creating a path element for each Polygon object as per D3Geo docs
			
			jsonFeatures = json.features;
			jsonFeatures.forEach(function(item, index, array) {
				var thisId = "A" + item.id;
				item.properties.value = "";	
				for (var i=0; i<currentJob.length; i++){
					if (thisId === currentJob[i].area) {
						item.properties.aMean = currentJob[i]["a_mean"];
						item.properties.aMedian = currentJob[i]["a_median"];
						item.properties.aPct90 = currentJob[i]["a_pct90"];
						item.properties.aPct10 = currentJob[i]["a_pct10"];
						item.properties.area = currentJob[i]["area"];
						item.properties.hMean = currentJob[i]["h_mean"];
						item.properties.hMedian = currentJob[i]["h_median"];
						item.properties.hPct90 = currentJob[i]["h_pct90"];
						item.properties.hPct10 = currentJob[i]["h_pct10"];
						item.properties.tot = currentJob[i]["tot_emp"];
						item.properties.value = currentJob[i][dt];
					}
				}
			});
			
			var statePaths = svg.selectAll("path")
								.data(json.features)
								.enter()
								.append("path")
								.attr("d", path)
								.attr("id", function(json){
								 						return "A" + json["id"];
								 					})
								.attr("data-amean", function(json) {
									return json.properties.aMean;
								})
								.attr("data-amedian", function(json) {
									return json.properties.aMedian;
								})
								.attr("data-hmean", function(json) {
									return json.properties.hMean;
								})
								.attr("data-hmedian", function(json) {
									return json.properties.hMedian;
								})
								.attr("data-apct90", function(json) {
									return json.properties.aPct90;
								})
								.attr("data-apct10", function(json) {
									return json.properties.aPct10;
								})
								.attr("data-hpct90", function(json) {
									return json.properties.hPct90;
								})
								.attr("data-hpct10", function(json) {
									return json.properties.hPct10;
								})
								.attr("data-state", function(json) {
									return json.properties.name;
								})
								.attr("data-total", function(json) {
									return json.properties.tot;
								})
								.style("stroke", "black");

			svg.selectAll("path")
				.style("fill", "")
				.style("fill", function(json) {
					
					var thisValue = json.properties.value;
					if(thisValue != "") {
						return color(thisValue);
					} else {
						return "black";
					}
				});
				
			paths = svg.selectAll("path");
			hover(paths);
		});

	});
};

selectedOccupation();