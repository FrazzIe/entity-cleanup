/**
 * Collect peds nearby client for deletion
 */
function onCleanupPed() {
	const peds = [];
	const ped = PlayerPedId();

	forEachInGamePool("CPed", (handle) => {
		// ignore ped if client
		if (handle == ped) {
			return;
		}

		// ignore ped if player
		if (IsPedAPlayer(handle) == true) {
			return;
		}

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