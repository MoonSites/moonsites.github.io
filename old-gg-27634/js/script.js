function change() {
	var lable = document.getElementsByClassName('onoffswitch-checkbox');
	var textChangeColorClass = $('.authors');
	if ($(this).width() > 900) textChangeColorClass = $('.text')
	if (lable[0].checked) {
		//night
		$('.body').css("background", "radial-gradient(at top,#00011a,#000)"); //фон body
		textChangeColorClass.css("color", "#BFB7AD");									//цвет текста
		$('#two').css("filter", "hue-rotate(65deg) brightness(85%)");   /*img about night mode*/
		$('#fourTitle').css("color", "#BFB7AD");	
		$('.fourtext').css("color", "#BFB7AD");

	} else {
		$('.body').css("background", "radial-gradient(at top,#FFCC80,#FFAB40)"); //фон body
		textChangeColorClass.css("color", "#0f0f0f");										//цвет текста
		$('#two').css("filter", "");
		$('#fourTitle').css("color", "#0f0f0f");
		$('.fourtext').css("color", "#0f0f0f");

	}
}

function to(id) {
	i = 2;
	slowScroll(id);
	// window.scrollTo(0, document.documentElement.clientHeight*2*0.78)	//одна страница 78%
}

function func() {
  document.getElementsByClassName('flat')[0].className  = "flat2";
}

setTimeout(func, 2000);

var n = 0;
var i = 0;
var fY = window.pageYOffset;
var ids = ['#oneTitle','#twoTitle', '#threeTitle', '#fourTitle'];
var scrolled = true
window.onscroll = function() {
  n++;
  if (scrolled) {
	 if (window.pageYOffset > fY) { 
  		if (n == 5) {
  			i++;
  			if (i > 3) i = 3;
  			slowScroll(ids[i], false);
  		}
  	} else {
  		if (n == 5) {
  			i--;
  			if (i < 0) i = 0;
  			slowScroll(ids[i], true);
  		}
  	}
  }
}
 

function changeBack() {
	var num = i+1
	$('.img').first().css({
		background: "url('res/"+ num +".gif')",
		backgroundSize: "cover"
	});
}

function slowScroll (id, changed) {
	var time = 1000;
	if (changed) changeBack();
	var offset = $('#head').height();
	scrolled = false;
	$('html, body').animate ({
 		scrollTop: $(id).offset ().top - offset
	}, time);
	
	setTimeout(function() {
		scrolled = true;
		fY = window.pageYOffset;
		n = 0;
		if (!changed) changeBack();
	}, time)
return false;
}

