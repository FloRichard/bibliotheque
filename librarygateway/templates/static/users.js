

const options = {
    url: 'http://' + window.location.hostname + ':8080/auth/user/',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
        first_name:"Julien",
        last_name: document.getElementById("lastName").value,
        login:"flo",
        pwd:"flo",
        roles: [
            "borrowing",
            "non"
        ]
    }
};



function addUser(){
    axios(options)
    .then(response => {
        console.log(response.status);
    })
}