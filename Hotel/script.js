let user = {
    firstName: "pedro",
    lastName: "frizo",
    email: "jfdh",
    cpf: "12232"
};

/*function loadHome(){
    if(user.firstName != null){
        let home = document.getElementById('home-bar')

        home.innerHTML = `<a href="#" class="w3-bar-item w3-button w3-red w3-mobile"><i class="fa fa-bed w3-margin-right"></i>HOTEL</a>
                        <a href="#quartos" class="w3-bar-item w3-button w3-mobile">Quartos</a>
                        <a href="#sobre" class="w3-bar-item w3-button w3-mobile">Sobre</a>
                        <a href="#contato" class="w3-bar-item w3-button w3-mobile">Contato</a>
                        <a href="#" class="w3-bar-item w3-button w3-right w3-light-grey w3-mobile w3-border w3-border-white" onclick="logout()">Olá, ${user.firstName}</a>
                        <a href="#contato" class="w3-bar-item w3-button w3-right w3-light-grey w3-mobile w3-border w3-border-white">Reserve Agora</a>`
    }
}*/


function registerUser() {

    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let cpf = document.getElementById("cpf");
    let email = document.getElementById("email");
    let password = document.getElementById("password")


    let obj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        cpf: cpf.value
    };

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        mode: 'no-cors'
    };
    let url = `http://localhost:8090/api/users/register`;
    fetch(url, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(obj)
    })
    .then(res => res.text())
    .then(res => { console.log(res); return res})
    .then(alert("Inserido com sucesso"))
    .then(res => {
        if(!res.status != "OK"){
            console.log("erro");
        }
        redirectToLogin();
    })
    .catch(err => console.log(err.message))
}


function login(){
    let email = document.getElementById("email");
    let password = document.getElementById("password")

    let obj = {
        email: email.value,
        password: password.value
    }

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        mode: 'no-cors'
    };
    let url = `http://localhost:8090/api/users/login`;
    fetch(url, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(obj)
    })
    .then(res => res.text())
    .then(res => { console.log(res); return res})
    /*.then(res => newUser(res.object))*/
    .then(res => {
        if(!res.status != "OK"){
            console.log("erro");
        }
        redirectToHome();
    })
    .catch(err => console.log(err.message))
}

function newUser(object){
    user.firstName = object.firstName;
    user.lastName = object.lastName;
    user.email = object.email;
    user.cpf = object.cpf;

    console.log(user)
}

function logout(){
    let conf = confirm("Deseja realmente sair?")

    if(conf){
        user.firstName = null;
        /*redirectToHome();*/
    }
}

function redirectToHome(){
    window.location.href = '../index.html';
}

function redirectToLogin(){
    window.location.href = 'login.html'
}