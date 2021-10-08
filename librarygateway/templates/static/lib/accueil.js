window.onload = function() {
	checkConnection()
	let rawRoles  = sessionStorage.getItem('roles')
	if(rawRoles) {
		let roles = rawRoles.split(',')
		if (roles.includes('administrator')){
			showAdmin()
			return
		}
	}
	deleteAdmin()
};

function deleteAdmin(){
	$(".admin").remove();
}

function showAdmin(){
	$(".admin").css("visibility","visible");
}