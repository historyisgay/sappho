var inlineJson = "";
var googleStart = "https://www.google.com/search?q=sappho+fragment+";
var googleEnd = "&sxsrf=ACYBGNRs5SPR8tdyPYwYKfQUsMCwMHurxw:1583119192972&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj-kInJ6vrnAhX9mXIEHVzeCq8Q_AUoAXoECBgQAw&biw=1396&bih=686"

function getJson()
{
	fetch('./js/static.json')
	  .then((response) => {
		return response.json();
	  })
	  .then((data) => {
		inlineJson = JSON.stringify(data);
	  });
}

function generate(poem, fragments, number)
{
	var inlineTag = document.getElementById(poem)
	//var fragmentTag = document.getElementById(fragments)
	inlineTag.innerHTML = "";
	
	//we mangle these between goes to keep from getting dups
	var inline = JSON.parse(inlineJson);
	
	var inlineProse = "";
	var fragmentsHtml = ""
	var frags = document.getElementById(number).value;
	for(var i = 0; i < frags && inline.length > 0; i++) 
	{
		var index = getIndex(inline.length);
		inlineProse = inlineProse + "<span>" + inline[index].text + "</span>";
		fragmentsHtml = fragmentsHtml + "<p class='fragmentText'>Fragment " + inline[index].fragment + ": " + inline[index].text + "</p>";
		remove(inline,index);
	}
	//fragmentTag.innerHTML = fragmentsHtml;
	ShowMessage(inlineTag, inlineProse);
}

function ShowMessage(tag, message)
{
	tag.style.opacity = 0;
	tag.innerHTML = message;
	var textWrapper = document.querySelector(tag.id + ' span');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
	anime.timeline({loop: false})
	  .add({
		targets: '.poem .letter',
		opacity: [0,1],
		easing: "easeInOutQuad",
		duration: 600,
		delay: (el, i) => 50 * (i+1)
	  });
	  tag.style.opacity = 1; 
}

function remove(arr,index)
{
	arr.splice(index,1);
}

function getIndex(lim)
{
	var index = Math.floor(Math.random() * lim);
	if(index >= lim)
		return lim -1;
		
	return index;
}
window.onload = getJson();