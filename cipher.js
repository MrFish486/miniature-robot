var hash = (str) => {
	var h = 0, i, chr;
	if (str.length === 0) return h;
	for (i = 0; i < str.length; i ++) {
		chr = str.charCodeAt(i);
		h = ((h << 5) - h) + chr;
		h |= 0;
	}
	return h;
};

var encrypt = (/*String*/data, /*String*/key) => {
	var codes = [];
	for (let i = 0; i < data.length; i ++) {
		codes.push(data.charCodeAt(i));
	}
	var instructions = Math.abs(hash(key));
	if (String(instructions).length > 10) {
		instructions = parseInt(String(instructions).match(/[0-9]{10}/)[0]);
		console.log("Too long");
	} else if (String(instructions).length < 10) {
		instructions = parseInt(String(instructions).padEnd(10, '0'));
		console.log("Too short");
	}
	console.log(codes, instructions);
};

encrypt("hello", "h");
