// 尘生：
// const getNormalPath = (path) => {
// 	if (Array.isArray(path)) {
// 		return path;
// 	} else {
// 		return path.replaceAll("[", ".").replaceAll("]", "").split(".");
// 	}
// };
//
// const get = (obj, path, val) => {
// 	if (val) {
// 		return val;
// 	}
//
// 	const normalPath = getNormalPath(path);
//
// 	const travelObj = (obj, path) => {
// 		const prop = path[0];
//
// 		if (!obj) {
// 			return null;
// 		}
//
// 		if (path.length > 1) {
// 			return travelObj(obj[prop], path.slice(1));
// 		} else {
// 			return obj[prop];
// 		}
// 	};
// 	return travelObj(obj, normalPath);
// };

/**
 * question: 实现_.get方法，并通过如下测试：
 * var object = { a: [{ b: { c: 3 } }] };
 * _.get(object, "a[0].b.c"); // => 3
 * _.get(object, ["a", "0", "b", "c"]); // => 3
 * _.get(object, "a.b.c", "default"); // => 'default'
 */

function get(obj, path, val = "default") {
	const normalPath = getNormalPath(path); //["a", "0", "b", "c"]
	const travelObj = (obj, path) => {
		const prop = path[0];
		if (!obj[prop]) {
			return val;
		}
		if (path.length > 1) {
			return travelObj(obj[prop], path.slice(1));
		} else {
			return obj[prop];
		}
	};
	return travelObj(obj, normalPath);
}
function getNormalPath(path) {
	if (Array.isArray(path)) {
		return path;
	} else {
		return path.replaceAll("[", ".").replaceAll("]", "").split(".");
	}
}

const object = { a: [{ b: { c: 3 } }] };
console.log(get(object, "a[0].b.c"));
console.log(get(object, ["a", "0", "b", "c"]));
console.log(get(object, "a.b.c", "default"));
