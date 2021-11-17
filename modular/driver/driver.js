'use strict';

const io = require('socket.io-client');

/* ------ CONNECT ---------- */
const host = 'http://localhost:3000';
const capsConnection = io.connect(`${host}/system`);

/* ------ Listener ---------- */
capsConnection.on('order', order);
// capsConnection.on('delivered', delivered);
// capsConnection.on('pickedUp', pickedUp);

capsConnection.emit('get_all');


/* ------ Function ---------- */

function order(payload) {
    console.log(`customer received the order, ${payload.id}`);
    // 5
    setTimeout(() => {
        // console.log(`DRIVER: picked up ${payload.id}`);
        capsConnection.emit('in-transit', JSON.stringify (payload));

    }, 1000);

    setTimeout(() => {
        // console.log(`DRIVER: delivered ${payload.id}`);
        capsConnection.emit('deleverd', JSON.stringify (payload));

    }, 1500);

   
    capsConnection.emit('received', payload)
    // capsConnection.disconnect();
};


