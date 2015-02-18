    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
    function kmeans(data, k) {
        
    	var newClusterQuality = 0;
    	var oldClusterQuality = 10000000000000;
    	var isFirstRun = true;

    	while(newClusterQuality < oldClusterQuality) {
    		
    		// ...
	        
	        var SIZE = data.length;
	        var DIMENSIONS = Object.keys(data[0]).length;

    		if(isFirstRun)
    		{
    			// Step 1: Randomly place K points into the space
    			var randomLineID = 0;
	        	var kPoints = [];

		        for(var i=0; i<k; i++) {
		        	randomLineID = Math.floor(Math.random() * SIZE);
					kPoints.push(data[randomLineID]);
		        }
    			isFirstRun = false;
    		}
    		else
    		{
    			oldClusterQuality = newClusterQuality;
    		}  

	        //console.log("Centerpunkter:");
	        //console.log(kPoints);

	        // Step 2:
	        var currentK;
	        var minimumLength;
	        var clusterID = 0;
	        var currentPointCluster = [];
	        var clusterAverages = [];
			var tempArray1 = [];
			var tempArray2 = [];
	        for(var i = 0; i < SIZE; i++){
	        	var currentPoint = data[i];
	        	var temp = 10000;
	        	tempArray1 = convertTo1DArray(currentPoint);
	        
	        	for(var j = 0; j < k; j++){
	        		currentK = kPoints[j];
	        		tempArray2=convertTo1DArray(currentK);
	        		minimumLength = 0;
	        		for(var m = 0; m < DIMENSIONS; m++){
	        			minimumLength += Math.pow(tempArray1[m] - tempArray2[m],2);
	        		}
	        		minimumLength = Math.sqrt(minimumLength);
	        		if(minimumLength < temp){
	        			temp = minimumLength;
	        			clusterID = j;
	        		}
	        	}
	        	tempArray1 = [];
	        	tempArray2 = [];

	        	currentPointCluster.push(clusterID);
	        }

	        // Step 3
	        var means = [];
	        var counter;

	        for(var i = 0; i < k; i++) //k-punkterna loopas igenom
	        { 
	        	
	        	for(var j = 0; j < DIMENSIONS; j++) //antalet dimensioner loopas igenom
	        	{ 
	        		temp = 0;
	        		counter = 0;

	        		for(var m = 0; m < SIZE; m++) //antalet värden per dimension gås igenom
	        		{ 
	        			currentPoint = data[m];
	        			tempArray1 = convertTo1DArray(currentPoint);

	        			if(currentPointCluster[m] == i)
	        			{
	        				//console.log(tempArray1[j]);
	        				temp += tempArray1[j];
	        				counter++;
	        			}
	        		}
	        		means.push(temp/counter);
	        		//console.log("kPoints");
	        		
	        		//console.log(means);

	        		
	        		//console.log(kPoints[i]);

	        		//means = [];
	        	}
	        	kPoints[i] = means;
	        	means = [];
	        	tempArray1 = [];
	        	//console.log("Means: " + means);
	        }

	        // Step 4
	        newClusterQuality = 0;

	        for(var i = 0; i < k; i++){
	        	currentK = kPoints[i];
	        	tempArray2 = convertTo1DArray(currentK);

	        	for(var j = 0; j < DIMENSIONS; j++){

	        		for(var m = 0; m < SIZE; m++){
	        			currentPoint = data[m];
	        			tempArray1 = convertTo1DArray(currentPoint);
	        			//console.log(tempArray1);

	        			if(currentPointCluster[m] == i){
	        				//console.log(tempArray2[j]);
	        				//console.log(tempArray1[j]);
	        				newClusterQuality += Math.pow(tempArray1[j] - tempArray2[j],2);
	        			}
	        		}
	        	}
	        	tempArray1 = [];
	        	tempArray2 = [];
	        }

	        //console.log(newClusterQuality); //varför slutar alltid newClusterQuality på samma värde?
	        //console.log(oldClusterQuality);
	    }
	        
	    return currentPointCluster;
	};

	function convertTo1DArray(data){
		var tempArray = [];
		for(var value in data){
	    	tempArray.push(parseFloat(data[value]));	        		        
	    }
	    return tempArray;
	};
    
	function convertTo2DArray(data){
		var tempArray1 = [];
		for(var row in data){
			var tempArray2 = [];
			for(var column in data){
	    		tempArray2.push(parseFloat(data[value]));	        	
	    	}
	    	tempArray1.push(tempArray2);	        	
	    }
	    return tempArray1;
	};
