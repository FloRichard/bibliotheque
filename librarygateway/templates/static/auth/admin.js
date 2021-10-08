function addUser(){
    let roleArray = document.getElementById("rolesSelect").value.split(',')
    console.log(roleArray)
    options = {
        url: 'http://'+window.location.hostname+':8081/auth/user/',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': sessionStorage.getItem('token')
        },
        data: {
            first_name: document.getElementById("firstName").value,
            last_name: document.getElementById("lastName").value,
            login: document.getElementById("login").value,
            pwd: document.getElementById("pass").value,
            roles: roleArray
        }
    };

    axios(options)
    .then(response => {
        console.log(response.status);
        $('#modalRegisterForm').modal('hide');
    })
}

function deleteUser(userID){
    options = {
        url: 'http://' + window.location.hostname + ':8081/auth/user/'+userID,
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': sessionStorage.getItem('token')
        },
    };

    axios(options)
    .then(response => {
        console.log(response.status);
    })
}