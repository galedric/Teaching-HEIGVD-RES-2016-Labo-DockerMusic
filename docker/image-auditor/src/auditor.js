const protocol = require("./protocol.js");

const timeouts = Object.create(null);
const actives = Object.create(null);

//
// UDP part
//

const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("error", (err) => {
	console.log(`server error:\n${err.stack}`);
	server.close();
});

server.on("message", (msg, rinfo) => {
	try {
		const data = JSON.parse(msg.toString("utf-8"));
		const uuid = data.uuid;
		if (!uuid) return;

		actives[uuid] = data;

		if (timeouts[uuid]) {
			clearTimeout(timeouts[uuid]);
			delete timeouts[uuid];
		}

		timeouts[uuid] = setTimeout(function () {
			delete actives[uuid];
		}, 5000);
	} catch (e) {}
});

server.on("listening", () => {
	var address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(protocol.UDP_PORT, function () {
	server.addMembership(protocol.UDP_MULTICAST_ADDRESS);
});

//
// TCP part
//

const net = require("net");

const tcp = net.createServer(socket => {
	const actives_list = [];		
	for (var key in actives) {
		let current = actives[key];
		let item = {
			uuid: current.uuid,
			instrument: protocol.INSTRUMENTS[current.sound],
			activeSince: current.activeSince
		}
		actives_list.push(item);
	}
	socket.end(new Buffer(JSON.stringify(actives_list)));
});

tcp.listen(protocol.TCP_PORT);
