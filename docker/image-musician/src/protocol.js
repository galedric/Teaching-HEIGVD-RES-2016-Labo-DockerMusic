exports.UDP_MULTICAST_ADDRESS = "239.255.22.5";
exports.UDP_PORT = 9907;
exports.TCP_PORT = 2205;
exports.SOUNDS = {
	piano: "ti-ta-ti",
	trumpet: "pouet",
	flute: "trulu",
	violin: "gzi-gzi",
	drum: "boum-boum"
}
exports.INSTRUMENTS = {}
for (let instrument in exports.SOUNDS) {
	let sound = exports.SOUNDS[instrument]
	exports.INSTRUMENTS[sound] = instrument;
}