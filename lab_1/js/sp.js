function sp(){

    var self = this; // for internal d3 functions

    var spDiv = $("#sp");

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = spDiv.width() - margin.right - margin.left,
        height = spDiv.height() - margin.top - margin.bottom;

    //initialize color scale
    //...
    
    //initialize tooltip
    //...

    var svg = d3.select("#sp").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Load data
    var xScale = d3.scale.linear();
    var yScale = d3.scale.linear();
    var rScale = d3.scale.linear();

    var xScaleName = "Household income";
    var yScaleName = "Employment rate";
    
    d3.csv("data/OECD-better-life-index-hi.csv", function(error, data) {
        self.data = data;
        
        //define the domain of the scatter plot axes
        //...
        var xMin = d3.min(self.data, function(d) { return d[xScaleName]; });
        var xMax = d3.max(self.data, function(d) { return d[xScaleName]; });

        var yMin = d3.min(self.data, function(d) { return d[yScaleName]; });
        var yMax = d3.max(self.data, function(d) { return d[yScaleName]; });

        xScale.domain([xMin, xMax]).range([0, width]);
        yScale.domain([yMin, yMax]).range([height, 0]);

        rScale.domain([0, d3.max(self.data, function(d) { return d[yScaleName]; })]).range([2, 5]);

        draw();

        console.log(data);

    })

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
        
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    function draw()
    {
        
        // Add x axis and title.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 6)
            .text(xScaleName);
            
        // Add y axis and title.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
        
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(yScaleName);
            
        // Add the scatter dots.
        svg.selectAll(".dot")
            .data(self.data)
            .enter().append("circle")
            .attr("class", "dot")
            //Define the x and y coordinate data values for the dots
            .attr("cx", function(d){
                return xScale(d["Household income"]);
            })
            .attr("cy", function(d){
                return yScale(d["Employment rate"]);
            })
            .attr("r", function(d) {
                return rScale(d["Employment rate"]);
            })
            //tooltip
            .on("mousemove", function(d) {
                //...    
            })
            .on("mouseout", function(d) {
                //...   
            })
            .on("click",  function(d) {
                //...    
            });
    }

    //method for selecting the dot from other components
    this.selectDot = function(value){
        //...
    };
    
    //method for selecting features of other components
    function selFeature(value){
        //...
    }

}




