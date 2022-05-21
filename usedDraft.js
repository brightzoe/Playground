function bind(f, ...fixedArgs) {
	return function (...args) {
		return f(...fixedArgs, ...args);
	};
}
function bind(f) {
	var fixedArgs = Array.from(arguments).slice(1);
	return function () {
		var args = Array.from(arguments);
		return f.apply(null, fixedArgs.concat(args));
	};
}
function add(a, b, c) {
	return a + b + c;
}
f2 = bind(add, 1);

//bind
//fn.bind(context,...args)
//1 绑定this
Function.prototype.bind1 = function (context = window) {
	const _this = this;
	return function () {
		return _this.apply(context);
	};
};
//2 固定部分参数
Function.prototype.bind2 = function (context = window) {
	const _this = this;
	const args = [...arguments].slice(1); //bind 的参数
	return function () {
		return _this.apply(context, [...args, ...arguments]); //arguments=>bind返回的函数调用时传入的参数
	};
};
//3 绑定的函数也可以是构造函数，还可以new
Function.prototype.bind2 = function (context) {
	var self = this;
	var args = [...arguments].slice(1);

	var fbound = function () {
		var bindArgs = Array.prototype.slice.call(arguments);
		// 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
		// 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
		self.apply(this instanceof self ? this : context, args.concat(bindArgs));
	};
	// 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
	fbound.prototype = this.prototype;
	return fbound;
};

// 实现instanceof

function instanceOf(left, right) {
	//基本数据类型肯定不是
	const basicTypes = ["string", "number", "boolean", "undefined", "symbol"];
	if (basicTypes.includes(typeof left)) {
		//typeof 判断不了array,null,其他都可以
		return false;
	}
	//不是基本数据类型
	let lp = left.__proto__;
	let rp = right.prototype;
	//循环向上找原型，直到找到或者到头找到null
	while (true) {
		if (lp === rp) {
			return true;
		}
		if (lp === null) {
			return false;
		}
		lp = lp.__proto__;
	}
}
function map(ary, mapper) {
	//reduce实现map
	return ary.reduce((acc, cur) => {
		acc.push(mapper(cur));
		return acc;
	}, []);
}

function filter(ary, test) {
	return ary.reduce((acc, cur, idx, ary) => {
		if (test(cur, idx, ary)) {
			acc.push(cur);
		}
		return acc;
	}, []);
}

function forEach(ary, action) {
	ary.reduce((_, cur, idx, ary) => action(cur, idx, ary));
}

//数组降维
function flatten(ary) {
	return ary.reduce((acc, cur) => acc.concat(cur), []);
}
//TODO: 用reduce实现各种函数，keyby,groupby,every等。
//every,测试是否每一项都满足条件,像&&；
//一旦一个为假，返回false，提前结束，不一定需要处理所有元素
//FIXME:EVERY
function every(array, test) {
	for (let i = 0; i < array.length; i++) {
		if (!test(array(i))) {
			return false;
		}
	}
	return true;
}

function every(array, predicate) {
	array.reduce((acc, cur, idx) => {
		return acc && predicate(cur, idx, ary); //也是短路特性
	}, true);
}
//some,测试是否至少有一项满足条件
//一旦一个为真，返回true，提前结束，不需要处理所有元素

function every(array, test) {
	return some(array, test);
}
//every与some互相实现

function bind(f, ...fixedArgs) {
	//null表示跳过,[1,null,2,null,3]
	return function (...args) {
		var temp = fixedArgs.slice();
		let j = 0;
		for (let i = 0; i < temp.length; i++) {
			if (temp[i] === null) {
				temp[i] = args[j++];
			}
		}
		while (j < args.length) {
			temp.push(args[j++]);
		}

		return f(...temp);
	};
}

function curry(func, n) {
	return function (...args) {
		if (args.length < n) {
			return curry(func, n - args.length);
		}
		return func.bind(null, args);
	};
}

function identity(...args) {
	return args[0];
}

//Chapter 666666
var MOUNTAINS = [
	{ name: "Kilimanjaro", height: 5895, country: "Tanzania" },
	{ name: "Everest", height: 8848, country: "Nepal" },
	{ name: "Mount Fuji", height: 3776, country: "Japan" },
	{ name: "Mont Blanc", height: 4808, country: "Italy/France" },
	{ name: "Vaalserberg", height: 323, country: "Netherlands" },
	{ name: "Denali", height: 6168, country: "United States" },
	{ name: "Popocatepetl", height: 5465, country: "Mexico" },
];

