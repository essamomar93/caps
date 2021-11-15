'use strict';

const events = require('../../events');

events.on('in_transit', in_transit);

function in_transit(payload) {
    setTimeout(()=>{
        console.log(`DRIVER: picked up ${payload.orderID}`);
        console.log("EVENT",` event: 'in_transit',
        time:${payload.time},
        payload: {
        store: ${payload.store},
        orderID: ${payload.orderID},
        customer: ${payload.customer},
        address: ${payload.address},`);
    },1000)
}
