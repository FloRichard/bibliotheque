function handleLogForm(event){
    event.preventDefault()
    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)) // event.target is the form
    }).then((resp) => {
        if (resp.status != 200) {
            alert(resp.statusText)
            console.log("wrong status code")
            return
        }

        resp.json().then((responseBody) => {
            sessionStorage.setItem("id",responseBody.id)
            sessionStorage.setItem("token", responseBody.token)
            sessionStorage.setItem("roles",responseBody.roles)
            console.log("body retrieved : ", responseBody)
        })

        const url='http://localhost:8080/library/';
        window.location.replace(url)
    }).catch((error) => {
        console.log("error" + error)
        
    });
}
