import {exp, pow, abs, ln, sin, cos} from '../lib/basic';
import Matrix from '../matrix/matrix';

let initData = (...m) => {
	let al = m.length - 1;
	let resX = [];
	let resY = m[al];;
	let belta = [];
	let temp = [];
	let N = resY.length;

	for(let i = 0;i < N;i++){
		temp = [1];
		for(let j = 0;j < al;j++){
			temp.push(m[j][i]);
		}
		resX.push(temp);
	}

	al = al + 1;
	for(let i = 0;i < al;i++){
		belta.push(0);
	}

	return {
		x: resX,
		y: resY,
		b: belta
	}
};

let _genLinearResults = (b, x) => {
	let sum = 0;
	b.forEach((e, index) => {
		sum += e * x[index];
	});
	return sum;
};

let base = (b, x) => {
	let y = _genLinearResults(b, x);
	let res = exp(y);
	return res;
};

let piFuc = (b, x) => {
	let bs = base(b, x);
	let res = bs / (1 + bs);
	return res;
};

let diffFunc = (b, x) => {
	let p = base(b, x);
	p = p / pow(1 + p, 2);
	return -1 * p;
};

let genHMatrix = (b, x) => {
	let l = b.length;
	let xm = new Matrix(x);

	xm = xm.transpose().mutiply(xm);
	
	xm.scalarMutiply(diffFunc(b, x));

	return xm;
};

let genFuncMatrix = (b, x, y) => {
	let xm = new Matrix(x);
	let tempb = (y - piFuc(b, x));
	
	xm.scalarMutiply(tempb);

	return xm;
};

let logisiticRegression = (x, y) => {

	let obj = initData(x, y);
	let resX = obj.x;
	let b = obj.b;
	let bl = b.length;
	let fs = Matrix.genMatrixByDefualt(1, bl);
	let Fs = Matrix.genMatrixByDefualt(bl, bl);

	resX.forEach((e, index) => {
		fs = fs.add(genFuncMatrix(b, e, y[index]));
		Fs = Fs.add(genHMatrix(b, e));
	});

	Fs.solveEqutionsByLU(fs.transpose());

}
