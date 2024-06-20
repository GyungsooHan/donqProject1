let finalData = {};
let dataArray = [];
let workingData = {};

$(document).ready(function() {
            
            
            
            //layer1
         function parseImperatorRomeSave_layer1(fileContents) {
            const lines = fileContents.split('\n');
            let type = "";
            let bracket = "";
  			  let bracketLevel = 0;
  			  let isRecording = 0;
  			  let currentKey = '';
  			  let record_line = [];
  			  
            for (let line of lines) {		
                line = line.trim(); 
                bracketLevel = bracketChecker(line,bracketLevel);
                if (line.includes('=')) {
                   type = "value_assign";
                }
              if(line.includes('{')){
					bracket = "open";
				}else if(line.includes('}')){
					bracket = "close"
				}else{
					bracket = "none";
				} 
				if(type=="value_assign"&&bracket=="open"&&bracketLevel==1){
					const keyValue = line.split('=');
					const key = keyValue[0];
	              //finalData[key] = {};  
	              currentKey = key;
	              isRecording = 1;
				}
				if(isRecording ==1){
					record_line.push(line); 
				}
				if(bracketLevel==1 && bracket=="close"){
					isRecording==0;
					finalData[currentKey] = record_line;
					record_line = [];
				}
				
				
				if (type=="value_assign"&& bracket=="none" && bracketLevel==0) {
                    const keyValue = line.split('=');
                    const key = keyValue[0];
                    let value = keyValue[1]; 
	                 finalData[key] = value;  
                }
            }


        }
        
        //multi_layer
         function parseImperatorRomeSave_layer2(fileContents) {
            const lines = fileContents;
            let type = "";
            let bracket = "";
  			  let bracketLevel = 0;
  			  let isRecording = 0;
  			  let currentKey = '';
  			  let record_line = [];
  			  let resultData={};
  			  
            for (let line of lines) {		
                line = line.trim(); 
                bracketLevel = bracketChecker(line,bracketLevel);
                if (line.includes('=')) {
                   type = "value_assign";
                }
              if(line.includes('{')){
					bracket = "open";
				}else if(line.includes('}')){
					bracket = "close"
				}else{
					bracket = "none";
				} 
				if(type=="value_assign"&&bracket=="open"&&bracketLevel==1){
					const keyValue = line.split('=');
					const key = keyValue[0];
	              //finalData[key] = {};  
	              currentKey = key;
	              isRecording = 1;
				}
				if(isRecording ==1){
					record_line.push(line); 
				}
				if(bracketLevel==1 && bracket=="close"){
					isRecording==0;
					resultData[currentKey] = record_line;
					record_line = [];
				}	
				if (type=="value_assign"&& bracket=="none" && bracketLevel==0) {
                    const keyValue = line.split('=');
                    const key = keyValue[0];
                    let value = keyValue[1]; 
	                 resultData[key] = value;  
                }
            }
				return resultData;

        }

            
            
	function bracketChecker(line,currentBraceCount){
				let openingBraceCount = 0;
				let closingBraceCount = 0;
				
				for (let i = 0; i < line.length; i++) {
				    if (line[i] === '{') {
				        openingBraceCount++;
				    } else if (line[i] === '}') {
				        closingBraceCount++;
				    }
				}	
				currentBraceCount= openingBraceCount-closingBraceCount+currentBraceCount;
				return  currentBraceCount;
			}
	
			
 $('#fileInput').on('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const fileContents = e.target.result;
                        
                        parseImperatorRomeSave_layer1(fileContents);
                       // console.log(finalData.armies);
                        let result_data = parseImperatorRomeSave_layer2(finalData.armies);
                         result_data = parseImperatorRomeSave_layer2(result_data.units_database);
                         result_data = parseImperatorRomeSave_layer2(result_data[402654125]);
							console.log(result_data);
							//console.log(finalData);
							//htmlAppender(finalData);
							
                    };
                    reader.readAsText(file);
                }
            });
        });
        
        
      function htmlAppender(finalData) {
		  $('#cardContainer').empty();
		  
		  let showKey = ['version','date']
		  
		  for (let key in finalData) {
			  			if(showKey.includes(key)){
							  $('#cardContainer').append('<p>' + key+ " : " + finalData[key] + '</p>'); 
						  }
						  
				} 
				
				 const dataTable = $('#dataTable').find('tbody');
				 dataTable.empty();	 
				
				  
				 for (let key in finalData.country_data) {
			      const data = finalData.country_data[key];
			      const row = {
					 player: '',
			        tag: data.tag,
			        average_tech: parseFloat(data.average_tech).toFixed(1),
			        total_holdings: data.total_holdings,
			        total_cohorts: data.total_cohorts,
			        total_population: data.total_population,
			        monthly_manpower: (parseFloat(data.monthly_manpower) * 500).toFixed(0),
			        max_manpower: (parseFloat(data.max_manpower) * 500).toFixed(0),
			        averaged_income: parseFloat(data.averaged_income).toFixed(0),
			        gold: parseFloat(data.gold).toFixed(0),
			        stability: parseFloat(data.stability).toFixed(1),
			        aggressive_expansion: parseFloat(data.aggressive_expansion).toFixed(1),
			        religious_unity: parseFloat(data.religious_unity).toFixed(1),
			        tyranny: parseFloat(data.tyranny).toFixed(1),
			        war_exhaustion: parseFloat(data.war_exhaustion).toFixed(1)
			      };
						  			for(let i=0; i<finalData.played_country.length;i++){
										  if(finalData.played_country[i].country==key){
												  row.player=finalData.played_country[i].name;
												  break;
											  }
									  }
			      dataArray.push(row);
			    }
				   dataArray = dataArray.sort((a, b) => b.total_population - a.total_population);
				 for(let i=0; i<dataArray.length;i++){
							   const row = $('<tr>');
							  const data = dataArray[i];
							  row.append(`<td>${data.player}</td>`);
							  	row.append(`<td>${data.tag}</td>`);
							    row.append(`<td>${data.average_tech}</td>`);
							    row.append(`<td>${data.total_holdings}</td>`);
							    row.append(`<td>${data.total_cohorts}</td>`);
							    row.append(`<td>${data.total_population}</td>`);
							    row.append(`<td>${data.monthly_manpower}</td>`);
							    row.append(`<td>${data.max_manpower}</td>`);
							    row.append(`<td>${data.averaged_income}</td>`);
							    row.append(`<td>${data.gold}</td>`);
							    row.append(`<td>${data.stability}</td>`);
							    row.append(`<td>${data.aggressive_expansion}</td>`);
							    row.append(`<td>${data.religious_unity}</td>`);
							    row.append(`<td>${data.tyranny}</td>`);
							    row.append(`<td>${data.war_exhaustion}</td>`);  
							    dataTable.append(row);
						  }
				$('#downloadButton').show();
				
  }
  
   const downloadButton = $('#downloadButton');

  downloadButton.on('click', function() {
    

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(dataArray);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const fileName = finalData.date + "_data.xlsx";
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  });
        
        
        
        
