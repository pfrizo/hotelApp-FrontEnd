let user = {
    id: localStorage.getItem('id'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    email: localStorage.getItem('email'),
    cpf: localStorage.getItem('cpf')
};

function registerReservation(){
    checkIn = document.getElementById("check-in").value;
    checkOut = document.getElementById("check-out").value;
    adultNum = document.getElementById("adult-num").value;
    childNum = document.getElementById("child-num").value;
    room = document.getElementById("room-combobox").value;
    price = document.getElementById("price");

    let obj = {
        checkIn: checkIn,
        checkOut: checkOut,
        adultNum: adultNum,
        childNum: childNum,
        userId: user.id,
        room: room
    };

    console.log(obj);

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
    .then(res => {if(res.status !== "OK"){
        console.log("erro");
    }
    })
    .then(alert("Reserva cadastrada"))
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

function getReservation(id){
    fetch(`http://localhost:8090/api/reservations/${id}`)
    .then(res => res.json())
    .then(res => loadReservation(res.object));
}

function loadReservation(obj){
    checkIn = document.getElementById("check-in");
    checkOut = document.getElementById("check-out");
    adultNum = document.getElementById("adult-num");
    childNum = document.getElementById("child-num");
    room = document.getElementById("room-combobox");
    price = document.getElementById("price");

    checkIn.value = obj.checkIn;
    checkOut.value = obj.checkOut;
    adultNum.value = obj.adultNum;
    childNum.value = obj.childNum;
    room.value = obj.room.id;
    price.value = obj.price;
}

function printReservations(list){
    let cards = "";
    for (let reservation of list) {
        cards +=
            `<section class="reservation-section">
                <div class="reservation-card">
                    <div class="reservation-info" id="reservation-${reservation.id}">
                        <p><h2>ID: ${reservation.id}<i class="fa fa-close right" onclick="deleteReservation(${reservation.id})"></i>
                                                    <i class="fa fa-edit right" onclick="goToUpdate(${reservation.id})"></i></h2></p>
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
    window.location.href = "reservations-update.html";
}

function goToUpdate(id){
    localStorage.setItem('reservationId', id);
    redirectToUpdate();
}

function checkLogin(){
    console.log("ID do usuário:", user.id);
    if (user.id === null){
        alert("Para acessar esta página, é necessário estar logado!");
        redirectToHome();
    } else {
        console.log(user);
    }
}

function priceCalc(){
    priceInput = document.getElementById('price-txt');

    priceInput.innerHTML = `<label><i class="fa fa-money"></i> Preço</label>
                            <input class="w3-input w3-border" style="border-radius: 5px;" type="number" placeholder="" id="price" disabled>`
    
    checkIn = document.getElementById("check-in").value;
    checkOut = document.getElementById("check-out").value;
    room = document.getElementById("room-combobox").value;
    pricetxt = document.getElementById("price");
    let price;

    let days = calcDays(checkIn, checkOut);
    
    if(room == 1){
        price = days * 150;
    } else if (room == 2){
        price = days * 200;
    } else if (room == 3){
        price = days * 300
    }

    pricetxt.value = price;
}

function calcDays(d1, d2){
    var date1 = new Date(d1);
    var date2 = new Date(d2);

    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    var difference_ms = Math.abs(date1_ms - date2_ms);
    
    return Math.round(difference_ms / (1000 * 60 * 60 * 24));
}

function updateReservation(){
    const confirmacao = confirm('Tem certeza de que deseja atualizar esta reserva?');
    if (!confirmacao) {
        return;
    }

    checkIn = document.getElementById("check-in").value;
    checkOut = document.getElementById("check-out").value;
    adultNum = document.getElementById("adult-num").value;
    childNum = document.getElementById("child-num").value;
    room = document.getElementById("room-combobox").value;

    let obj = {
        checkIn: checkIn,
        checkOut: checkOut,
        adultNum: adultNum,
        childNum: childNum,
        userId: user.id,
        room: room
    };

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        mode: 'no-cors'
    };

    let url = `http://localhost:8090/api/reservations/${localStorage.getItem('reservationId')}`;
    fetch(url, {
        headers: headers,
        method: "PUT",
        body: JSON.stringify(obj)
    })
    .then(res => res.text())
    .then(res => { console.log(res); return res})
    .then(res => alert("Reserva atualizada com sucesso!"))
    .catch(err => alert(err.message))
}