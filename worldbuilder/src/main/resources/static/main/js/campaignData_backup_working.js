let finalData = {};
let dataArray = [];
$(document).ready(function() {
            
         function parseImperatorRomeSave(fileContents,parsedData,type) {
            const lines = fileContents.split('\n');
			 let bracketLevel =0;
			 let bracketStarts = false;
			 let bracketLine ="";
			 let bracketKey = "";
			 let workingData = {};
            for (let line of lines) {				
                line = line.trim();   
                bracketLevel = bracketChecker(line,bracketLevel);
                if(bracketStarts &&bracketLevel!=0){
					bracketLine += '\n'+ line;
					}else if(bracketStarts&&bracketLevel==0){
						bracketStarts=false;
						
						if(bracketKey=='played_country'){
						    if (!Array.isArray(workingData[bracketKey])) {
						        workingData[bracketKey] = [];
						    }
						    workingData[bracketKey].push(bracketLine);
					   }else if(bracketKey=='country'||type=='country'){
						 workingData[bracketKey] = bracketLine;
						 }
						 bracketLine='';
					}
                if (line.includes('=')&&line.includes('{')&&!bracketStarts) {
                    const keyValue = line.split('=');
                    const key = keyValue[0].trim();
                    var value = keyValue[1].trim();
                     currentBracketKey = key;
                    // Handle strings
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }
               			bracketStarts = true;
               			bracketKey = key;
                	}
                else if (line.includes('=')&&!line.includes('{')&&bracketLevel==0) {
                    const keyValue = line.split('=');
                    const key = keyValue[0].trim();
                    var value = keyValue[1].trim();
                    // Handle strings
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }    
	                    parsedData[key] = value;  
                }
            }
            return workingData;
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
            
            function parserFactory(result){
				let playerCountry_arry = [];
				for (let key in result) {
					if(key=='played_country'){	
						let played_country = result[key];
						finalData[key] = played_country_parser(played_country,playerCountry_arry);
					}
				}
				let workingCountry ={};
				for (let key in result) {
					if(key=='country'){	
						let country = result[key];
						let country_final={};
						workingCountry = parseImperatorRomeSave(country,country_final,'country');
						workingCountry = parseImperatorRomeSave(workingCountry.country_database,country_final,'country');
						for (let key in workingCountry) {
								if(playerCountry_arry.includes(key)){
									workingCountry[key] = country_parser(workingCountry[key]);
								}else{
									delete workingCountry[key];
								}
							}
					}
				}

				return workingCountry;
			}	
			
		function played_country_parser(array,playerCountry_arry) {
		  const resultArray = array.map(entry => {
		    const lines = entry.trim().split('\n');
		    const result = {};
		    lines.forEach(line => {
		      const [key, value] = line.split('=');
		      if (key && value) {
		        const cleanKey = key.trim();
		        let cleanValue = value.trim();
		        if (cleanKey === 'name') {
		          cleanValue = cleanValue.replace(/"/g, ''); // Remove quotes around the name
		        }
		        if(cleanKey ==='country'){
					playerCountry_arry.push(cleanValue);
				}
		        result[cleanKey] = cleanValue;
		      }
		    });
		    
		    return { name: result.name, country: result.country };
		  });
		  
		  return resultArray;
		}
		
		function country_parser(data) {
			let currency =['manpower','gold','stability','tyranny','war_exhaustion','aggressive_expansion','political_influence','military_experience','innovations']
			let isCurrencyBracket = false;
			let baseInfo =['total_holdings','total_population','tag','historical','heritage','religion','primary_culture','monthly_manpower','estimated_monthly_income','averaged_income','religious_unity','foreign_religion_pops','max_manpower','armies','navies','last_war','last_peace','loyal_cohorts','disloyal_cohorts','centralization','total_cohorts']
			
			
	  const lines = data.trim().split('\n');
	  const result = {};
	  let techLevel =0;
	  let progress = 0;
	  lines.forEach(line => {
	    const [key, value] = line.split('=');
	    if (key && value) {
	      const cleanKey = key.trim();
	      let cleanValue = value.trim();
	      if(cleanKey=='currency_data'){
			  isCurrencyBracket=true;
		  }else if(isCurrencyBracket&&line.includes('}')){
			  isCurrencyBracket=false;
		  }
	      if(isCurrencyBracket&&currency.includes(key)){
	      		result[cleanKey] = cleanValue; 
	      }
	      if(baseInfo.includes(key)){
	      		result[cleanKey] = cleanValue.replace(/"/g, '');
	      }
	      if(key=='level'){
	      		techLevel += parseFloat(cleanValue);
	      }
	      if(key=='progress'){
	      		progress += parseFloat(cleanValue);
	      }
	    }
	    result['average_tech'] = (techLevel+progress/100)/4 ;
	  });
	  return result;
	}

			
 $('#fileInput').on('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const fileContents = e.target.result;
                        let workingData = parseImperatorRomeSave(fileContents,finalData,'final');
							result = parserFactory(workingData);
							finalData['country_data'] = result;
							console.log(finalData);
							htmlAppender(finalData);
							
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
        
        
        
        
