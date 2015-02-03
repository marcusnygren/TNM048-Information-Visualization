    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
    function kmeans(data, k) {
        
    	var newClusterQuality = 0;
    	var oldClusterQuality = 1000;
    	var isFirstRun = true;

    	while(newClusterQuality < oldClusterQuality) {
    		
    		if(isFirstRun){
    			isFirstRun = false;
    		}else{
    			oldClusterQuality = newClusterQuality;	
    		}		

	        // ...
	        var randomLineID = 0;
	        var kPoints = [];
	        var SIZE = data.length;
	        var DIMENSIONS = Object.keys(data[0]).length;

	        // Step 1: Randomly place K points into the space
	        for(var i=0; i<k; i++) {
	        	randomLineID = Math.floor(Math.random() * SIZE);
				kPoints.push(data[randomLineID]);
	        }

	        console.log("Centerpunkter:");
	        console.log(kPoints);

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
	        	var temp = 10;
	        	tempArray1=convertTo1DArray(currentPoint);
	        	console.log("Hej: ");
	        	
	        


	        	var temp = Object.keys(currentPoint);
	        	console.log(temp[1]);


	        	for(var j = 0; j < k; j++){
	        		currentK = kPoints[j];
	        		tempArray2=convertTo1DArray(currentK);
	        		minimumLength = 0;
	        		for(var m = 0; m < DIMENSIONS; m++){
	        			//var indexOf = Object.keys(currentPoint)[m];
	        			minimumLength += Math.pow(tempArray1[m] - tempArray2[m],2);
	        			//minimumLength += tempArray1[m];
	        		}
	        		minimumLength = Math.sqrt(minimumLength);
	        		console.log(minimumLength);
	        		//minimumLength = Math.abs((currentPoint.A - currentK.A) + (currentPoint.B - currentK.B) + (currentPoint.C - currentK.C));
	        		if(minimumLength < temp){
	        			temp = minimumLength;
	        			clusterID = j;
	        		}
	        	}
	        	tempArray1 = [];

	        	currentPointCluster.push(clusterID);
	        }

			//console.log("Kluster: ");
	        //console.log(currentPointCluster);

	        // Steo 3
	        var meanA, meanB, meanC, counter;

	        for(var i = 0; i < k; i++){
	        	meanA = 0;
	        	meanB = 0;
	        	meanC = 0;
	        	counter = 0;
	        	for(var j = 0; j < SIZE; j++){
	        		if(currentPointCluster[j] == i){
	        			meanA += parseFloat(data[j].A);
	        			meanB += parseFloat(data[j].B);
	        			meanC += parseFloat(data[j].C);
	        			counter++;
	        		}
	        	}

	        	meanA = meanA/counter;
	        	meanB = meanB/counter;
	        	meanC = meanC/counter;

	        	//console.log(meanA);

	        	//console.log("ID " + i + ": " + kPoints[i].A);

	        	kPoints[i].A = meanA;
	        	kPoints[i].B = meanB;
	        	kPoints[i].C = meanC;

	        	//console.log("A: " + kPoints[i].A + " B: " + kPoints[i].B + " C: " + kPoints[i].C);
	        }

	        // Step 4

	        newClusterQuality = 0;

	        for(var i = 0; i < k; i++){
	        	for(var j = 0; j < SIZE; j++){
	        		if(currentPointCluster[j] == i){
	        			newClusterQuality += Math.pow(
		        				Math.abs(
		        					(data[j].A - kPoints[i].A) + 
		        					(data[j].B - kPoints[i].B) + 
		        					(data[j].C - kPoints[i].C)),
	        				2);

	        		}
	        	}
	        }

	        //console.log(newClusterQuality);

	        //console.log("Current point cluster");
	        //console.log(currentPointCluster);
	        
	        return currentPointCluster;

	    }
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
