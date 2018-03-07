#!/usr/bin/env node

const Conf = require('conf');
const helpers = require('./helpers.js');
const cash = require('./cash.js');

//create new congiguration 
const config = new Conf();

//create array of arguments
const argv = process.argv.slice(2);

//check if there are --save or --help or --version
helpers(argv);

//main : call command based on the imput arguments 
const command = {
  'amount': argv[0] || 1,
  'from': argv[1] || config.get('defaultFrom', 'USD'),
  'to':
    argv.length > 2
      ? process.argv.slice(4)
      : config.get('defaultTo', ['USD', 'EUR', 'GBP', 'PLN'])
};

cash(command);
