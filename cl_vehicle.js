/**
 * Remove all vehicles nearby client
 */
function onCleanupVehicle() {
	const ped = PlayerPedId();
	const curVehicle = GetVehiclePedIsIn(ped, false);
	const lastVehicle = GetVehiclePedIsIn(ped, true);

	forEachInGamePool("CVehicle", (handle) => {
		if (handle == curVehicle || handle == lastVehicle) {
			return;
		}
	});
}

on("entity-cleanup:vehicle", onCleanupVehicle);