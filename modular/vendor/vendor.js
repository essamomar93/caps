'use strict';

const events = require('../../events');
const faker = require('faker');

var randomTime = faker.datatype.datetime();
var randomStore = faker.company.companyName();
var randomID = faker.datatype.uuid();
var randomCustomer = faker.name.findName();
var randomAddress = faker.address.streetAddress();

events.on('pickup', pickup);
events.on('deleverd', deleverd);

function pickup(payload) {
    console.log(`---------------------------------`);
    console.log("EVENT",` event: 'pickup',
    time:${payload.time},
    payload: {
    store: ${payload.store},
    orderID: ${payload.orderID},
    customer: ${payload.customer},
    address: ${payload.address},`);
};

function deleverd(payload) {
    setTimeout(()=>{
        console.log(`DRIVER: delivered up ${payload.orderID}`);
        console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
        console.log("EVENT",` event: 'deleverd',
        time:${payload.time},
        payload: {
        store: ${payload.store},
        orderID: ${payload.orderID},
        customer: ${payload.customer},
        address: ${payload.address},`);
        console.log(`---------------------------------`);

    },3000)
   
};

setInterval(() => {
    let time = randomTime
    let store = randomStore
    let orderID = randomID
    let customer = randomCustomer
    let address = randomAddress
    events.emit('order-info', { time, store, orderID, customer, address });
  
}, 5000);
