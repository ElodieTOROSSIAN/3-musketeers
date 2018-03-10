'use strict';

const convert = require('..');
const Big = require('big.js');

test('should default to returning a Number', () => {
	expect(typeof convert(2, 'BTC', 'BTC')).toBe('number');
});

test('should return a Number', () => {
	expect(typeof convert(2, 'BTC', 'BTC', 'Number')).toBe('number');
});

test('should return a Big number', () => {
	expect(typeof convert(2, 'BTC', 'BTC', 'Big')).toBe('object');
});

test('should return a String', () => {
	expect(typeof convert(2100, 'mBTC', 'BTC', 'String')).toBe('string');
});

test('should convert an integer', () => {
	expect(typeof convert(123456789012345, 'Satoshi', 'BTC', 'Number')).toBe('number');
});

test('should convert a number', () => {
	expect(typeof convert(1234567.89012345, 'BTC', 'Satoshi', 'Number')).toBe('number');
});

test('should convert a string', () => {
	expect(typeof convert('2', 'BTC', 'BTC', 'Number')).toBe('number');
});

test('should convert a Big number', () => {
  	expect(typeof convert(new Big(2), 'BTC', 'BTC', 'Number')).toBe('number');
});

test('should convert a NaN to a Number', () => {
	expect(typeof convert(NaN, 'BTC', 'BTC', 'Number')).toBe('number');
	expect(typeof convert(NaN, 'BTC', 'mBTC', 'Number')).toBe('number');
});

test('should convert a NaN to a String', () => {
	expect(typeof convert(NaN, 'BTC', 'BTC', 'String')).toBe('string');
	expect(typeof convert(NaN, 'BTC', 'mBTC', 'String')).toBe('string');

});

test('should not convert a NaN to a Big', () => {
	function subtest(){
		convert(NaN, 'BTC', 'BTC', 'Big');
	}
	expect(subtest).toThrow();	
}); 

//Je n'ai pas reussi a faire avec l'erreur precise ... 

test('should handle rounding errors', () => {
	expect(typeof convert(4.6, 'Satoshi', 'BTC', 'Number')).toBe('number');
	expect(typeof convert(0.000000046, 'BTC', 'Satoshi', 'Number')).toBe('number');
});

test('should throw when untest is undefined', () => { 
	function subtest1(){
		convert(new Big(2), 'x', 'BTC', 'Number');
	}
	function subtest2(){
		convert(new Big(2), 'BTC', 'x', 'Number');
	}
	function subtest3(){
		convert(NaN, 'x', 'BTC', 'Number')
	}
	function subtest4(){
		convert(NaN, 'BTC', 'x', 'Number')
	}
	expect(subtest1).toThrow(/is not a bitcoin unit/);	
	expect(subtest2).toThrow(/is not a bitcoin unit/);	
	expect(subtest3).toThrow(/is not a bitcoin unit/);	
	expect(subtest4).toThrow(/is not a bitcoin unit/);	
});

test('should throw when representaion is undefined', () => {
	function subtest1(){
		convert(2, 'BTC', 'mBTC', 'x');
	}
	function subtest2(){
		convert(NaN, 'BTC', 'mBTC', 'x');
	}
	expect(subtest1).toThrow();	
	expect(subtest2).toThrow();	
});

test('should allow untest aliases', () => {
	function subtest1(){
		convert(4.6, 'Satoshi', 'sat');
	}
	function subtest2(){
		convert(4.6, 'μBTC', 'btest');
	}
	expect(subtest1).resolves;	
	expect(subtest2).resolves;	
});
