function checkConnection(){
    if (sessionStorage.getItem('token') === null){
        window.alert("Vous n'êtes pas connecté. Vous allez être redirigé vers la page de connection.")
        const url='http://localhost:8080/auth/login';
        window.location.replace(url)
    }
}