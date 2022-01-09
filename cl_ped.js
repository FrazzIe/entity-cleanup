/**
 * Collect peds nearby client for deletion
 */
function onCleanupPed() {
	const peds = [];

	forEachInGamePool("CPed", (handle) => {
		// ignore if ped isn't networked
		if (NetworkGetEntityIsNetworked(handle) == false) {
			return;
		}

		// store ped network id for deletion
		peds[peds.length] = NetworkGetNetworkIdFromEntity(handle);
	});

	// only send if there are peds to delete
	if (peds.length > 0) {
		// send collection of peds for deletion
		emitNet("entity-cleanup:finish", peds);
	}
}

on("entity-cleanup:ped", onCleanupPed);