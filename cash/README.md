# Cash

## Introduction

This program converts money in other currency.

## Install library 

```sh
cd PATH\3-musketeers\cash
npm install 
```

## Usage

Go in good folder 
```sh
cd PATH\3-musketeers\cash\bin
```

Presentation of help 
```sh
node index.js --help
```

Example of conversion of 1 euro into others moneys 
```sh
node index.js 1 eur
```

Example of conversion of 1 euro in austalian currency
```sh
node index.js 1 pln eur aud
```

Example of conversion of 1 polish zloty in euro and australian currency 
```sh
node index.js 1 pln eur aud
```

Save our default currency
```sh
node index.js --save "our starting currency" "our currencies displayed"
```


