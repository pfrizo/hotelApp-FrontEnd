function loadUsers(){
    fetch("http://localhost:8090/api/users/listAll")
    .then(res => res.json())
    .then(res => printUsers(res.object));
}

function printUsers(list){
    let cards = "";
    for (let client of list) {
        formatCpf(client.cpf)
        cards +=
            `<section class="user-section">
                <div class="user-card">
                    <div class="user-info" id="client-${client.id}">
                        <h2>${client.firstName} ${client.lastName}</h2>
                        <p>E-mail: ${client.email}</p>
                        <p>CPF: ${client.cpf}</p>
                    </div>
                </div>
            </section>`
    }

    cards += `<a href="../management-index.html" class="info-button">Menu</a>`;
    
    let main = document.getElementById("main");
    main.innerHTML = cards;
}

function formatCpf(cpf){
    return cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9);
}

function getUser(id){
    fetch(`http://localhost:8090/api/users/${id}`)
    .then(res => res.json())
    .then(res => loadUser(res.object));
}

function loadUser(obj){
    firstName = document.getElementById("first-name");
    lastName = document.getElementById("last-name");
    email = document.getElementById("email");
    cpf = document.getElementById("cpf");
    password = document.getElementById("password");

    firstName.value = obj.firstName;
    lastName.value = obj.lastName;
    email.value = obj.email;
    cpf.value = formatCpf(obj.cpf);
    password.value = obj.password;
}

function updateUser(){
    const confirmacao = confirm('Tem certeza de que deseja alterar suas informações?');
    if (!confirmacao) {
        return;
    }

    firstName = document.getElementById("first-name").value;
    lastName = document.getElementById("last-name").value;
    email = document.getElementById("email").value;
    cpf = document.getElementById("cpf").value;
    password = document.getElementById("password").value;

    let obj = {
        id: localStorage.getItem('id'),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        cpf: cpf,
    };

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        mode: 'no-cors'
    };

    let url = `http://localhost:8090/api/users/${localStorage.getItem('id')}`;
    fetch(url, {
        headers: headers,
        method: "PUT",
        body: JSON.stringify(obj)
    })
    .then(res => res.text())
    .then(res => { console.log(res); return res})
    .then(res => alert("Informações alteradas com sucesso!"))
    .catch(err => alert(err.message))
}