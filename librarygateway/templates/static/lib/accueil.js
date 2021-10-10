window.onload = function() {
	checkConnection()
	let rawRoles  = sessionStorage.getItem('roles')
	if(rawRoles) {
		let roles = rawRoles.split(',')
		if (roles.includes('administrator')){
			showAdmin()
			return
		}
		if(roles.includes('borrow')){
			showBorrowing()
			return
		}
	}
	deleteAdmin()
	deleteBorrowing()
};

function deleteAdmin(){
	$(".admin").remove();
}

function showAdmin(){
	$(".admin").css("visibility","visible");
}

function deleteBorrowing(){
	$(".borrow").remove();
}

function showBorrowing(){
	$(".borrow").css("visibility","visible");
}