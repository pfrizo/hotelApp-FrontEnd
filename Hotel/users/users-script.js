function loadUsers(){
    fetch("http://localhost:8090/api/users/listAll")
    .then(res => res.json())
    .then(res => printUsers(res.object));
}

function printUsers(list){
    let cards = "";
    for (let client of list) {
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