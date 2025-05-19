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

var encrypt = (/*String*/data, /*String*/key) => {
	var codes = [];
	for (let i = 0; i < data.length; i ++) {
		codes.push(String(data.charCodeAt(i)));
	}
	var instructions = Math.abs(hash(key));
	if (String(instructions).length % 2 == 1) {
		instructions = parseInt(String(instructions) + String(instructions)[0]);
	}
	instructions = String(instructions);
	for (let i = 0; i < instructions.length; i ++) {
		let instructiontype = instructions[i] % 3;
		for (let k = 0; k < codes.length; k ++) {
			codes[k] = String(parseInt(codes[k]) + ((instructiontype + 1) * nthprime(k)));
		}
	}
	return codes.join(".");
};

var decrypt = (/*String*/data, /*String*/key) => {
	var codes = data.split(".");
	var instructions = Math.abs(hash(key));
	if (String(instructions).length % 2 == 1) {
		instructions = parseInt(String(instructions) + String(instructions)[0]);
	}
	instructions = String(instructions);
	for (let i = instructions.length - 1; i > 0; --i) {
		let instructiontype = instructions[i] % 3;
		console.log(instructiontype);
		for (let k = 0; k < codes.length; k ++) {
			console.log("before", (instructiontype + 1) * nthprime(k), `(${instructiontype} + 1) * ${nthprime(k)}`);
			codes[k] = String(parseInt(codes[k]) - (instructiontype + 1) * nthprime(k));
		}
	}
	return codes.map(a => String.fromCharCode(parseInt(a)));
};

console.log([0,1,2,3].map(nthprime));
console.log("testing encrypt of 'a' with key 'a'", encrypt("a", "a"));
console.log("testing decrypt of 'a' with key 'a'", decrypt("94", "a"));