if (typeof module != "undefined" && module.exports) module.exports = MOUNTAINS;

function rowHeights(rows) {
	//最小行高的最大值
	return rows.map(function (row) {
		return row.reduce(function (max, cell) {
			return Math.max(max, cell.minHeight());
		}, 0);
	});
}

function colWidths(rows) {
	//每列最小宽度的最大值
	return rows[0].map(function (_, i) {
		return rows.reduce(function (max, row) {
			return Math.max(max, row[i].minWidth());
		}, 0);
	});
}

function drawTable(rows) {
	var heights = rowHeights(rows);
	var widths = colWidths(rows);
	//这个宽和高刚刚包裹好所有内容
	function drawLine(blocks, lineNo) {
		//画出一行,中间用空格连接
		return blocks
			.map(function (block) {
				return block[lineNo];
			})
			.join(" ");
	}

	function drawRow(row, rowNum) {
		var blocks = row.map(function (cell, colNum) {
			return cell.draw(widths[colNum], heights[rowNum]);
		});
		return blocks[0]
			.map(function (_, lineNo) {
				return drawLine(blocks, lineNo);
			})
			.join("\n");
	}

	return rows.map(drawRow).join("\n"); //把所有行用换行符连到一起
}

function repeat(string, times) {
	var result = "";
	for (var i = 0; i < times; i++) result += string;
	return result;
}

function TextCell(text) {
	this.text = text.split("\n"); //文本分成每一行
}
TextCell.prototype.minWidth = function () {
	return this.text.reduce(function (width, line) {
		return Math.max(width, line.length);
	}, 0); //字符串最大宽度
};
TextCell.prototype.minHeight = function () {
	return this.text.length;
};
TextCell.prototype.draw = function (width, height) {
	//向每行文本填充空格
	var result = [];
	for (var i = 0; i < height; i++) {
		var line = this.text[i] || "";
		result.push(line + repeat(" ", width - line.length));
	}
	return result;
};

var rows = [];
for (var i = 0; i < 5; i++) {
	var row = [];
	for (var j = 0; j < 5; j++) {
		if ((j + i) % 2) {
			row.push(new TextCell("##"));
		} else {
			row.push(new TextCell("  "));
		}
	}
	rows.push(row);
}

