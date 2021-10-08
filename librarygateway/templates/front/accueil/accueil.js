window.onload = function() {
	deleteAdmin()
};

function deleteAdmin(){
	$(".admin").remove();
}

function showAdmin(){
	$(".admin").css("visibility","visible");
}