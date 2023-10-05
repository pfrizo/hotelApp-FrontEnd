function loadRooms(){
    room1 = document.getElementById("room1");
    room2 = document.getElementById("room2");
    room3 = document.getElementById("room3");

    loadRoom(1, room1);
    loadRoom(2, room2);
    loadRoom(3, room3);
}

function loadRoom(id, cardId){
    fetch(`http://localhost:8090/api/rooms/${id}`)
    .then(res => res.json())
    .then(res => printRoom(res.object, cardId));
}

function getRoom(id){
    fetch(`http://localhost:8090/api/rooms/${id}`)
    .then(res => res.json())
    .then(res => {return res.object})
}

function printRoom(room, cardId){
    
    let data = `<h2>${room.name}</h2>
            <p>${room.desc}</p>
            <p>Tamanho: ${room.size}</p>
            <p>Quantidade de pessoas recomendada: ${room.guests}</p>
            <p>R$ ${room.dailyValue}</p>`

    cardId.innerHTML = data;
}