function UnderlinedCell(inner) {
	//首行添加下划线单元格
	this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function () {
	return this.inner.minWidth(); //组合
};
UnderlinedCell.prototype.minHeight = function () {
	return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function (width, height) {
	return this.inner.draw(width, height - 1).concat([repeat("-", width)]);
};

function RTextCell(text) {
	//纯数字单元格,右对齐
	TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function (width, height) {
	var result = [];
	for (var i = 0; i < height; i++) {
		var line = this.text[i] || "";
		result.push(repeat(" ", width - line.length) + line);
	}
	return result;
};

function dataTable(data) {
	var keys = Object.keys(data[0]);
	var headers = keys.map(function (name) {
		return new UnderlinedCell(new TextCell(name));
	});
	var body = data.map(function (row) {
		return keys.map(function (name) {
			var value = row[name];
			// This was changed:
			if (typeof value == "number") return new RTextCell(String(value));
			else return new TextCell(String(value));
		});
	});
	return [headers].concat(body);
}

//console.log(drawTable(dataTable(MOUNTAINS)));
//画出了首行下划线,字符左对齐,数字右对齐的表

function Instance(val, Cont) {
	if (val) {
		if (typeof val != "object") {
			return false;
		}
		if (val.__proto__ === Cont.prototype) {
			return true;
		}
		Instance(val.__proto__, Cont);
	}
	return false;
}

function New(F, ...args) {
	var obj = Object.create(F.prototype); //添加原型
	var fReturn = F.call(obj, ...args); //绑定this
	if (fReturn && typeof fReturn === "object") {
		//如果F显式指定了返回值,返回这个
		return fReturn;
	} else {
		return obj; //返回这个新创建的对象
	}
}

//二维向量
function Vector(x, y) {
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function (other) {
	var res = new Vector(this.x + other.x, this.y + other.y);
	return res;
};
Vector.prototype.minus = function (other) {
	var res = new Vector(this.x - other.x, this.y - other.y);
	return res;
};
var v1 = new Vector(4, 0);
var v2 = new Vector(2, 2);
//console.log(v1.minus(v2))
Object.defineProperty(Vector.prototype, "length", {
	get: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},
});

//console.log(v1.length);

//StretchCell,把单元格放大
function StretchCell(inner, width, height) {
	this.inner = inner;
	this.width = width;
	this.height = height;
}
StretchCell.prototype.minWidth = function () {
	return Math.max(this.width, this.inner.minWidth());
};
StretchCell.prototype.minHeight = function () {
	return Math.max(this.height, this.inner.minHeight());
};

StretchCell.prototype.draw = function (width, height) {
	return this.inner.draw(width, height);
};

var sc = new StretchCell(new TextCell("abc"), 1, 2);
//复数
function Complex(real, img) {
	this.real = real;
	this.img = img;
}

Complex.prototype.plus = function (c) {
	return new Complex(this.real + c.real, this.img + c.img);
};
Complex.prototype.minus = function (c) {
	return new Complex(this.real - c.real, this.img - c.img);
};
Complex.prototype.multiple = function (c) {
	return new Complex(this.real * c.real - this.img * c.img, this.img * c.real + this.real * c.img);
};
Complex.prototype.division = function (c) {
	var helper = new Complex(c.real, 0 - c.img);
	var down = c.multiple(helper);
	var up = this.multiple(helper);
	return new Complex(up.real / down.real, up.img / down.real);
};
Complex.fromString = function (string) {};
var c1 = new Complex(3, 7);

var c2 = new Complex(2, 5);
c2.division(c1);

//集合 MySet
function MySet(ary = []) {
	this.elements = [];
	for (let a of ary) {
		this.add(a);
	}
	return this;
}

MySet.prototype = {
	add(val) {
		if (!this.has(val)) {
			this.elements.push(val);
		}
		return this;
	},
	delete(val) {
		if (this.has(val)) {
			for (var i = 0; i < this.elements, length; i++) {
				if (val === this.elements[i]) {
					this.elements.splice(i, 1);
					break;
				}
			}
		}
		return this;
	},
	get size() {
		return this.ele.length;
	},
	has(val) {
		var elements = this.elements;
		if (val !== val) {
			for (var i = 0; i < elements.length; i++) {
				if (elements[i] !== elements[i]) {
					return true;
				}
			}
			return false;
		} else {
			for (var i = 0; i < elements.length; i++) {
				if (val === elements[i]) {
					return true;
				}
			}
			return false;
		}
	},

	clear() {
		this.elements.length = 0;
		return this;
	},
};

// set.add(3) //{3}
// set.add(5) //{3,5}
// set.add(true) //{3,5,true}
// //不能重复添加相同的元素,去重
// set.size // 3
// set.has(3)
// set.delete(5)
// set.clear()
// new MySet([3, 56, 2]) //可以传递数组,注意去重
//映射 Map
function Mmp(init = "") {
	// m = new Mmp([[2, 3], [[1, 2, 3], 'bar'], ['gdf'], {}])
	this._keys = [];
	this._values = [];
	if (init.length == 2) {
		this.set(init);
	}
	if (Array.isArray(init)) {
		for (let i = 0; i < init.length; i++) {
			this.set(init[i][0], init[i][1]);
		}
	}
}
Mmp.prototype = {
	_indexOfKey(k) {
		//返回下标,能处理nan
		if (k !== k) {
			for (let i = 0; i < this._keys.length; i++) {
				if (this._keys[i] !== this._keys[i]) {
					return i;
				}
			}
		} else {
			for (let i = 0; i < this._keys.length; i++) {
				if (k === this._keys[i]) {
					return i;
				}
			}
		}
		return -1;
	},
	set(k, v) {
		if (!this.has(k)) {
			this._keys.push(k);
			this._values.push(v);
		} else {
			this._values[this._indexOfKey(k)] = v;
		}

		return this;
	},
	get(k) {
		return this._values[this._indexOfKey(k)];
	},
	delete(k) {
		var idx = this._indexOfKey(k);
		if (idx >= 0) {
			this._keys.splice(idx, 1);
			this._values.splice(idx, 1);
		}
		return this;
	},
	has(k) {
		var idx = this._indexOfKey(k);
		return idx >= 0 ? true : false;
	},
	clear() {
		this._keys.length = this._values.length = 0;
	},
	get size() {
		return this._keys.length;
	},
};

// m = new Mmp()
// m.set(2, 'bar') //{1 => "foo", 2 => "bar"}
// //数字,字符串,对象 => 字符串,数组,对象,任何值都可以映射,包括nan
// m.get(2) //"bar"
//m = new Mmp([  [2, 3],  [[1, 2, 3], 'bar'],  ['gdf', {}],])

//Bst 排序二叉树
function createTreeNode(val) {
	//创建一个值为val的节点
	return {
		val: val,
		left: null,
		right: null,
	};
}

function insertIntoBST(bst, val) {
	//向BST插入值val,并返回bst
	if (bst == null) {
		return createTreeNode(val);
	}
	if (val > bst.val) {
		bst.right = insertIntoBST(bst.right, val);
	} else {
		bst.left = insertIntoBST(bst.left, val);
	}
	return bst;
}

function Bst(val = null) {
	if (val == null) {
		this.root = null;
		return this.root;
	}
	this.root = {};
	this.root.val = val;
	this.root.left = null;
	this.root.right = null;
}

Bst.prototype.insert = function (val) {
	if (this.root == null) {
		return new Bst(val);
	}
	var node = this.root;

	if (val > node.val) {
		node.right ? node.right.insert(val) : (node.right = new Bst(val));
	} else {
		node.left ? node.left.insert(val) : (node.left = new Bst(val));
	}
	return this;
};

Bst.prototype.remove = function (target) {
	//先实现删除叶子节点
	var node = this;
	node.left && node.left.remove(target);
	node.right && node.right.remove(target);
	return node.left === node.right && node.val === target ? null : node; //是叶子节点把它变成null
};

var b = new Bst();
b.insert(2);
b.remove(3); //

function getElementsById(id, node = document.documentElement) {
	if (node.id === "id") {
		return node;
	} else {
		for (let i = 0; i < node.childNodes.length; i++) {
			var child = node.childNodes[i];
			var res = getElementsById(id, child);
			if (res) {
				return res;
			}
		}
	}
	return null;
}

function elt(tagName, attrs, ...children) {
	var node = document.createElement(tagName);
	for (let key in attrs) {
		let val = attrs[key];
		node.setAttribute(key, val);
	}
	for (let child of children) {
		if (typeof child === "string") {
			node.appendChild(document.createTextNode(child));
		} else {
			node.appendChild(child);
		}
	}
	return node;
}

function replaceImages() {
	var images = document.getElementsByTagName("img");
	for (let i = images.length - 1; i >= 0; i--) {
		let image = images[i];
		if (image.alt) {
			var text = document.createTextNode(image.alt);
			image.parentNode.replaceChild(text, image);
		}
	}
}

function normalize(node) {
	//将连续的文本节点合并成一个
	if (node.nodeType === document.ELEMENT_NODE) {
		var children = Array.from(node.childNodes);
		let text = "";
		for (let i = 0; i < children.length; i++) {
			if (children[i].nodeType === document.TEXT_NODE) {
				text += children[i].nodeValue;
				node.removeChild(children[i]);
			} else if (text) {
				var textNode = document.createTextNode(text);
				node.insertbefore(textNode, children[i]);
				text = "";
			}
		}
		if (text) {
			var textNode = document.createTextNode(text);
			node.append(textNode);
		}
	}
}

function getAllFile(path) {
	fs.readdir(path, (error, data) => {
		for (let subpath of data) {
			let statObj = fs.statSync(path + "/" + subpath);
			if (statObj.isDirectory()) {
				console.log("dir:" + subpath);
				getAllFile(path + "/" + subpath);
			} else {
				console.log("file:" + subpath);
			}
		}
	});
}
function listFiles(dirPath) {
	//递归返回dir文件夹中所有文件的完全路径
	//同步＋异步（promise，callback，async.await)
	let res = [];
	let fullPath = path.resolve(dirPath);
	let fileNames = fs.readdirSync(fullPath);
	for (let fileName of fileNames) {
		let file = path.join(fullPath, fileName);
		let statObj = fs.statSync(file);
		if (statObj.isFile()) {
			res.push(fileName);
		} else if (statObj.isDirectory()) {
			res.push(...listFiles(path.resolve(file)));
		}
	}
	return res;
}
function listFilesCb(dirpath, cb) {
	//回调回调加回调
	let res = [];
	var fullDirPath = path.resolve(dirpath);
	fs.readdir(fullDirPath, (err, names) => {
		var count = 0;
		for (let name of names) {
			let fullName = path.join(fullDirPath, name);
			fs.stat(fullName, (err, stat) => {
				if (stat.isFile()) {
					res.push(fullName);
					count++;
					if (count == names.length) {
						cb(null, res);
					}
				} else if (stat.isDirectory()) {
					listFilesCb(fullName, (err, files) => {
						res.push(...files);
						count++;
						if (count == names.length) {
							cb(null, res);
						}
					});
				}
			});
		}
	});
}
// listFilesCb("笔记", (err, files) => {
//   console.log(files);
// });
function listFilesPromise(dirpath, cb) {
	let fullDirPath = path.resolve(dirpath);
	var fullNames;
	var res = [];
	fsp
		.readdir(fullDirPath)
		.then((names) => {
			fullNames = names.map((name) => path.join(fullDirPath, name));
			return fullNames.map(fsp.stat);
		})
		.then((infos) => {
			for (var i = 0; i < infos.length; i++) {
				var info = infos[i];
				var fullName = fullNames[i];
				if (info.isFile()) {
					res.push(fullName);
				} else if (info.isDirectory()) {
					listFilesPromise(fullName).then((files) => {
						res.push(...files);
					});
				}
			}
		});
}
//tree，以缩进方式打开当前文件夹的目录树

//实现express

function express() {
	let middlewares = [];
	function expressApp(req, res) {
		step();
		function step() {
			let middleware = middlewares.shift();
			if (middleware) {
				middleware(req, res, () => {
					step();
				});
			}
		}
	}
	expressApp.use = function (middleware) {
		middlewares.push(middleware);
	};

	return expressApp;
}

function compose(middlewares) {
	return middlewares.reduceRight(
		(next, mw) => {
			return (
				req,
				res,
				() => {
					next(req, res);
				}
			);
		},
		() => {}
	);
}


function sum(...args) {
	let s = sum.bind(null, ...args);
	s.valueOf = function () {
		return args.reduce((a, b) => a + b);
	};
	return s;
}
sum(1, 2, 3).valueOf(); //6
sum(2, 3)(2).valueOf(); //7
sum(1)(2)(3)(4).valueOf(); //10
sum(2)(4, 1)(2).valueOf(); //9

//?1,2,3,4,4
[1, 2].forEach(async (ele) => {
	await console.log(ele);
	console.log(4);
});
console.log(3);

Promise.prototype.finally = function (f) {
	return this.then(
		(val) => {
			return Promise.resolve(f()).then(() => {
				return val;
			});
		},
		(reason) => {
			return Promise.resolve(f()).then(() => {
				throw reason;
			});
		}
	);
};

let x = { a: 1, b: 2 };

function func(obj) {
	obj = 3;
}
func(x);

//fn.call(context,xx,xx)=>context.fn(xx,xx)
Function.prototype.myCall = function (context) {
	//fn 挂在context 上
	context.fn = this;
	const args = [...arguments].slice(1);
	const res = context.fn(...args);
	delete context.fn;
	return res;
};

//fn.apply(context,[args])=>context.fn(...args)
Function.prototype.myApply = function (context) {
	context.fn = this;
	//第二个参数是数组
	const args = arguments[1];
	let res;
	if (args) {
		res = context.fn(...args);
	} else {
		res = context.fn();
	}
	delete context.fn;
	return res;
};

let divs = document.querySelectorAll("div");
for (var i = 0; i < divs.length; i++) {
	divs[i].addEventListener(
		"click",
		(function (frozenCounter) {
			return function () {
				console.log(frozenCounter);
			};
		})(i)
	);
}

for (var i = 1; i < 5; i++) {
	(function (i) {
		setTimeout(function () {
			console.log(i);
		}, 1000 * i);
	})(i);
}
