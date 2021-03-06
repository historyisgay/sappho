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
		generate();
	  });
}

function generate()
{
	var inlineTag = document.getElementById("poem");
	
	// Get and remove all spans
	var spans = inlineTag.getElementsByTagName("SPAN");
	while (spans[0]) spans[0].parentNode.removeChild(spans[0]);
	
	//we mangle these between goes to keep from getting dups
	var inline = JSON.parse(inlineJson);
	
	var inlineProse = "";
	//var fragmentsHtml = ""
	var frags = document.getElementById("fragments").value;
	if(frags < 1)
		frags = 1;
	
	for(var i = 0; i < frags && inline.length > 0; i++) 
	{
		var index = getIndex(inline.length);
		inlineProse = inlineProse + "<span>" + formatText(inline[index].text, 0) + "</span>";
		//fragmentsHtml = fragmentsHtml + "<p class='fragmentText'>Fragment " + inline[index].fragment + ": " + inline[index].text + "</p>";
		remove(inline,index);
	}
	//fragmentTag.innerHTML = fragmentsHtml;
	inlineTag.innerHTML += inlineProse;
}

function formatText(words, counter)
{
	if(counter == 0)
	{
		let trimmed = words.trim();
		return " " + trimmed[0].toUpperCase() + trimmed.slice(1) + " ";
	}
		
	
	return words;
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