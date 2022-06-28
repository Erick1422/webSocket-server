const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // Se disparan cuando un cliente se conecta
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    // Aquí se escucha este socket
    socket.on('siguiente-ticket', (payload, callback) => {

        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        // Le envía el mensaje a todos los clientes conectados, menos al que lo envío
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    });

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        // Se notifica a la pantalla que escucha este evento

        // De esta manera se realiza el cambio en todas las pantallas
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });
}

module.exports = {
    socketController
}