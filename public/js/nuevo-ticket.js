
// Referecias HTML
const lblNuevoTicket = document.getElementById('lblNuevoTicket');
const btnCrear = document.querySelector('button');


const socket = io();

// socket.on -> Sirve para escuchar un evento
// socket.emit -> Sirve para emitir un evento

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', (ticket) => {
    lblNuevoTicket.innerText = `Ticket ${ticket}`;
});

// Emitir desde el cliente - Escuchar en el servidor
btnCrear.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });

});