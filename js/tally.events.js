tally.debug = false;

$(document).ready(function(){

	if(tally.host == '127.0.0.1') {
		tally.debug = true;
		console.log('tally in debug mode, no events recorded');
	}

	if(tally.debug){
		console.log('tally tick');
	} else {
		_tally.tick('pageView','v1');	
	}
	
	$('.subtleLink').click(function(){
		if(tally.debug){
			console.log('tally click footer');
		} else {
			_tally.click(e,'footer link');
		}
	});

});

function attachBookTracking(){

	$('.bookBullet').click(function(){
		if(tally.debug){
			console.log('tally click bullet');
		} else {
			_tally.tick('click','bookBullet');	
		}
	});

	$('.bookNavLink').click(function(event){
		if(tally.debug){
			console.log('tally click next/prev');
		} else {
			_tally.tick('click','next/prev');
		}
	});

	$('.externalLink').click(function(e){
		if(tally.debug){
			console.log('tally click external link');
		} else {
			_tally.click(e,'external link click');		
		}
	});	

}
