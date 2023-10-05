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
    .catch(err => console.log(err.message))  
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
                    <div class="reservation-info" id="client-${reservation.id}">
                        <h2>ID: ${reservation.id}</h2>
                        <p>Nome Cliente: ${reservation.user.firstName} ${reservation.user.lastName}</p>
                        <p>CPF: ${reservation.user.cpf} | E-mail: ${reservation.user.email}</p>
                        <p>Check-In: ${reservation.checkIn} | Check-Out: ${reservation.checkOut}</p>
                        <p>Adulto(s): ${reservation.adultNum} | Criança(s): ${reservation.childNum}</p>
                        <p>Quarto: ${reservation.room.name} | Valor: ${reservation.price}</p>
                    </div>
                </div>
            </section>`
    }

    cards += `<a href="reservations.html" class="info-button">Menu</a>`;
    
    let main = document.getElementById("main");
    main.innerHTML = cards;
}