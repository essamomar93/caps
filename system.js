'use strict';

const events = require('./events'); 

require('./modular/vendor/vendor');
require('./modular/driver/driver');

events.on('order-info', (payload) => {
    
    events.emit('pickup', {
        event: "pickup" ,
        time: payload.time,
        store: payload.store,
        orderID: payload.orderID,
        customer: payload.customer,
        address: payload.address
    });
    events.emit('in_transit', {
        event: "in_transit" ,
        time: payload.time,
        store: payload.store,
        orderID: payload.orderID,
        customer: payload.customer,
        address: payload.address
    });
    events.emit('deleverd', {
        event: "deleverd" ,
        time: payload.time,
        store: payload.store,
        orderID: payload.orderID,
        customer: payload.customer,
        address: payload.address
    });
});

