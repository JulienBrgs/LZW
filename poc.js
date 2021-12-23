// fs = require('fs');
// debugData = (data) => {
// 	console.log(`DATA = "${data}"`);
// }
// debugBuffer = (buffer) => {
// 	var tmp = "";
// 	buffer.forEach(b => {
// 		if (tmp != "") tmp += " ";
// 		tmp += b.toString(16).toUpperCase();
// 	});
// 	console.log(`BUFFER = ${tmp}`);
// 
// fs.readFile('sample.txt', 'binary', (error, data) => {
// 	if (error) return console.log(error);
// 	debugData(data);
// 	const buffer = Buffer.from(data, 'ascii');
// 	debugBuffer(buffer);
// 	//var hexvalue = buffer.toString('hex');
// 	//console.log(hexvalue);
// });

var fs = require('fs');
var lzw = require("node-lzw");

fs.readFile('./samples/sample.txt', 'binary', (error, data) => {
// fs.readFile('./samples/sample.exe', 'binary', (error, data) => {
// fs.readFile('./samples/sample.png', 'binary', (error, data) => {
	if (error) return console.log(error);

	console.log("[DATA]");
	console.log(`Prévisualisation	: ${(data.length <= 255) ? data : "Impossible de prévisualiser plus de 255 octets ..."}`);
	console.log(`Taille			: ${data.length} octets`);
	console.log(``);

	var buffer = data;

	// Encoding
	var encode = lzw.encode(buffer);
	console.log("[ENCODE]");
	console.log(`Buffer			: ${buffer}`);
	console.log(`Prévisualisation	: ${(encode.length <= 255) ? encode : "Impossible de prévisualiser plus de 255 octets ..."}`);
	console.log(`Taille			: ${encode.length} octets`);
	console.log(`Ratio de compression	: ${((1 - (encode.length / data.length)) * 100).toFixed(2)} %`);
	console.log(``);

	// Decoding
	var decode = lzw.decode(encode);
	console.log("[DECODE]");
	console.log(`Buffer			: ${encode}`);
	console.log(`Prévisualisation	: ${(decode.length <= 255) ? decode : "Impossible de prévisualiser plus de 255 octets ..."}`);
	console.log(`Taille			: ${decode.length} octets`);
	console.log(`Vérification		: ${(data.length == decode.length) ? "OK" : "KO"}`);
});
