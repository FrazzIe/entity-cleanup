/**
 * Remove all vehicles nearby client
 */
function onCleanupVehicle() {
	const vehicles = [];
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

		// ignore if vehicle isn't networked
		if (NetworkGetEntityIsNetworked(handle) == false) {
			return;
		}

		// store vehicle network id for deletion
		vehicles[vehicles.length] = NetworkGetNetworkIdFromEntity(handle);
	});

	// send collection of vehicles for deletion
	emitNet("entity-cleanup:finish", vehicles);
}

on("entity-cleanup:vehicle", onCleanupVehicle);