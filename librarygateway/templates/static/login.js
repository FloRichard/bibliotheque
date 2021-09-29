
document.forms['logForm'].addEventListener('submit', (event) => {
    event.preventDefault()
    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)) // event.target is the form
    }).then((resp) => {
        console.log("Response")
        resp.json().then((responseBody) => {
            sessionStorage.setItem("id",responseBody.id)
            sessionStorage.setItem("token", responseBody.token)
            console.log("body retrieved : ", responseBody)
        })

        const url='http://localhost:8080/library/';
        window.location.replace(url)

    }).catch((error) => {
        console.log("error" + error)
        window.alert("heho")
        alert("Wrong credentials")
    });
});
