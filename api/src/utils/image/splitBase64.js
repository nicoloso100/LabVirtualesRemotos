const SplitBase64 = base64 => {
	let splitString = base64.slice(0, 40);
	let formatPart = splitString.split(",")[0];
	return base64.slice(formatPart.length + 1, base64.length);
};

module.exports = SplitBase64;
