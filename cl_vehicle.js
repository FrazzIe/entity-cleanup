/**
 * Remove all vehicles nearby client
 */
function onCleanupVehicle() {
	const ped = PlayerPedId();
	const curVehicle = GetVehiclePedIsIn(ped, false);
	const lastVehicle = GetVehiclePedIsIn(ped, true);

	forEachInGamePool("CVehicle", (handle) => {
		// ignore client current and last vehicle
		if (handle == curVehicle || handle == lastVehicle) {
			return;
		}
		
		// ignore if vehicle is occupied
		if (GetVehicleNumberOfPassengers(handle) > 0 || IsVehicleSeatFree(handle, -1) == false) {
			return;
		}
	});
}

on("entity-cleanup:vehicle", onCleanupVehicle);