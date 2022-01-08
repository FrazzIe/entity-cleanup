/**
 * Fetches handles for an entity pool
 * 
 * Enumerates and executes a callback on each entity handle
 * @param {string} poolName entity pool handle (CPed, CObject, CVehicle, CPickup)
 * @param {function} fn callback func, perform logic on entity handle
 */
 function forEachInGamePool(poolName, fn) {
	const pool = GetGamePool(poolName);
	
	for (let i = 0; i < pool.length; i++) {
		fn(poolName, pool[i]);
	}
}