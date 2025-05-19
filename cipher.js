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
	if (String(instructions).length > codes.length) {
		instructions = parseInt(String(instructions).match(new RegExp(`[0-9]{${codes.length}}`))[0]);
	} else if (String(instructions).length < codes.length) {
		instructions = parseInt(String(instructions).padEnd(codes.length, '0'));
	}
	console.log(codes, instructions);
	instructions = String(instructions);
	for (let i = 0; i < instructions.length; i ++) {
		
	}
};

encrypt("hello", "h");
