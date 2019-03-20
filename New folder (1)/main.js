var url = 'https://api.pandascore.co/lol/leagues?token=zFKIBdhrdQZjTnSpUJtslUGbAvxTF9JanXZpFyhzBtYBaCx1kbI'
var urlMatch = 'https://api.pandascore.co/lol/matches/upcoming?token=zFKIBdhrdQZjTnSpUJtslUGbAvxTF9JanXZpFyhzBtYBaCx1kbI'
var vdata;
var gData;
var nEvents
var url1 = "https://api.pandascore.co/lol/matches/upcoming?filter[league_id]="
var url2 = "&token=zFKIBdhrdQZjTnSpUJtslUGbAvxTF9JanXZpFyhzBtYBaCx1kbI"
var realUrl = '';
var temp1;

/*header('Access-Control-Allow-Origin: https://api.pandascore.co')
header('Access-Control-Allow-Credentials: true')*/

function getData(){
	$.getJSON(url, function(data){
		vdata = data;
		nEvents = Object.keys(vdata).length
		realUrl = url1 + vdata[0].id + url2
		cloneEvents()
		getMatches()
	});
}

function getMatches(){
	$.getJSON(realUrl, function(dataM){
	gData = dataM
	gEvents = Object.keys(gData).length
	cloneMatches()
	});
}

function replaceDataEvents(){
	for (var i = 0; i <= nEvents - 1; i++) {
		changeImg('#img' + i, vdata[i].image_url)
		changeText('#name' + i, vdata[i].name)
	};
}

function replaceDataMatches(){
	for (var i = 0; i <= gEvents - 1; i++) {
			changeImg('#op0-' + i, gData[i].opponents[0].opponent.image_url)
			changeImg('#op1-' + i, gData[i].opponents[1].opponent.image_url)
			changeText('#op0t-' + i, gData[i].opponents[0].opponent.name)
			changeText('#op1t-' + i, gData[i].opponents[1].opponent.name)
			changeText('#date-' + i,gData[i].begin_at.replace('Z',' ').replace('T',' '))
			
		};
}


function cloneEvents(){
	var num = 0
	for (var i = nEvents; i > 0; i--) {
		$(".main").clone(true).appendTo( ".events").attr("class", 'info').attr('id', num);
		$("#"+num).children("#img1").attr( "id", "img"+num );
		$("#"+num).find(".name").attr( "id", "name"+num );

		num++;
	}
	replaceDataEvents()
}

function cloneMatches(){
	var numM = 0
	for (var i = gEvents; i > 0; i--) {
		$("#cloneM").clone(true).appendTo( ".matches").attr("class", 'games').attr('id', numM  + 'M');
		$("#"+numM + 'M').children("#op0-img1").attr( "id", "op0-"+numM );
		$("#"+numM + 'M').children("#op1-img1").attr( "id", "op1-"+numM );
		$("#"+numM + 'M').children(".first-challanger-name").attr( "id", "op0t-"+numM );
		$("#"+numM + 'M').children(".second-challanger-name").attr( "id", "op1t-"+numM );
		$("#"+numM + 'M').children(".date").attr( "id", "date-"+numM );
		numM++;
	}
	replaceDataMatches()
}

function removeOldMatches(){
	for (var i = gEvents; i >= 0; i--) {
		$("#"+ i + 'M').remove()
	}
}

function changeImg(element,data){
	$(element).attr('src',data)
}

function changeText(element,data){
	$(element).text(data)
}
var OldClick = '';
$(document).on('click', ".info", function(){
	if (OldClick == '') {
		$(this).attr('class','active')
		OldClick = $(this)
	}else{
		$(OldClick).attr('class','info')
		$(this).attr('class','active')
		OldClick = $(this)
	}
	
	temp1 = parseInt(($(this).attr('id')))
	realUrl = url1 + vdata[temp1].id + url2
	removeOldMatches()
	getMatches()
});

getData()

