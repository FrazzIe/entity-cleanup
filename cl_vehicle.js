/**
 * Collect vehicles nearby client for deletion
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

		// check if vehicle is occupied
		if (GetVehicleNumberOfPassengers(handle) > 0 || IsVehicleSeatFree(handle, -1) == false) {
			const modelHash = GetEntityModel(handle);
			const numSeats = GetVehicleModelNumberOfSeats(modelHash);
			
			// ignore if any passenger is alive
			// ignore if any passenger is a player
			for (let i = -1; i < numSeats; i++) {
				if (IsVehicleSeatFree(handle, i) == false) {
					const passenger = GetPedInVehicleSeat(handle, i);

					if (IsPedAPlayer(passenger) == true || IsEntityDead(passenger) == false) {
						return;
					}
				}
			}
		}

		// ignore if vehicle isn't networked
		if (NetworkGetEntityIsNetworked(handle) == false) {
			return;
		}

		// store vehicle network id for deletion
		vehicles[vehicles.length] = NetworkGetNetworkIdFromEntity(handle);
	});

	// only send if there are vehicles to delete
	if (vehicles.length > 0) {
		// send collection of vehicles for deletion
		emitNet("entity-cleanup:finish", vehicles);
	}
}

on("entity-cleanup:vehicle", onCleanupVehicle);