const protocol = require("./protocol.js");

const sounds = {
	piano: "ti-ta-ti",
	trumpet: "pouet",
	flute: "trulu",
	violin: "gzi-gzi",
	drum: "boum-boum"
}

const instrument = process.argv[2];

if (!instrument || !protocol.SOUNDS[instrument]) {
	console.error("Unknown instrument");
	return;
}

const sound = sounds[instrument];
const uuid = require("uuid").v4();
const activeSince = new Date().toISOString();

const msg = JSON.stringify({ uuid, sound, activeSince });
const msg_buffer = new Buffer(msg);

const dgram = require("dgram");
const socket = dgram.createSocket('udp4');

setInterval(function() {
	socket.send(msg_buffer, 0, msg_buffer.length, protocol.UDP_PORT, protocol.UDP_MULTICAST_ADDRESS);
	console.log("Broadcasting; ", msg);
}, 1000);
