var _DATA_FORMAT_PE = 0;
var _DATA_FORMAT_TIM = 1;
var _DATA_FORMAT_UID = 2;
var _DATA_FORMAT_MAC = 3;
var _DATA_FORMAT_SL = 4;
var _DATA_FORMAT_CH = 5;
var _DATA_FORMAT_IOTYPE = 6;
var _DATA_FORMAT_VAL = 7;
self.addEventListener('message', function(e) {
    //console.log("Called back by the worker!\n");
	var cmd = e.data;
	if(cmd.command == 'parseJson'){
		self.postMessage({command:cmd.command, data:json2Array(cmd.data)});
	}
	else if(cmd.command == 'parseSysJson'){
		self.postMessage({command:cmd.command, data:sysJson2Array(cmd.data)});
	}
	else if(cmd.command == 'initial'){
		self.postMessage({command:cmd.command, data:raw2FilterSlotAndIOType(cmd.data.raw, cmd.data.slot)});
	}
	else if(cmd.command == 'initialSys'){
		self.postMessage({command:cmd.command, data:raw2FilterSystemData(cmd.data.raw, cmd.data.slot)});
	}
	else if(cmd.command == 'update'){
		self.postMessage({command:cmd.command, data:raw2UpdateChart(cmd.data.raw, cmd.data.slot, cmd.data.ioType)});
	}
	else if(cmd.command == 'appendDataToDbTable'){
		self.postMessage({command:cmd.command, data:appendDataToDbTable(cmd.data.$tb, cmd.data.raw)});
	}
	//self.postMessage(e.data);
}, false);

