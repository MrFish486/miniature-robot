#!/usr/bin/nodejs
var hash = str => {
	var h = 0, i, chr;
	if (str.length === 0) return h;
	for (i = 0; i < str.length; i ++) {
		chr = str.charCodeAt(i);
		h = ((h << 5) - h) + chr;
		h |= 0;
	}
	return h;
};

var nthprime = n => {
	var prime = [], i = 1;
	while (i++ && prime.length < n) prime.reduce((a, c) => (i % c) * a, 2) && prime.push(i);
	return prime.length ? prime.pop() : -1;
};

var encrypt = (data, key) => {
	var codes = data.split("").map(e => e.charCodeAt(0));
	var instructions = String(Math.abs(hash(key)));
	for (let i = 0; i < instructions.length; i ++) {
		for (let l = 0; l < codes.length; l ++) {
			codes[l] += nthprime(parseInt(instructions[i]) + l);
		}
	}
	return codes.join(".");
};

var decrypt = (data, key) => {
	var codes = data.split(".").map(e => parseInt(e));
	var instructions = String(Math.abs(hash(key)));
	for (let i = 0; i < instructions.length; i ++) {
		for (let l = 0; l < codes.length; l ++) {
			codes[l] -= nthprime(parseInt(instructions[i]) + l);
		}
	}
	return codes.map(e => String.fromCharCode(e)).join("");
};

module.exports = {np : nthprime, hash : hash, en : encrypt, de : decrypt};
