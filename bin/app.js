#!/usr/bin/env node
const app  = require('../index');

const from = (!!process.argv[2]) ? process.argv[2] : '.';

if (!from) {
    throw new Error('search from path required')
}


app.init(from);