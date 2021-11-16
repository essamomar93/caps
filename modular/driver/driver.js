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

// function pickedUp(payload){
//     console.log(`delivered ${payload.orderID}`);
//     setTimeout(() => {
//         capsConnection.emit('in-transit', payload);
//     }, 1000);
// };

function order(payload) {
    console.log(`customer received the order, ${payload.id}`);
    // 5
    capsConnection.emit('received', payload)
    setTimeout(() => {
        capsConnection.emit('deleverd', payload);
    }, 1500);
    setTimeout(() => {
        capsConnection.emit('in-transit', payload);
    }, 1000);
};

// function delivered(payload){
//     console.log(`DRIVER: delivered ${payload.orderID}`);
//     setTimeout(() => {
//         capsConnection.emit('deleverd', payload);
//     }, 1500);
// };
