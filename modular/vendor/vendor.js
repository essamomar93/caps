'use strict';

const io = require('socket.io-client');
const faker = require('faker');

/* ------ CONNECT ---------- */
const host = 'http://localhost:3000';
const capsConnection = io.connect(`${host}/system`);

/* ------ Listener ---------- */

capsConnection.on('delivering', delivering);

/* ------ variabel ---------- */
var randomTime = faker.datatype.datetime();
var randomStore = faker.company.companyName();
var randomID = faker.datatype.uuid();
var randomCustomer = faker.name.findName();
var randomAddress = faker.address.streetAddress();

setInterval(() => {
  let time = randomTime
  let store = randomStore
  let orderID = randomID
  let customer = randomCustomer
  let address = randomAddress
  capsConnection.emit('pickup', { time, store, orderID, customer, address });
}, 5000);

function delivering(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
}
