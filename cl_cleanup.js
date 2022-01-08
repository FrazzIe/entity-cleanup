/**
 * Command handler for entity cleanup
 * @param {null} src 
 * @param {string[]} args array of command arguments
 */
function onCleanup(src /* unused */, args) {
	const target = args[0].toLowerCase();

	if (target == null) {
		console.log("Invalid argument passed");
		return;
	}

	switch(target) {
		case "vehicle":
		case "object":
		case "ped":
			emitNet(`entity-cleanup:${target}`);
		default:
			console.log("Invalid argument passed");
	}
}

RegisterCommand("cleanup", onCleanup);