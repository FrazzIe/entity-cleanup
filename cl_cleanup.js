/**
 * Command handler for entity cleanup
 * @param {null} src 
 * @param {string[]} args array of command arguments
 */
function onCleanup(src /* unused */, args) {
	let target = args[0];

	if (target == null) {
		console.log("Invalid argument passed");
		return;
	}

	target = target.toLowerCase();

	switch(target) {
		case "vehicle":
		case "object":
		case "ped":
			emit(`entity-cleanup:${target}`);
			break;
		default:
			console.log("Invalid argument passed");
			break;
	}
}

RegisterCommand("cleanup", onCleanup);