var filterSlot = function(rawData, slot){
    var temp = rawData.filter(function(obj){
    	return obj[_DATA_FORMAT_SL] == slot;
    });
    return temp;
};
var filterIOType = function(rawData, ioType){
    var temp = rawData.filter(function(obj){
    	return obj[_DATA_FORMAT_IOTYPE] == ioType;
    });
    return temp;
};
var appendDataToDbTable = function($tb, rawData){
	var tempTb = JSON.parse($tb);
	tempTb.rows.add(rawData);
    return {$tb:tempTb, raw:rawData};
};
var raw2UpdateChart = function(rawData, slot, ioType){
    var logTypeStatistic = {};
    var logTrendDatas = {};
    var slotArray = filterSlot(rawData, slot);
    var ioTypeArray = filterIOType(slotArray, ioType);
    var len = ioTypeArray.length;
    for (var i = 0; i < len; ++i) {
    	if(ioTypeArray[i] != undefined){
    		var pe = ioTypeArray[i][_DATA_FORMAT_PE];
    		var io = ioTypeArray[i][_DATA_FORMAT_IOTYPE];
	       	if(logTypeStatistic[pe] == undefined){
	       		logTypeStatistic[pe] = 1;
		    }
		    else{
		    	logTypeStatistic[pe]++;
		    }
		    if(io != 11/*AI Flag*/ && io != 17/*AO Flag*/ && io != 0){
		    	var trendData = {_x:ioTypeArray[i][_DATA_FORMAT_TIM], _y:ioTypeArray[i][_DATA_FORMAT_VAL], logType:pe};
			    if(logTrendDatas[ioTypeArray[i][_DATA_FORMAT_CH]] == undefined){
			    	logTrendDatas[ioTypeArray[i][_DATA_FORMAT_CH]] = [trendData];
			    }
			    else{
			    	logTrendDatas[ioTypeArray[i][_DATA_FORMAT_CH]].push(trendData);
			    }
		    }
    	}
    }
    return {logTypeObj:logTypeStatistic, trendObj:logTrendDatas};
};
var raw2FilterSlotAndIOType = function(rawData, slot){
    var defaultIOType = -1;
	var ioTypeStatistic = {};
    var logTypeStatistic = {};
    var logTrendDatas = {};
    var slotArray = filterSlot(rawData, slot);
    var len = slotArray.length;
    for (var i = 0; i < len; ++i) {
    	if(slotArray[i] != undefined){
    		var pe = slotArray[i][_DATA_FORMAT_PE];
    		var io = slotArray[i][_DATA_FORMAT_IOTYPE];
    		if( defaultIOType == -1){
		       	defaultIOType = io;
		    }
		    if(ioTypeStatistic[io] == undefined){
		    	ioTypeStatistic[io] = 1;
		    }
		    else{
		    	ioTypeStatistic[io]++;
		    }
		    if(defaultIOType == io){
		     	if(logTypeStatistic[pe] == undefined){
		     		logTypeStatistic[pe] = 1;
			    }
			    else{
			    	logTypeStatistic[pe]++;
			    }
			    if(defaultIOType != 11/*AI Flag*/ & defaultIOType!= 17/*AO Flag*/ & defaultIOType!= 0/*AO Status*/){
			    	var trendData = {_x:slotArray[i][_DATA_FORMAT_TIM], _y:slotArray[i][_DATA_FORMAT_VAL], logType:pe};
			    	var ch = slotArray[i][_DATA_FORMAT_CH];
				   	if(logTrendDatas[ch] == undefined){
				   		logTrendDatas[ch] = [trendData];
				   	}
				   	else{
				   		logTrendDatas[ch].push(trendData);
				   	}
			   	}
			}
	     //   	if(logTypeStatistic[pe] == undefined){
	     //   		logTypeStatistic[pe] = 1;
		    // }
		    // else{
		    // 	logTypeStatistic[pe]++;
		    // }
		    // if(io != 11/*AI Flag*/ && io != 17/*AO Flag*/ && io != 0){
		    // 	var trendData = {_x:slotArray[i][_DATA_FORMAT_TIM], _y:slotArray[i][_DATA_FORMAT_VAL], logType:slotArray[i][_DATA_FORMAT_PE]};
			   //  if(logTrendDatas[slotArray[i][_DATA_FORMAT_CH]] == undefined){
			   //  	logTrendDatas[slotArray[i][_DATA_FORMAT_CH]] = [trendData];
			   //  }
			   //  else{
			   //  	logTrendDatas[slotArray[i][_DATA_FORMAT_CH]].push(trendData);
			   //  }
		    // }
    	}
    }
    return {ioTypeObj:ioTypeStatistic, logTypeObj:logTypeStatistic, trendObj:logTrendDatas};
};

var raw2FilterSystemData = function(rawData, slot){
    var defaultIOType = -1;
	var sysTypeStatistic = {};
    var eventTypeStatistic = {};
    var eventTrendDatas = {};
    var slotArray = rawData;
    var len = slotArray.length;
    var timeData = {};
    for (var i = 0; i < len; ++i) {
    		var pe = slotArray[i][_DATA_FORMAT_PE];
		    if(sysTypeStatistic[pe] == undefined){
		    	sysTypeStatistic[pe] = 1;
		    }
		    else{
		    	sysTypeStatistic[pe]++;
		    }
	     	if(eventTypeStatistic[pe] == undefined){
	     		eventTypeStatistic[pe] = 1;
		    }
		    else{
		    	eventTypeStatistic[pe]++;
		    }

	    	var pe = slotArray[i][_DATA_FORMAT_PE];
	    	var tim = slotArray[i][_DATA_FORMAT_TIM];
	    	if(timeData[pe] == undefined){
	    		timeData[pe] = {};
	    		timeData[pe][tim] = 1;
	    	}else{
	    		if(timeData[pe][tim] == undefined)
	    			timeData[pe][tim] = 1;
	    		else
					timeData[pe][tim]++;
	    	}
    }
    for(var pe in timeData) {
    	for(var tim in timeData[pe]) {
    		var trendData = {_x:tim, _y:timeData[pe][tim], logType:pe};
    		if(eventTrendDatas[pe] == undefined)
    			eventTrendDatas[pe] = [trendData];
    		else
				eventTrendDatas[pe].push(trendData);
		}
    }
    return {ioTypeObj:sysTypeStatistic, logTypeObj:eventTypeStatistic, trendObj:eventTrendDatas};
};

