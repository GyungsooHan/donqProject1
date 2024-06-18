let campaignData = [];

$(document).ready(function() {
	
		getCampaignList();
	
		  	$(document).on('click', '.detail_group', function() {
				  let id = $(this).find('.id');
				  const dataTable = $('#sessionTable').find('tbody');
				   $('#campaignTable').hide();
				   $('#sessionTable').show();
					 dataTable.empty();	 
					 data=campaignData[0].campaignDetailDocumentList;
					 if(data==undefined) return;
				for(let i=0; i<data.length;i++){
							   const row = $('<tr class="detail_group" style="cursor: pointer;">');
							  const detail = data[i];
							  row.append(`<td class="id">${detail.player}</td>`);
							  	row.append(`<td>${detail.country}</td>`);
							    row.append(`<td>${detail.avg_tech}</td>`);
							    row.append(`<td>${detail.holdings}</td>`);
							    row.append(`<td>${detail.cohorts}</td>`);
							    row.append(`<td>${detail.population}</td>`);
							     row.append(`<td>${detail.manpowerRec}</td>`);
							      row.append(`<td>${detail.income}</td>`);
							       row.append(`<td>${detail.gold}</td>`);
							        row.append(`<td>${detail.stability}</td>`);
							         row.append(`<td>${detail.agressive_expansion}</td>`);
							          row.append(`<td>${detail.religious_unity}</td>`);
							           row.append(`<td>${detail.tyranny}</td>`);
							            row.append(`<td>${detail.war_exhauastion}</td>`);
							    dataTable.append(row);
						  }
		});

		$('#add_product_button').on('click', function() {
			$('#admin').val(""); 
           $('#admin_pw').val(""); 
           $('#campaign_name').val(""); 
            $('#start_date').val(""); 
             $('#status').val(""); 
			$('#add_group_modal').modal('show');
		});		
			
		  $('#add_group_confirm').click(function(){
			  var admin = $('#admin').val(); 
            var admin_pw = $('#admin_pw').val(); 
            var campaign_name =  $('#campaign_name').val(); 
            var campaign_start = $('#start_date').val(); 
            $.ajax({
                type: "POST",
                url: "https://www.donqproject.com/api/imperator/createDocument",
                contentType: "application/json",
                data: JSON.stringify({
                    campaign_name: campaign_name,
                    admin: admin,
                    admin_pw: admin_pw,
                    campaign_start: campaign_start,
                      status : 'active'
                }),
                success: function (data) {
				$('#add_group_modal').modal('hide');
				$('#success_alert').modal('show');
				getCampaignList();
                }
            });
        });	    
        
        function getCampaignList() {
			  $.ajax({
                type: "GET",
                url: "https://www.donqproject.com/api/imperator/all",
                contentType: "application/json",
                success: function (data) {
					const dataTable = $('#campaignTable').find('tbody');
					 dataTable.empty();	 
					campaignData = data;
				for(let i=0; i<data.length;i++){
							   const row = $('<tr class="detail_group" style="cursor: pointer;">');
							  const campaign = data[i];
							  row.append(`<td class="id">${campaign.id}</td>`);
							  	row.append(`<td>${campaign.campaign_name}</td>`);
							    row.append(`<td>${campaign.admin}</td>`);
							    row.append(`<td>${campaign.campaign_start}</td>`);
							    row.append(`<td>${campaign.campaign_end}</td>`);
							    row.append(`<td>${campaign.status}</td>`);
							    row.append('<td><button class="btn btn-success">detail</button></td>')
							    dataTable.append(row);
						  }
                }
            });

		}
					    			    
});