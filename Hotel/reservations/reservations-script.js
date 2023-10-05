function registerReservation(){
    cpf = document.getElementById("cpf").value;
    email = document.getElementById("email").value;
    checkIn = document.getElementById("check-in").value;
    checkOut = document.getElementById("check-out").value;
    adultNum = document.getElementById("adult-num").value;
    childNum = document.getElementById("child-num").value;
    room = document.getElementById("room-combobox").value;
    price = document.getElementById("price");

    let obj = {
        cpf: cpf,
        email: email,
        checkIn: checkIn,
        checkOut: checkOut,
        adultNum: adultNum,
        childNum: childNum,
        room: room
    };

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        mode: 'no-cors'
    };
    let url = "http://localhost:8090/api/reservations/register";
    fetch(url, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(obj)
    })
    .then(res => res.text())
    .then(res => { console.log(res); return res})
    .then(alert("Reserva cadastrada"))
    .then(res => {if(!res.status != "OK"){
        console.log("erro");
    }
    redirectToHome();})
    .catch(err => console.log(err.message))  
}

function redirectToHome(){
    window.location.href = "../index.html"
}

function loadReservations(){
    fetch("http://localhost:8090/api/reservations/listAll")
    .then(res => res.json())
    .then(res => printReservations(res.object));
}

function printReservations(list){
    let cards = "";
    for (let reservation of list) {
        cards +=
            `<section class="reservation-section">
                <div class="reservation-card">
                    <div class="reservation-info" id="reservation-${reservation.id}">
                        <p><h2>ID: ${reservation.id}<i class="fa fa-close w3-right" onclick="deleteReservation(${reservation.id})"></i>
                                                    <i class="fa fa-edit w3-right"></i></h2></p>
                        <p>Nome Cliente: ${reservation.user.firstName} ${reservation.user.lastName}</p>
                        <p>CPF: ${reservation.user.cpf}</p>
                        <p>E-mail: ${reservation.user.email}</p>
                        <p>Check-In: ${reservation.checkIn}</p>
                        <p>Check-Out: ${reservation.checkOut}</p>
                        <p>Adulto(s): ${reservation.adultNum} | Criança(s): ${reservation.childNum}</p>
                        <p>Quarto: ${reservation.room.name} | Valor: R$${reservation.price},00</p>
                    </div>
                </div>
            </section>`
    }

    cards += `<a href="reservations.html" class="info-button">Menu</a>`;
    
    let main = document.getElementById("main");
    main.innerHTML = cards;
}

function deleteReservation(id){
    const confirmation = confirm('Tem certeza de que deseja excluir esta reserva?');
    if (!confirmation) {
        return;
    }

    fetch(`http://localhost:8090/api/reservations/${id}`, {method: 'DELETE'})
        .then(res => res.json)
        .then(alert("Reserva excluída com sucesso!"))
        .then(loadReservations())
        .catch(err => alert(err.message));
}

function redirectToUpdate(){
    window.location = "reservations-update.html";
}

function updateReservation(id){


    redirectToUpdate();
}