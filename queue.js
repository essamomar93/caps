'use strict';

// const io = require('socket.io')(PORT);

const PORT = process.env.PORT || 3000;

const caps = require('socket.io')(PORT);

const capsConnection = caps.of('/system');
const uuid = require('uuid').v4;


const msgQueue = {
    order_puckup: {},
    order_deleverd: {}
}

capsConnection.on('connection', socket => {
    console.log('CONNECTED', socket.id);

    socket.on('pickup', (payload) => {
        console.log('we have new order from vendore');
        const id = uuid();
        // 2 add the chore to the Msg Q
        msgQueue.order_puckup[id] = {
            event: 'pickup',
            payload: payload,

        };
        console.log('after adding task Msg Q >>', msgQueue);
        // 3 send to the parent that the MsgQ added ur task to the Q
        socket.emit('delivering', payload);
        capsConnection.emit('order', payload);
        // 4 send the chore to the child
        capsConnection.emit('pickup', { id: id, payload: msgQueue.order_puckup[id] })
    });
    socket.on('in-transit', (payload) => {
        const id = uuid();
        // 2 add the chore to the Msg Q
        msgQueue.order_deleverd[id] = {
            event: 'in_transit',
            payload: payload,
        };
        capsConnection.emit('in-transit', { id: id, payload: msgQueue.order_deleverd[id] })
    });
    socket.on('deleverd', (payload) => {
        const id = uuid();
        // 2 add the chore to the Msg Q
        msgQueue.order_deleverd[id] = {
            event: 'deleverd',
            payload: payload,
        };
        capsConnection.emit('deleverd', { id: id, payload: msgQueue.order_deleverd[id] })
    });

    // 6 >> delete the chore from the Q
    socket.on('received', (payload) => {
        console.log('received from the driver and remove it from the Q ...');
        delete msgQueue.order_deleverd[payload.id];
        console.log('after deleting the task from Msg Q >>', msgQueue);

    })

    socket.on('get_all', () => {
        console.log('get all the order for the driver');
        Object.keys(msgQueue.order_puckup).forEach(id => {
            socket.emit('pickup', { id: id, payload: msgQueue.order_puckup[id] })
        })
    })
    socket.on('get_all', () => {
        console.log('get all the order for the driver');
        Object.keys(msgQueue.order_deleverd).forEach(id => {
            socket.emit('deleverd', { id: id, payload: msgQueue.order_deleverd[id] })
        })
    })

})
