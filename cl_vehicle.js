/**
 * Remove all vehicles nearby client
 */
function onCleanupVehicle() {
	const ped = PlayerPedId();
	const curVehicle = GetVehiclePedIsIn(ped, false);
	const lastVehicle = GetVehiclePedIsIn(ped, true);

}

on("entity-cleanup:vehicle", onCleanupVehicle);