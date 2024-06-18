$(document).ready(function() {
        $('#success_alert').on('hidden.bs.modal', function (e) {
								 location.reload(true);
					    });
				        
  		$('.detail_group').on('click', function() {
			  var id = $(this).find('.id').text();
			  window.location.href = '/imperator/balanceDetail?id='+id;
		});
		
		
		$('#add_product_button').on('click', function() {
			$('#name').val(""); 
           $('#author').val(""); 
           $('#password').val(""); 
			$('#add_group_modal').modal('show');
		});		
		
		
		
		       $('#add_group_confirm').click(function(){
			 var name = $('#name').val(); 
           var author = $('#author').val(); 
           var password =  $('#password').val(); 
         
            $.ajax({
                type: "POST",
                url: "/imperator/insertBalanceGroup",
                contentType: "application/json",
                data: JSON.stringify({
                    name: name,
                    author: author,
                    password: password,
                    user_status: "active"
                }),
                success: function (data) {
					$('#add_group_modal').modal('hide');
                    if (data == 'success') {
                        $('#success_alert').modal('show');
                    }
					else {
                        $('#fail_alert').modal('show');
                    }
                }
            });
        });	    
					    			    
});