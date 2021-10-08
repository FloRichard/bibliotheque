window.onload = function() {
	let rawRoles  = sessionStorage.getItem('roles')
	let roles = rawRoles.split(',')
	if (roles.includes('administrator')){
		showAdmin()
	}else{
		deleteAdmin()
	}
};

function deleteAdmin(){
	$(".admin").remove();
}

function showAdmin(){
	$(".admin").css("visibility","visible");
}