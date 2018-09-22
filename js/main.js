$( function() {
	$( "#sortable" ).sortable();
} );

// Fieltered search start

function fielteredSearch() {
	var input, filter, i,list,allName=[],findList=[],findItem=[],index;
	
	list=JSON.parse(localStorage.getItem("content"));

	for (var i = 0; i < list.length; i++) {
		allName.push(list[i].name);
	}

	input = document.getElementById("search").value;

	if (input != '') {
		document.getElementById("emptyBtn").innerHTML = "<img src='images/delete.png'>";

		const filterItems = (query) => {
		  return allName.filter((el) =>
		    el.toLowerCase().indexOf(query.toLowerCase()) > -1
		  );
		}

		findItem=filterItems(input);
		var findTotal=findItem.length;

		for (i = 0; i < findItem.length; i++) {
			if (allName.includes(findItem[i])) {
				index=allName.indexOf(findItem[i]);
				findList.push(list[index]);
			}
		}
		var fieltered=document.getElementById("fieltered");
		fieltered.innerHTML="<p>"+findTotal+" Fieltered Result</p>";

		var ul = document.getElementById("sortable");
			ul.innerHTML = "";
		loadList(findList);
	}else{
		document.getElementById("fieltered").innerHTML = "";
		document.getElementById("emptyBtn").innerHTML = "";
	}
}
// Fieltered search end

function emptyInput(){
	document.getElementById("search").value='';
	var ul = document.getElementById("sortable");
		ul.innerHTML = "";
	document.getElementById("fieltered").innerHTML = "";
	document.getElementById("emptyBtn").innerHTML = "";
	loadList();
}

// Sidebar List Start

function loadList(queryItem=null){
	if (queryItem) {
		var list=queryItem;
	}else{
		var list=JSON.parse(localStorage.getItem("content"));
	}
	
	if (list) {
		for (var i = 0; i < list.length; i++) {
		var listContent="<a id='"+list[i].id+"' onclick='getData(this,"+list[i].id+")'>";
		// var listContent="<a onclick=''>";
		listContent+="<div class='list-left'>";
		listContent+="<span><img src='images/li_img.png'>";
		listContent+="</span><p>";
		listContent+=list[i].name;	
		listContent+="</p></div>";
		listContent+="<div class='list-right'>";	
		listContent+="<img src='images/checkbox.png'>";
		listContent+="<img src='images/delete.png' onclick='delData("+list[i].id+")'>";
		listContent+="</div>";
		listContent+="</a>";

		var node = document.createElement("li");
		// alert(node);
	    node.innerHTML = listContent;
	    document.getElementById("sortable").appendChild(node);
	}
	}
}
// Sidebar List End

loadList();

// Get Tab Content Start

function getData(elem,id){
	var list=JSON.parse(localStorage.getItem("content"));

	for (var i = 0; i < list.length; i++) {
		if (list[i].id==id) {
			var name_content="<h2>Name:"+list[i].name+"</h2>";
				name_content+="<p>Age:"+list[i].age+"</p>";
			document.getElementById("name-content").innerHTML=name_content;

			var about_content="<h2>About:"+list[i].about+"</h2>";
			document.getElementById("about-content").innerHTML=about_content;
			break;
		}
	}
	var matches = document.querySelectorAll("#sortable li");

	for (var i = 0; i < matches.length; i++) {
		matches[i].removeAttribute("style");
	}


	var parent=elem.parentNode.style;
		parent.background= "#454545";
		parent.color= "#fff";
		
}

// Get Tab Content End

// Content List Delete Start
function delData(id){
	con= confirm("Are you sure delete the data??");

	if (con) {
		var list=JSON.parse(localStorage.getItem("content"));

		for (var i = 0; i < list.length; i++) {
			if (list[i].id==id) {
				list.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("content", JSON.stringify(list));
		var elem=document.getElementById (id); 
		
		elem.parentNode.animate([
				  { transform: 'translateX(0px)' }, 
				  { transform: 'translateX(-400px)' }
				], { 
				  duration: 1000
				});
		setTimeout(function(){
			var ul = document.getElementById("sortable");
					ul.innerHTML = "";
			 	loadList();
			}, 
		1000);
		document.getElementById("name-content").innerHTML='';
		document.getElementById("about-content").innerHTML='';


	}else{
		return false;
	}

}
// Content List Delete End




// Content information save Start
function saveData(){
	var c_name=document.getElementById("c_name").value;
	var c_age=document.getElementById("c_age").value;
	var c_about=document.getElementById("c_about").value;
	if (c_name =='' || c_age=='' || c_about =='') {
		alert("please fillup all field");
	}else{		
		var storedNames = JSON.parse(localStorage.getItem("content"));

		var infoObj={
			id:1,
			name:c_name,
			age:c_age,
			about:c_about
		}
		if (storedNames && storedNames.length>0) {
			var indexNo=storedNames.length;
			var id=storedNames[indexNo-1].id;
			infoObj.id=id+1;
			storedNames.push(infoObj);
			localStorage.setItem("content", JSON.stringify(storedNames));
		}else{
			infoObj.id=1;
			var infoArr=[infoObj];
			localStorage.setItem("content", JSON.stringify(infoArr));
		}

		var modal = document.getElementById('myModal');
		 	modal.style.display = "none";
		 	var ul = document.getElementById("sortable");
				ul.innerHTML = "";
		 	loadList();
		 	c_name=document.getElementById("c_name").value='';
			c_age=document.getElementById("c_age").value='';
			c_about=document.getElementById("c_about").value='';

	}
}
// Content information save End

// Tab Option start

function tabOption(active,deactive){

	var deactiveTab = document.getElementById(deactive);
		deactiveTab.classList.add("list-item");
		deactiveTab.classList.remove("active");	

	var activeTab = document.getElementById(active);
		activeTab.classList.add("active");
		activeTab.classList.remove("list-item");

	var content_show=document.getElementById(active+"-content");
		content_show.style.display = "block";

	var content_hide=document.getElementById(deactive+"-content");
		content_hide.style.display = "none";
		
}

// Tab Option end


// Get the modal

function modalOpen(){
	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];
	
	modal.style.display = "block";

	span.onclick = function() {
	    modal.style.display = "none";
	}
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
}
