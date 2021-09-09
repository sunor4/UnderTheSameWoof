// You can run those from this page pressing the 'run' button using the IDE

const cart = require('../models/cart');

test('Testing Cart...', () =>{
    expect(cart).toBeDefined();
});

const product = require('../models/product');

test('Testing Product...', () =>{
    expect(product).toBeDefined();
});

const user = require('../models/user');

test('Testing User...', () =>{
    expect(user).toBeDefined();
});