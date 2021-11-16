'use strict';

// const io = require('socket.io')(PORT);

const PORT = process.env.PORT || 3000;

const caps = require('socket.io')(PORT);

const capsConnection = caps.of('/system');
const uuid = require('uuid').v4;


const msgQueue = {
    order: {}

}

// const family = io.of('/family');

capsConnection.on('connection', socket => {
    console.log('CONNECTED', socket.id);

    socket.on('pickup', (payload) => {
        console.log('we have new order from vendore');
        const id = uuid();
        // 2 add the chore to the Msg Q
        msgQueue.order[id] = {
            event: 'pickup',
            time: payload.time,
            store: payload.store,
            orderID: payload.orderID,
            customer: payload.customer,
            address: payload.address,
        };
        console.log('after adding task Msg Q >>', msgQueue);

        // 3 send to the parent that the MsgQ added ur task to the Q
        socket.emit('delivering', payload);
        // 4 send the chore to the child
        capsConnection.emit('order', { id: id, payload: msgQueue.order[id] })
    });
    socket.on('in_transit', (payload) => {
        const id = uuid();
        // 2 add the chore to the Msg Q
        msgQueue.order[id] = {
            event: 'in_transit',
            time: payload.time,
            store: payload.store,
            orderID: payload.orderID,
            customer: payload.customer,
            address: payload.address,
        };
        // 3 send to the parent that the MsgQ added ur task to the Q
        // socket.emit('pickedUp', payload);
        // console.log(  msgQueue.order[id]);

        // 4 send the chore to the child
        capsConnection.emit('order', { id: id, payload: msgQueue.order[id] })
    });
    socket.on('deleverd', (payload) => {
        const id = uuid();
        // 2 add the chore to the Msg Q
        msgQueue.order[id] = {
            event: 'deleverd',
            time: payload.time,
            store: payload.store,
            orderID: payload.orderID,
            customer: payload.customer,
            address: payload.address,
        };
        // console.log( msgQueue);

        // 3 send to the parent that the MsgQ added ur task to the Q
        // socket.emit('delivered', payload);
        // 4 send the chore to the child
        capsConnection.emit('order', { id: id, payload: msgQueue.order[id] })
    });

    // 6 >> delete the chore from the Q
    socket.on('received', (payload) => {
        console.log('received from the driver and remove it from the Q ...');
        delete msgQueue.order[payload.id];
        console.log('after deleting the task from Msg Q >>', msgQueue);

    })

    socket.on('get_all', () => {
        console.log('get all the order for the driver');
        Object.keys(msgQueue.order).forEach(id => {
            socket.emit('delivered', { id: id, payload: msgQueue.order[id] })
        })
    })

})
