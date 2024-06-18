let finalData = {};
$(document).ready(function() {
            
function parseImperatorRomeSave(fileContents,parsedData) {
            const lines = fileContents.split('\n');
			 let bracketLevel =0;
			 let bracketData = [];
            for (let line of lines) {				
                line = line.trim();   
                
                bracketLevel = bracketChecker(line,bracketLevel);
                bracketData = bracketInfoReset(bracketData,bracketLevel);
                console.log(bracketData);
                
                	if(!line.includes('=')&&bracketLevel!=0){
						parsedData
						
					}
                	
                	
                  if (line.includes('=')&&line.includes('{')) {
					  	const keyValue = line.split('=');
                    	const key = keyValue[0].trim();
                    	var value = keyValue[1].trim();
                    	bracketData.push(key);
                	}
                else if (line.includes('=')&&!line.includes('{')&&bracketLevel==0) {
                    const keyValue = line.split('=');
                    const key = keyValue[0].trim();
                    var value = keyValue[1].trim();
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }    
	                    parsedData[key] = value;  
                }
                
            }
            
            return parsedData;
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
			function bracketInfoReset(bracketData,currentBraceCount){
				 if (currentBraceCount < 0 || currentBraceCount >= bracketData.length) {
					    return bracketData; 
					  }
					  bracketData.splice(currentBraceCount + 1);
					  return bracketData;
			}
	
	
 $('#fileInput').on('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const fileContents = e.target.result;
                        const jsonData = parseImperatorRomeSave(fileContents,finalData);
                       console.log(JSON.stringify(jsonData, null, 2));
                    };
                    reader.readAsText(file);
                }
            });
        });
