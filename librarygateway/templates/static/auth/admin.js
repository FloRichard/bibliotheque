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



function updateUser(){
    let roleArray = document.getElementById("rolesSelectUpdate").value.split(',')
    options = {
        url: 'http://'+window.location.hostname+':8081/auth/user/',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': sessionStorage.getItem('token')
        },
        data: {
            first_name: document.getElementById('firstNameUpdate').value,
            last_name: document.getElementById('lastNameUpdate').value ,
            roles: roleArray,
            id: document.getElementById('userIDUpdate').value
        }
    };

    axios(options)
    .then(response => {
        console.log("Update user "+ response.status);
        $('#modalUpdateUser').modal('hide');
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

function logout(){
    let token = sessionStorage.getItem('token')
    options = {
        url: 'http://' + window.location.hostname + ':8081/auth/logout?token='+token,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': sessionStorage.getItem('token')
        },
    };

    axios(options)
    .then(response => {
        console.log(response.status);
        sessionStorage.clear()
        const url='http://localhost:8080/auth/login';
        window.location.replace(url)
    })
}
