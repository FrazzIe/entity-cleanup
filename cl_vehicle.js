/**
 * Remove all vehicles nearby client
 */
function onVehicleCleanup() {

}

on("entity-cleanup:vehicle", onVehicleCleanup);