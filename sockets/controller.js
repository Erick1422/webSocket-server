
const socketController = (socket) => {

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
    });

    // Aquí se escucha este socket
    socket.on('enviar-mensaje', (payload, callback) => {

        const id = 123456;
        callback(id);
        // Le envía el mensaje a todos los clientes conectados, menos al que lo envío
        socket.broadcast.emit('enviar-mensaje', payload);
    })
}

module.exports = {
    socketController
}