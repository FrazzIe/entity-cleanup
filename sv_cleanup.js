/**
 * Remove collection of entities from world
 * @param {number[]} entities collection of entities
 */
function onCleanupFinish(entities) {
	// delete entities
	for (let i = 0; i < entities.length; i++) {
		DeleteEntity(entities[i]);
	}
}

onNet("entity-cleanup:finish", onCleanupFinish);