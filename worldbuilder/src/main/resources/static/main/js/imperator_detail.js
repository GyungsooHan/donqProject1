var matchResults = [];
var isScriptChanging = false;
var terrain_type = '';
var group_id=0;
var unitIncludeList = [];
$(document).ready(function() {
		$('#terrain_select').val('default');
		terrain_type = sessionStorage.getItem('terrain');
		if(terrain_type!=null){
			$('#terrain_select').val(terrain_type);
		}
		  isScriptChanging = true;
		 $('#terrain_select').on('change', function() {
                if (isScriptChanging) {
					  group_id =  $('#group_id').val();  
						terrain_type =$(this).val();    
						
						$('.unit_checkbox').each(function() {
				        if($(this).is(':checked')) {
							 unitIncludeList.push($(this).val());
		                } 
				    });
						
						
						    
						 $('#balance_check_btn').click();             
                    //sessionStorage.setItem('terrain', $(this).val());
                    //window.location.href = '/imperator/balanceDetail?id='+group_id;
                }
            });
            
            $('.unit_checkbox').on('change', function() {
                $('.unit_checkbox').each(function() {
				        if($(this).is(':checked')) {
							 unitIncludeList.push($(this).val());
		                } 
				    });
				   	 $('#balance_check_btn').click();
            });
            
            
		     $('#success_alert_detail').on('hidden.bs.modal', function (e) {
								 var id =  $('#group_id').val(); 
			 					 window.location.href = '/imperator/balanceDetail?id='+id;
					    });
			
		$('.detail_unit').on('click', function() {
			var clicked_row = $(this).parent().parent();
			var user_id = clicked_row.find('.unit_name').attr("value");
			 $('#detail_id').val(user_id); 
			 $('#detail_name').val(clicked_row.find('.unit_name').text());  
			 var groupUnit = [];
			 for(var i=0;i<groupUnitList.length;i++){
				 if(groupUnitList[i].id==user_id){
					 groupUnit = groupUnitList[i];
					 break;
				 }
			 }
           $('#detail_cost').val(groupUnit.cost); 
          $('#detail_dicipline').val(groupUnit.dicipline); 
           $('#detail_attack').val(groupUnit.attack); 
           $('#detail_defence').val(groupUnit.defence); 
          $('#detail_morale_taken').val(groupUnit.morale_taken); 
           $('#detail_str_taken').val(groupUnit.str_taken);
              
           $('#detail_mountain_combat').val(groupUnit.mountain);
          $('#detail_hill_combat').val(groupUnit.hill);
           $('#detail_marsh_combat').val(groupUnit.marsh);
           $('#detail_desert_combat').val(groupUnit.desert);
           $('#detail_desert_hill_combat').val(groupUnit.desert_hill);
           $('#detail_jungle_combat').val(groupUnit.jungle);
           $('#detail_forest_combat').val(groupUnit.forest);
           $('#detail_plain_combat').val(groupUnit.plain);
           $('#detail_farmland_combat').val(groupUnit.farmland);
          $('#detail_oasis_combat').val(groupUnit.oasis);
              
              
              
              
           $('#detail_group_id').val(clicked_row.find('.group_id').text()); 
            
            var groupUnit = groupUnitList.find(function(a) {
			    return a.id == user_id;
			});
			$('#counter_buttons').empty();
			 groupUnit.counterList.forEach(function(b) {
				 var button = "";
				 if(b.damage_value>0){
					 button = $('<button>').addClass('btn btn-success mt-1 mb-1 ms-1')
		                                  .html(b.defender_name + ' | ' + b.damage_value);
				 }else{
					 button = $('<button>').addClass('btn btn-danger mt-1 mb-1 ms-1')
		                                  .html(b.defender_name + ' | ' + b.damage_value);
				 }
		        $('#counter_buttons').append(button);
		    });
			
            
			  $('#detail_unit_modal').modal('show');
		});	
		
		$('.detail_battle').on('click', function() {
			$('#battle_report_card').empty();
			$('#battle_report_modal').modal('show');
			
			var clicked_row = $(this).parent().parent();
			var user_id = clicked_row.find('.unit_name').attr("value");
			 for(var i=0;i<matchResults.length;i++){
				 if(matchResults[i].a.id==user_id || matchResults[i].b.id==user_id){
					battle_detail_card(matchResults[i],user_id);
				 }
			 }
		});
		
				    
		
		$('#add_product_button').on('click', function() {
			$('#add_unit_modal').modal('show');
		});	
		$('#counter_update_confirm').on('click', function() {
			var attacker_id = $('#detail_id').val(); 
			var defender_id = $('#defender_id').val(); 
			var damage_value = $('#damage_value').val(); 
			if(defender_id==-1){
				return;
			}
			
			$.ajax({
                type: "POST",
                url: "/imperator/updateCounter",
                contentType: "application/json",
                data: JSON.stringify({
                    attacker_id: attacker_id,
                    defender_id: defender_id,
                    damage_value: damage_value
                }),
                success: function (data) {
                    if (data == 'success') {
						   $('#detail_unit_modal').modal('hide');
                        $('#success_alert_detail').modal('show');
                    }
					else {
                        $('#fail_alert_detail').modal('show');
                    }
                }
            });
		});	
		
		$('#add_counter_btn').on('click', function() {
			$('#new_counter_modal').modal('show');
		});		
		       $('#add_unit_confirm').click(function(){
			 var name = $('#name').val(); 
           var cost = $('#cost').val(); 
           var dicipline = $('#dicipline').val(); 
           var attack = $('#attack').val(); 
           var defence = $('#defence').val(); 
           var morale_taken = $('#morale_taken').val(); 
           var str_taken = $('#str_taken').val(); 
           var group_id =  $('#group_id').val();
           var mountain = $('#mountain_combat').val();
           var hill = $('#hill_combat').val();
           var marsh = $('#marsh_combat').val();
           var desert = $('#desert_combat').val();
           var desert_hill = $('#desert_hill_combat').val();
           var jungle = $('#jungle_combat').val();
           var forest = $('#forest_combat').val();
           var plain = $('#plain_combat').val();
           var farmland = $('#farmland_combat').val();
           var oasis = $('#oasis_combat').val();
           
           
            
           	$('#add_unit_modal').modal('hide');
            $.ajax({
                type: "POST",
                url: "/imperator/insertGroupUnit",
                contentType: "application/json",
                data: JSON.stringify({
                    name: name,
                    cost: cost,
                    dicipline: dicipline,
                    attack: attack,
                    defence: defence,
                    morale_taken: morale_taken,
                    str_taken: str_taken, 
                    group_id:group_id,     
                    mountain:mountain,
                    hill:hill,
                    marsh:marsh,
                    desert:desert,
                    desert_hill:desert_hill,
                    jungle:jungle,
                    forest:forest,
                    plain:plain,
                    farmland:farmland,
                    oasis:oasis 	                             	
                }),
                success: function (data) {
                    if (data == 'success') {
                        $('#success_alert_detail').modal('show');
                    }
					else {
                        $('#success_alert_detail').modal('show');
                    }
                }
            });
        });	    
            $('#update_unit_confirm').click(function(){
				var unit_id = $('#detail_id').val(); 
			 var name = $('#detail_name').val(); 
           var cost = $('#detail_cost').val(); 
           var dicipline = $('#detail_dicipline').val(); 
           var attack = $('#detail_attack').val(); 
           var defence = $('#detail_defence').val(); 
           var morale_taken = $('#detail_morale_taken').val(); 
           var str_taken = $('#detail_str_taken').val(); 
           var mountain = $('#detail_mountain_combat').val();
           var hill = $('#detail_hill_combat').val();
           var marsh = $('#detail_marsh_combat').val();
           var desert = $('#detail_desert_combat').val();
           var desert_hill = $('#detail_desert_hill_combat').val();
           var jungle = $('#detail_jungle_combat').val();
           var forest = $('#detail_forest_combat').val();
           var plain = $('#detail_plain_combat').val();
           var farmland = $('#detail_farmland_combat').val();
           var oasis = $('#detail_oasis_combat').val();
           
           
           
           	$('#detail_unit_modal').modal('hide');
            $.ajax({
                type: "POST",
                url: "/imperator/updateGroupUnit",
                contentType: "application/json",
                data: JSON.stringify({
					   id:unit_id,
                    name: name,
                    cost: cost,
                    dicipline: dicipline,
                    attack: attack,
                    defence: defence,
                    morale_taken: morale_taken,
                    str_taken: str_taken,
                    mountain:mountain,
                    hill:hill,
                    marsh:marsh,
                    desert:desert,
                    desert_hill:desert_hill,
                    jungle:jungle,
                    forest:forest,
                    plain:plain,
                    farmland:farmland,
                    oasis:oasis    
                }),
                success: function (data) {
                    if (data == 'success') {
                        $('#success_alert_detail').modal('show');
                    }
					else {
                        $('#success_alert_detail').modal('show');
                    }
                }
            });
        });	 
          $('#delete_unit_confirm').click(function(){
				var unit_id = $('#detail_id').val(); 
				$('#detail_unit_modal').modal('hide');
            $.ajax({
                type: "POST",
                url: "/imperator/deleteGroupUnit",
                contentType: "application/json",
                data: JSON.stringify({
					   id:unit_id 
                }),
                success: function (data) {
                    if (data == 'success') {
                        $('#success_alert_detail').modal('show');
                    }
					else {
                        $('#success_alert_detail').modal('show');
                    }
                }
            });
        });	
        $('#delete_group_confirm').click(function(){
			  $('#delete_confirmation_modal').modal('show');
			});

         $('#delete_group_confirm_complete').click(function(){
				var group_id = $('#group_id').val(); 
            $.ajax({
                type: "POST",
                url: "/imperator/deleteBalanceGroup",
                contentType: "application/json",
                data: JSON.stringify({
					   id:group_id 
                }),
                success: function (data) {
                    if (data == 'success') {
						window.location.href = '/imperator';
                       
                    }
					else {
                        $('#success_alert_detail').modal('show');
                    }
                }
            });
        });	 
        
        $('#login').click(function(){
				var group_id = $('#group_id').val(); 
            $.ajax({
                type: "POST",
                url: "/imperator/login",
                contentType: "application/json",
                data: JSON.stringify({
					   id:group_id ,
					   password:$('#author_password').val()
                }),
                success: function (data) {
                    if (data == 'success') {
						window.location.href = '/imperator/balanceDetail?id='+group_id;
                       
                    }
					else {
                        $('#fail_login_detail').modal('show');
                    }
                }
            });
        });	
         $('#balance_check_btn').click(function(){
			 
			 var newUnitList = resetBalanceCheck(groupUnitList);

			 
			 var matches = generateMatches(newUnitList);
			 
			 for(var i=0;i<groupUnitList.length;i++){
				 
				 $('#row-'+groupUnitList[i].id).find('.win').text('---');
		        $('#row-'+groupUnitList[i].id).find('.win_trade').text('---');
				  $('#row-'+groupUnitList[i].id).find('.casualty').text('---');
		        $('#row-'+groupUnitList[i].id).find('.morale').text('---');
				  $('#row-'+groupUnitList[i].id).find('.casualty_bycost').text('---');
		        $('#row-'+groupUnitList[i].id).find('.morale_bycost').text('---');
				  $('#row-'+groupUnitList[i].id).find('.overall').text('---');
		        $('#row-'+groupUnitList[i].id).find('.overall_bycost').text('---');
			 }
			 
			 if(matches.length===0){
				 return;
			 }
			var averageCost = 0;
			for (var i = 0; i < newUnitList.length; i++) {
		        averageCost += newUnitList[i].cost;
		    }
			averageCost = averageCost/newUnitList.length;
			
			
			  matchResults = matchMaker(matches);
			 
			
			 
			 
			 
			 
	 		for (var i = 0; i < newUnitList.length; i++) {

		        var finalMorale = (newUnitList[i].finalMorale/(newUnitList.length-1)/3*100);
		        var finalStr = (newUnitList[i].finalStr/(newUnitList.length-1)*100);
		        var finalEnemyMorale = (newUnitList[i].finalEnemyMorale/(newUnitList.length-1)/3*100);
		        var finalEnemyStr = (newUnitList[i].finalEnemyStr/(newUnitList.length-1)*100);
		        
		        var winCount = Math.round(parseFloat(newUnitList[i].winMatchCnt)/(newUnitList.length-1)*100)+'%';
		        var winStrTradeCnt = Math.round(parseFloat(newUnitList[i].winStrTradeCnt)/(newUnitList.length-1)*100)+'%';
		        
		        $('#row-'+newUnitList[i].id).find('.win').text(winCount);
		        $('#row-'+newUnitList[i].id).find('.win_trade').text(winStrTradeCnt);
		        
		        var casulty_efficiency = Math.round((100-finalEnemyStr)/(100-finalStr)*100)/100;
		        var morale_efficiency = Math.round((100-finalEnemyMorale)/(100-finalMorale)*100)/100; 
		        $('#row-'+newUnitList[i].id).find('.casualty').text(casulty_efficiency);
		        $('#row-'+newUnitList[i].id).find('.morale').text(morale_efficiency);
		        
		        var unit_cost = newUnitList[i].cost;
		        if(!averageCost>0 || !unit_cost>0){
						averageCost =1;
						unit_cost = 1;	
				}
		    	  var casulty_efficiency_bycost = Math.round((100-finalEnemyStr)/(100-finalStr)*averageCost/unit_cost*100)/100;
		        var morale_efficiency_bycost = Math.round((100-finalEnemyMorale)/(100-finalMorale)*averageCost/unit_cost*100)/100;        
		        
		        $('#row-'+newUnitList[i].id).find('.casualty_bycost').text(casulty_efficiency_bycost);
		        $('#row-'+newUnitList[i].id).find('.morale_bycost').text(morale_efficiency_bycost);
		        
		        var overall_efficiency = Math.round((casulty_efficiency  + morale_efficiency)/2*100)/100;
		         var overall_efficiency_bycost = Math.round((casulty_efficiency_bycost  + morale_efficiency_bycost)/2*100)/100;
		        
		         $('#row-'+newUnitList[i].id).find('.overall').text(overall_efficiency);
		        $('#row-'+newUnitList[i].id).find('.overall_bycost').text(overall_efficiency_bycost);
		        
		        
		    }	    
        });	
        //페이지 로딩시 자동실행
        $('#balance_check_btn').click();
        
         
         function resetBalanceCheck(arr) {	
			 
			  for (var i = 0; i < arr.length; i++) {
		        arr[i].winMatchCnt = 0;
		        groupUnitList[i].finalMorale = 0;
		        groupUnitList[i].finalStr =0;
		          groupUnitList[i].winMatchCnt =0;
		          groupUnitList[i].winStrTradeCnt =0;
		           groupUnitList[i].finalEnemyMorale =0;
		            groupUnitList[i].finalEnemyStr =0;
		    }
			 		 			 
			 if(unitIncludeList.length>0){
				 var newArr = [];
				  for (var i = 0; i < arr.length; i++) {
					  	for(var j=0;j<unitIncludeList.length;j++){
						if(groupUnitList[i].id==unitIncludeList[j]){
							newArr.push(groupUnitList[i]);
						}
					}	
				}
					arr = newArr;
				   unitIncludeList = [];
		   		 }
		    return arr;
		}
        function generateMatches(arr) {
		    var matches = [];
		    for (var i = 0; i < arr.length - 1; i++) {
		        for (var j = i + 1; j < arr.length; j++) {
		            matches.push([arr[i], arr[j]]);
		        }
		    }
		    return matches;
		}
		
		function roundCalc(matchInfo){
			 var total_a_b_dmg=0;
				     var total_b_a_dmg =0;
				     var str_a_b_dmg =0;
				     var str_b_a_dmg=0;
				     var morale_a_b_dmg =0;
				     var morale_b_a_dmg =0;
				     var a_terrain_modifier =1; 
				     var b_terrain_modifier =1;    
				     if (terrain_type == 'default') {
		                } else if (terrain_type == 'mountain') {
		                    a_terrain_modifier = parseFloat((100 + matchInfo.a.mountain)/100);
		                    b_terrain_modifier = parseFloat((100 + matchInfo.b.mountain)/100);      
		                } else if (terrain_type == 'hill') {
		                  		 a_terrain_modifier = parseFloat((100 + matchInfo.a.hill)/100);
		                    b_terrain_modifier = parseFloat((100 + matchInfo.b.hill)/100);      
		                } else if (terrain_type == 'marsh') {
		                     a_terrain_modifier = parseFloat((100 + matchInfo.a.marsh)/100);
		                    b_terrain_modifier = parseFloat((100 + matchInfo.b.marsh)/100);      
		                } else if (terrain_type == 'desert') {
		                    a_terrain_modifier = parseFloat((100 + matchInfo.a.desert)/100);
		                    b_terrain_modifier = parseFloat((100 + matchInfo.b.desert)/100);      
		                } else if (terrain_type == 'desert_hill') {
		                    a_terrain_modifier = parseFloat((100 + matchInfo.a.desert_hill)/100);
		                    b_terrain_modifier = parseFloat((100 + matchInfo.b.desert_hill)/100);      
		                } else if (terrain_type == 'jungle') {
		                    a_terrain_modifier = parseFloat((100 + matchInfo.a.jungle)/100);
		                    b_terrain_modifier = parseFloat((100 + matchInfo.b.jungle)/100);      
		                } else if (terrain_type == 'forest') {
		                    a_terrain_modifier = parseFloat((100 + matchInfo.a.forest)/100);
		                    b_terrain_modifier = parseFloat((100 + matchInfo.b.forest)/100);      
		                } else if (terrain_type == 'plain') {
		                     a_terrain_modifier = parseFloat((100 + matchInfo.a.plain)/100);
		                    b_terrain_modifier = parseFloat((100 + matchInfo.b.plain)/100);      
		                } else if (terrain_type == 'farmland') {
		                     a_terrain_modifier = parseFloat((100 + matchInfo.a.farmland)/100);
		                    b_terrain_modifier = parseFloat((100 + matchInfo.b.farmland)/100);      
		                } else if (terrain_type == 'oasis') {
		                    a_terrain_modifier = parseFloat((100 + matchInfo.a.oasis)/100);
		                    b_terrain_modifier = parseFloat((100 + matchInfo.b.oasis)/100);      
		               	  } 
				     total_a_b_dmg = a_terrain_modifier*matchInfo.base_damage * matchInfo.a_str * (100+matchInfo.a.dicipline)/100 * (100 + matchInfo.a.attack - matchInfo.b.defence)/100 *matchInfo.a_b_counter;
				     total_b_a_dmg = b_terrain_modifier*matchInfo.base_damage * matchInfo.b_str * (100+matchInfo.b.dicipline)/100 * (100 + matchInfo.b.attack - matchInfo.a.defence)/100 *matchInfo.b_a_counter;
				     str_a_b_dmg = total_a_b_dmg * (100 + matchInfo.b.str_taken)/100  *matchInfo.daily_multiplier_str *matchInfo.base_multipler;
				     str_b_a_dmg = total_b_a_dmg * (100 + matchInfo.a.str_taken)/100  *matchInfo.daily_multiplier_str *matchInfo.base_multipler;
			         morale_a_b_dmg = total_a_b_dmg * matchInfo.a_morale *  (100 + matchInfo.b.morale_taken)/100  *matchInfo.daily_multiplier_morale *matchInfo.base_multipler;
			         morale_b_a_dmg = total_b_a_dmg * matchInfo.b_morale * (100 + matchInfo.a.morale_taken)/100  *matchInfo.daily_multiplier_morale *matchInfo.base_multipler;
				matchInfo.a_str -= str_b_a_dmg;
				matchInfo.b_str -= str_a_b_dmg;
				matchInfo.a_morale -= morale_b_a_dmg;
				matchInfo.b_morale -= morale_a_b_dmg;
				return matchInfo;
		}
			function matchMaker(matches){
				var matchResults = [];
			  for (var i = 0; i < matches.length; i++) {
				     var matchInfo = {
				        a: matches[i][0],
				        b: matches[i][1],
				        a_str: 1,
				        a_morale: 3,
				        b_str: 1,
				        b_morale: 3,
				        a_b_counter: 1,
				        b_a_counter: 1,
				        base_damage: 0.18,
				        daily_multiplier_morale : 1.5,
				        daily_multiplier_str : 0.2,
				        base_multipler : 0.5,
				        victor : null,
				        round : 0
				    };  
				       for (var k = 0; k < matchInfo.a.counterList.length; k++) {
			               if(matchInfo.a.counterList[k].defender_id==matchInfo.b.id) {
							   		matchInfo.a_b_counter= (100 +matchInfo.a.counterList[k].damage_value)/100;
							   		break;
							   }
				        }
				        for (var k = 0; k < matchInfo.b.counterList.length; k++) {
							if(matchInfo.b.counterList[k].defender_id==matchInfo.a.id) {
							   		matchInfo.b_a_counter= (100 + matchInfo.b.counterList[k].damage_value)/100;
							   		break;
							  }   
				        }
				        round = 0;
				        
				        while(matchInfo.a_morale>0.25&&matchInfo.a_str>0&&matchInfo.b_morale>0.25&&matchInfo.b_str>0){
							 matchInfo =  roundCalc(matchInfo);
							 round++;
						}  
						matchInfo.round = round;

						matches[i][0].finalMorale += Math.max(matchInfo.a_morale, 0);
						matches[i][0].finalStr += Math.max(matchInfo.a_str, 0);
						matches[i][1].finalMorale += Math.max(matchInfo.b_morale, 0);
						matches[i][1].finalStr += Math.max(matchInfo.b_str, 0);
						matches[i][0].finalEnemyMorale += Math.max(matchInfo.b_morale, 0);
						matches[i][0].finalEnemyStr += Math.max(matchInfo.b_str, 0);
						matches[i][1].finalEnemyMorale += Math.max(matchInfo.a_morale, 0);
						matches[i][1].finalEnemyStr += Math.max(matchInfo.a_str, 0);
						
						var a_lose = false;
						var b_lose = false;
						if(matchInfo.a_morale<0.25 || matchInfo.a_str<0){
							a_lose = true;
						}
						if(matchInfo.b_morale<0.25 || matchInfo.b_str<0){
							b_lose = true;	
						}

						if (a_lose && b_lose){
							matches[i][1].winMatchCnt += 0.5;
							matches[i][0].winMatchCnt += 0.5;
							//draw
						}else if(a_lose && !b_lose){
							matches[i][1].winMatchCnt++;
							matchInfo.victor=matchInfo.b;
							//b wins
						}else if(!a_lose&& b_lose){
							matchInfo.victor=matchInfo.a;
							matches[i][0].winMatchCnt++;
							//a wins
						}
						if(matchInfo.a_str<matchInfo.b_str){
							matches[i][1].winStrTradeCnt++;
							//b trade wins
						}else if(matchInfo.a_str>matchInfo.b_str){
							matches[i][0].winStrTradeCnt++;
							//a trade wins
						}else{
							matches[i][1].winStrTradeCnt += 0.5;
							matches[i][0].winStrTradeCnt +=0.5;
						}
						matchResults.push(matchInfo);
			        }
			        return matchResults;
		}
		function text_color(value){
			if(value>1.25){
				return "text-success";
			}
			if(value<0.75){
				return "text-danger";
			}
			if(value>1.1){
				return "text-primary";
			}
			if(value<0.9){
				return "text-warning";
			}
				return "text-black";
			
		}
		 $('.stat_text').each(function() {
        var textValue = parseFloat($(this).text());
        var colorClass = text_color(textValue);
        $(this).addClass(colorClass);
    });
		
		function battle_detail_card(match,user_id){
			var win_loss_css = '';
			 var win_loss_text = '';
			 var vsUnit = '';
			 var turn = match.round;
			 var str_damage_done = 5;
			 var str_damage_recieved = 5;
			 var morale_damage_done = 5;
			 var morale_damage_recieved = 5;
			 var averageCost = (match.a.cost + match.b.cost)/2;
			 var unitCostModifier = 1;
			 
			 if(match.victor==null){
				 win_loss_css = 'bg-warning';
				 win_loss_text = "Draw";
			 }else if(match.victor.id==user_id){
				 win_loss_css = 'bg-success';
				 win_loss_text = "Victory";
			 }else{
				 win_loss_css = 'bg-danger';
				 win_loss_text = "Defeat";
			 } 
			if(match.a.id==user_id){
				vsUnit= match.b.name;
				str_damage_done = 1-match.b_str;
				str_damage_recieved = 1-match.a_str;
				morale_damage_done = 3 - Math.max(0,match.b_morale);
				morale_damage_recieved = 3- Math.max(0,match.a_morale);
				if(averageCost>0&&match.a.cost>0){
					unitCostModifier = match.b.cost/match.a.cost
				}
			}else{
				vsUnit= match.a.name;
				str_damage_done = 1 - match.a_str;
				str_damage_recieved =1-match.b_str;
				morale_damage_done = 3 - Math.max(0,match.a_morale);
				morale_damage_recieved = 3- Math.max(0,match.b_morale);
				if(averageCost>0&&match.a.cost>0){
					unitCostModifier = match.a.cost/match.b.cost
				}
			}
			var str_efficiency =  Math.round(str_damage_done/str_damage_recieved*100)/100;
			var morale_dfficiency =  Math.round(morale_damage_done/morale_damage_recieved*100)/100;
			var overall_efficiency =  Math.round((str_efficiency+morale_dfficiency)/2*100)/100;
	
			var str_efficiency_bycost =  Math.round(str_damage_done/str_damage_recieved*100*unitCostModifier)/100;
			var morale_dfficiency_bycost =  Math.round(morale_damage_done/morale_damage_recieved*100*unitCostModifier)/100;
			var overall_efficiency_bycost =  Math.round((str_efficiency+morale_dfficiency)/2*100*unitCostModifier)/100;
			
			var detailHtml = `
            <div class="col-lg-6">
                <div class="card mb-3 h-100">
                    <div class="card-header `+ win_loss_css+`">
                        <h4 class="mb-0 text-white">`+ win_loss_text+`</h4>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title mb-4">Against `+  vsUnit + `</h4>
                        <div>
                           	  <div class="d-flex justify-content-between">
					                <p class="text-body fw-semibold">battle lasted for :</p>
					                <p class="fw-semibold">`+ turn + `turn</p>
					            </div>
					            <div class="d-flex justify-content-between">
					                <p class="text-body fw-semibold">str efficiency</p>
					                <p class="fw-semibold `+ text_color(str_efficiency)+ `">` + str_efficiency + `</p>
					            </div>
					            <div class="d-flex justify-content-between">
					                <p class="text-body fw-semibold">str efficiency by cost</p>
					                <p class=" fw-semibold `+ text_color(str_efficiency_bycost)+ `">` +str_efficiency_bycost   + `</p>
					            </div>
					            <div class="d-flex justify-content-between">
					                <p class="text-body fw-semibold">morale efficiency</p>
					                <p class=" fw-semibold `+text_color(morale_dfficiency) +`">` + morale_dfficiency + `</p>
					            </div>
					            <div class="d-flex justify-content-between">
					                <p class="text-body fw-semibold">morale efficiency by cost</p>
					                <p class=" fw-semibold `+ text_color(morale_dfficiency_bycost) +`">`+ morale_dfficiency_bycost +`</p>
					            </div>
					            <div class="d-flex justify-content-between">
					                <p class="text-body fw-semibold">overall efficiency</p>
					                <p class=" fw-semibold `+ text_color(overall_efficiency) +`">` + overall_efficiency + `</p>
					            </div>
					            <div class="d-flex justify-content-between">
					                <p class="text-body fw-semibold">overall efficiency by cost</p>
					                <p class=" fw-semibold ` + text_color(overall_efficiency_bycost) + `">`+ overall_efficiency_bycost +`</p>
					            </div>
                        </div>
                        <div class="d-flex justify-content-between border-top border-translucent border-dashed pt-4">
                            <h4 class="mb-0"></h4>
                        </div>
                    </div>
                </div>
            </div>
        `;
	 		$('#battle_report_card').append(detailHtml);
		}

					    			    
});