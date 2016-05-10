jQuery.noConflict();
jQuery(window).load(function() {
	jQuery(document).on('focus', '.form-control', function() {
		jQuery(this).parent().addClass('focused');
	});
	//jQuery(document).on('focusout', '.form-control', function() {
	//	jQuery(this).parent().removeClass('focused');
	//});
	jQuery('input').each(function(){
		if(jQuery(this).text() != ""){
			jQuery(this).parent().addClass('focused');
		}
	});
	jQuery.each(jQuery('input[type=text]'),function(){
	//alert(jQuery(this).val());
	});
});