var json2Array = function(jsonObj){
	var _DATA_ARRAY_SL = 0;
	var _DATA_ARRAY_CH = 1;
	var _DATA_ARRAY_IOTYPE = 2;
	var _DATA_ARRAY_VAL = 3;
	var logDataToObj = function(pe, tim, uid, mac, data) {
	    return {
	    	pe: pe,
	        tim: tim,
	        uid: uid,
	        mac: mac,
	        slot: data[_DATA_ARRAY_SL],
	        channel: data[_DATA_ARRAY_CH],
	        ioType: data[_DATA_ARRAY_IOTYPE],
	        value: data[_DATA_ARRAY_VAL]}
	};

	var defaultIOType = -1;
	var rawDataArray = [];
	var ioTypeStatistic = {};
	var slotStatatistic = {};
	var logTypeStatistic = {};
	var logTrendDatas = {};
	var logMsg = jsonObj["LogMsg"];
	var logMsgLen = logMsg.length;

    for (var i = 0; i < logMsgLen; ++i) {
        var pe = logMsg[i].PE;
        var tim = logMsg[i].TIM || "****";
        var uid = logMsg[i].UID || "****";
        var mac = logMsg[i].MAC || "****";

        var recordArray = logMsg[i].Record;
        for (var j = 0; j < recordArray.length; ++j) {
        	// var peMask = pe;
        	// for(var k = 0; k < 8; ++k){
        		// var bit = peMask & 0x01;
        		// peMask = peMask  >> 1;
        		// if(bit == 1){
        			// var recoredPE = Math.pow(2, k);
        			// var logObj = logDataToObj(parseInt(recoredPE, 10), tim, uid, mac, recordArray[j]);
        			var logObj = logDataToObj(pe, tim, uid, mac, recordArray[j]); // do not dismantle PE 192 to 128 and 64
		        	if(slotStatatistic[logObj["slot"]] == undefined){
		        		slotStatatistic[logObj["slot"]] = 1;
		        	}
		            var data = [logObj["pe"],logObj["tim"],logObj["uid"],logObj["mac"],logObj["slot"],logObj["channel"],logObj["ioType"], logObj["value"]];
		            rawDataArray.push(data);
        		// }
        		// if(peMask == 0){
        		// 	break;
        		// }
        	// }
        }
    }
    var slotArray = [];
    for(var prop in slotStatatistic){
    	slotArray.push(prop);
    }
    slotArray.sort();
    return {raw:rawDataArray, slotArray:slotArray};//ioTypeObj:ioTypeStatistic, logTypeObj:logTypeStatistic, trendObj:logTrendDatas};
};

var sysJson2Array = function(jsonObj){
	var logDataToObj = function(pe, tim, uid, mac, record) {
	    return {
	    	pe: pe,
	        tim: tim,
	        uid: uid,
	        mac: mac,
	        record: record}
	};

	var defaultIOType = -1;
	var rawDataArray = [];
	var ioTypeStatistic = {};
	var slotStatatistic = {};
	var logTypeStatistic = {};
	var logTrendDatas = {};
	var logMsg = jsonObj["LogMsg"];
	var logMsgLen = logMsg.length;

    for (var i = 0; i < logMsgLen; ++i) {
        var pe = logMsg[i].PE;
        var tim = logMsg[i].TIM || "****";
        var uid = logMsg[i].UID || "****";
        var mac = logMsg[i].MAC || "****";
        var record = logMsg[i].Record || "****";

        var logObj = logDataToObj(pe, tim, uid, mac, record);
        var data = [logObj["pe"],logObj["tim"],logObj["uid"],logObj["mac"],logObj["record"]];
		rawDataArray.push(data);
    }
    return {raw:rawDataArray};
};