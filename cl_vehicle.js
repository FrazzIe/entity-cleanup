/**
 * Remove all vehicles nearby client
 */
function onCleanupVehicle() {

}

on("entity-cleanup:vehicle", onCleanupVehicle);