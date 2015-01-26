Handlebars.registerHelper('stars', function(rating, options) {
   var stars = parseInt(rating);
	var starsFaded = 5 - stars;
	var starString = '', fadedString = '';

	for (var j = 0; j < stars; j++) {
		starString += '*';
	}
	for (var k = 0; k <starsFaded; k++) {
		fadedString += '*';
	}

	rating = 'rating: ' + starString + '<span class="faded">' + fadedString + '</span>';
	return new Handlebars.SafeString(rating);
});

$(document).ready(function(){
	doWork();
});

function doWork(){
	createBullets();

	$('#totalCount').html(bookData.length);

	$('.bookBullet').click(function(){

		$('.bookBullet').each(function(){
			$(this).removeClass('active');
		});

		$(this).addClass('active');

		bookNumber = $(this).attr('data-booknumber');

		$('.bookArea').fadeOut(500,function(){
			createBook(bookNumber);
			$('.bookArea').fadeIn(700);
		});

	});

	var randomBook = Math.round(Math.random()*($('.bookBullet').length-1));
	createBook(randomBook);
	bookNumber = randomBook;

	$('.bookNavLink').click(function(event){
		event.preventDefault();
		var newBookNumber = parseInt($(this).attr('data-booknumber'));

		if(newBookNumber < 0 || newBookNumber == bookData.length) {
			return false;
		}

		bookNumber = newBookNumber;

		$('.bookArea').fadeOut(500,function(){
			createBook(bookNumber);
			$('.bookArea').fadeIn(700);
		});

		$('.bookBullet').each(function(){
			$(this).removeClass('active');
		});

		$('.header [data-booknumber="'+bookNumber+'"]').addClass('active');

	});

	$('.header [data-booknumber="'+bookNumber+'"]').addClass('active');

	//attachBookTracking();

};

var bookNumber = 0, about = false, bookData;

function createBullets(){
	for(var i = 0; i < bookData.length; i++) {

		var bookTitle = bookData[i].title.name;
		var dateRead = bookData[i].read;

		var years = 3;

		var yr = dateRead.split('-')[0];
		var mo = dateRead.split('-')[1] - 1;
		var da = dateRead.split('-')[2];

		var start = new Date(2013, 0, 0);
		var date = new Date(yr,mo,da);

		var diff = Math.floor((date - start )/(1000 * 60 * 60 * 24));
		var percent = Math.floor(1000*diff/(365*years))/10;

		percent = percent;

		var bullet = $(document.createElement('div'));
		bullet.addClass('bookBullet');
		bullet.attr('data-booknumber',i);
		bullet.attr('style','left:'+percent+'%');

		var title = $(document.createElement('div'));
		title.addClass('hoverTitle');
		title.text(bookTitle);

		bullet.append(title);

		$('#timeline').append(bullet);
	}

	$('.bookBullet').hover(function(){
		$('#navbar').toggleClass('transparent');
	});
}

function clearBook(){
	$('#numbers').html('');
	$('#links').html('');
}

function createBook(number){
	clearBook();

	$('#currentCount').html(parseInt(number) + 1);

	updateLinks(number);

	var source   = $("#book-template").html();
	var template = Handlebars.compile(source);
	var thisBook = bookData[number];
	var html = template(thisBook);

	$('.bookArea').html(html);

}

function updateLinks(number) {

	if(bookNumber == 0) {
		bookNumber = number;
	}

	bookNumber = parseInt(bookNumber);

	$('#next').attr('data-booknumber', bookNumber + 1);

	if(bookNumber + 1 == bookData.length) {
		$('#next').addClass('faded');
	} else {
		$('#next').removeClass('faded');
	}
	$('#prev').attr('data-booknumber', bookNumber - 1);
	if (bookNumber == 0) {
		$('#prev').addClass('faded');
	} else {
		$('#prev').removeClass('faded');
	}
}
