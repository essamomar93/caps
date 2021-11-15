'use strict';

const io = require('socket.io-client');
const faker = require('faker');

/* ------ CONNECT ---------- */
const host = 'http://localhost:3000';
const capsConnection = io.connect(host);
const vendorDelivered = io.connect(`${host}/vendor-system`);

/* ------ Listener ---------- */
capsConnection.on('pickup', pickup);
capsConnection.on('deleverd', deleverd);
vendorDelivered.on('delivering', delivering);

/* ------ variabel ---------- */
var randomTime = faker.datatype.datetime();
var randomStore = faker.company.companyName();
var randomID = faker.datatype.uuid();
var randomCustomer = faker.name.findName();
var randomAddress = faker.address.streetAddress();

/* ------ Event Handler ---------- */
function pickup(payload) {
  console.log(`---------------------------------`);
  console.log("EVENT", ` event: 'pickup',
    time:${payload.time},
    payload: {
    store: ${payload.store},
    orderID: ${payload.orderID},
    customer: ${payload.customer},
    address: ${payload.address},`);
}
function deleverd(payload) {
  setTimeout(() => {
    console.log("EVENT", ` event: 'deleverd',
    time:${payload.time},
    payload: {
    store: ${payload.store},
    orderID: ${payload.orderID},
    customer: ${payload.customer},
    address: ${payload.address},`);
    console.log(`---------------------------------`);
  }, 3000)
}

function delivering(payload) {
  setTimeout(()=>{
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
  },2500)
}

setInterval(() => {
  let time = randomTime
  let store = randomStore
  let orderID = randomID
  let customer = randomCustomer
  let address = randomAddress
  capsConnection.emit('order-info', { time, store, orderID, customer, address });
}, 5000);
