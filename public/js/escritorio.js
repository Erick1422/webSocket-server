
//Referencias HTML
const lblEscritorio = document.querySelector('h1'),
    lblTicket = document.querySelector('small'),
    btnAtender = document.querySelector('button'),
    divAlert = document.querySelector('.alert'),
    lblPendientes = document.getElementById('lblPendientes');

//De esta forma se capturan los parametros de la ruta
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlert.style.display = 'none';

const socket = io();

// socket.on -> Sirve para escuchar un evento
// socket.emit -> Sirve para emitir un evento

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ticket) => {
    // lblNuevoTicket.innerText = `Ticket ${ticket}`;
});

socket.on('tickets-pendientes', (pendientes) => {
    lblPendientes.textContent = pendientes;
})

// Emitir desde el cliente - Escuchar en el servidor
btnAtender.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.textContent = 'Nadie';
            divAlert.style.display = '';
            divAlert.querySelector('span').textContent = msg;
            return;
        }
        lblTicket.textContent = 'Ticket ' + ticket.numero;
    });

    /* 
    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    }); */

});