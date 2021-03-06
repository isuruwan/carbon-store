$(document).ready(function() {

	$('#btn-create-version').on('click', function(e) {
		e.preventDefault();
		var newVersion = $('#new-version').val();
		if(newVersion){
			var assetId = $('#asset-id').val();
			var assetType = $('#asset-type').val();
			var path = caramel.url('/apis/asset/' + assetId + '/create-version?type=' + assetType);
			var assetPath = caramel.url('/assets/' + assetType + '/details/');
			$('#btn-create-version').addClass('disabled');
			$('#new-version-loading').removeClass('hide');
			var alertMessage = $("#alertSection");

			$.ajax({
				url : path,
				//data : JSON.stringify({"attributes":{"overview_name": "sample gadget","overview_version": newVersion,"overview_url": "wso2.org","overview_provider": "wso2","images_banner": "images_banner","overview_createdtime": "00000001434449823135","overview_category": "wso2","images_thumbnail": "images_thumbnail"}}),
				data : JSON.stringify({"attributes":{"overview_version": newVersion }}),
				type : 'POST',
				success : function(response) {
					alertMessage.addClass('alert-success');
					alertMessage.removeClass('alert-warning hide');
					alertMessage.html('Asset version created successfully! <a href="'+assetPath+response.data+'"> View </a>');
					$('#btn-create-version').removeClass('disabled');
					$('#new-version-loading').addClass('hide');
				},
				error : function(error) {
					//console.log(error);
					var errorText = JSON.parse(error.responseText).error;
					alertMessage.text(errorText);
					alertMessage.removeClass('alert-success hide');
					alertMessage.addClass('alert-warning');

					$('#btn-create-version').removeClass('disabled');
					$('#new-version-loading').addClass('hide');
				}
			});
			//$("#newVersionModal").modal('hide');
			}
	});

    $('#btn-cancel-version').on('click', function(e) {
        var assetId = $('#asset-id').val();
        var assetType = $('#asset-type').val();
        var path = caramel.url('/assets/'+assetType + '/details/' + assetId);

        $.ajax({
            success : function(response) {
                window.location = path;
            }
        });
    });

});
