export function getDeepCopyObject(obj) {
	if (obj === undefined) return obj;
	return JSON.parse(JSON.stringify(obj));
}

export function getUniqueKey() {
	const timeStamp = Date.now();
	const random = Math.floor(Math.random() * 9999);
	const uniqueKey = timeStamp + random;
	// console.log("getUniqueKey", { timeStamp, random, uniqueKey });
	return uniqueKey;
}