$(document).ready(function(){
	$.getJSON('./books.json',function(data){
		bookData = data
		doWork();
	});
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

	attachBookTracking();

};

var bookNumber = 0, about = false, bookData;

function createBullets(){
	for(var i = 0; i < bookData.length; i++) {

		var bookTitle = bookData[i].title.name;
		var dateRead = bookData[i].read;

		var yr = dateRead.split('-')[0];
		var mo = dateRead.split('-')[1] - 1;
		var da = dateRead.split('-')[2];

		var start = new Date(2013, 0, 0);
		var date = new Date(yr,mo,da);

		var diff = Math.floor((date - start )/(1000 * 60 * 60 * 24));
		var percent = Math.floor(1000*diff/365)/10;

		percent = percent*0.9 + 5;

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

	var coverImage = bookData[number].cover;
	$('.coverImage').attr('src',coverImage);

	var title = bookData[number].title.name;
	var titleLink = bookData[number].title.link;

	$('#title').text(title);
	$('#title').attr('href', titleLink);

	var author = bookData[number].author.name;
	var authorLink = bookData[number].author.link;

	$('#author').text(author);
	$('#author').attr('href',authorLink);

	var publisher = bookData[number].publisher.name;
	var publisherLink = bookData[number].publisher.link;

	$('#publisher').text(publisher);
	$('#publisher').attr('href',publisherLink);

	var year = bookData[number].year;
	$('#year').text(year);

	var numbers = bookData[number].numbers;
	for(var i = 0; i < numbers.length; i++){
		var name = numbers[i].name;
		var numberN = numbers[i].number;
		var link = numbers[i].link;

		var pTag = $(document.createElement('p'));
		pTag.addClass('bookDescription');

		if(link){
			var aTag =  $(document.createElement('a'));
			aTag.addClass('numberLinks');
			aTag.attr('href',link);
			aTag.text(name + ': ' + numberN);
			pTag.append(aTag);
		} else {
			pTag.text(name + ': ' + numberN);
		}

		$('#numbers').append(pTag);
	}

	var readDate = bookData[number].read;
	$('#readDate').text('read: ' + readDate);

	var pages = bookData[number].pages;
	$('#pages').text('pages: ' + pages);

	var description = bookData[number].description;
	$('#description').text(description);

	var rating = bookData[number].rating;

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
	$('#rating').html(rating);

	var tags = bookData[number].subjects;
	var tagString = 'subjects: ';

	for (var k = 0; k < tags.length; k++) {
		if (k == tags.length - 1){
			tagString += tags[k];
		} else {
			tagString += tags[k] + ', ';
		}
	}
	$('#tags').text(tagString);

	var links = bookData[number].links;

	$('#links').append('Links: ');

	for (var l = 0; l < links.length; l++){

		var aTag = $(document.createElement('a'));
		aTag.text(links[l].title);
		aTag.attr('href',links[l].link);
		aTag.addClass('externalLink');



		$('#links').append(aTag);

		if (l < links.length - 1 ) {
			$('#links').append(', ');
		}

	}
	
	updateLinks(number);
	
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
