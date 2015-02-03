    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
    function kmeans(data, k) {
        
        // ...
        var randomLineID = 0;
        var kPoints = [];
        var SIZE = data.length;

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

        for(var i = 0; i < SIZE; i++){
        	var currentPoint = data[i];
        	var temp = 10;

        	for(var j = 0; j < k; j++){
        		currentK = kPoints[j];
        		minimumLength = Math.abs((currentPoint.A - currentK.A) + (currentPoint.B - currentK.B) + (currentPoint.C - currentK.C),2);
        		if(minimumLength < temp){
        			temp = minimumLength;
        			clusterID = j;
        		}
        	}

        	currentPointCluster.push(clusterID);
        }

		console.log("Kluster: ");
        console.log(currentPointCluster);

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


        // return array 
    };
    
    