window.onload = function() {
	checkConnection()
	
	let rawRoles  = sessionStorage.getItem('roles')
	if(rawRoles) {
		let roles = rawRoles.split(',')
		if (roles.includes('administrator')){
			showAdmin()
		}else{
			deleteAdmin()
		}
		if(roles.includes('borrow')){
			showBorrowing()
		}else{
			deleteBorrowing()
		}
		return
	}
	deleteBorrowing()
	deleteAdmin()
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