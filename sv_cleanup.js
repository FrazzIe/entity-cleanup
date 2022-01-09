/**
 * Remove collection of entities from world
 * @param {number[]} entities collection of entities
 */
function onCleanupFinish(entities) {
	// delete entities
	for (let i = 0; i < entities.length; i++) {
		const handle = NetworkGetEntityFromNetworkId(entities[i]);

		DeleteEntity(handle);
	}
}

onNet("entity-cleanup:finish", onCleanupFinish);