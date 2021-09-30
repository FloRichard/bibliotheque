function addUser(){
    options = {
        url: 'http://' + window.location.hostname + ':8080/auth/user/',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': sessionStorage.getItem('token')
        },
        data: {
            first_name: document.getElementById("firstName").value,
            last_name: document.getElementById("lastName").value,
            login: document.getElementById("pass").value,
            pwd:document.getElementById("firstName").value,
            roles: [
                "oui",
                "non"
            ]
        }
    };

    axios(options)
    .then(response => {
        console.log(response.status);
    })
}