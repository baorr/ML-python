const Exp = Math.exp;
const pow = Math.pow;
const abs = Math.abs;
const ln = Math.log;
const delta = 0.0000000001;

if(!Array.prototype.sum){
	Array.prototype.sum = () => {
		let N = this.length;
		let sum = 0;
		
		for(let i = 0;i < N;i++){
			sum += this[i];
		}

		return sum/N;
	}
}

const x = [20,23,24,25,25,26,26,28,28,29,30,30,30,30,30,30,32,32,33,33,34,34,34,34,34,35,35,36,36,36,37,37,37,38,38,39,39,40,40,41,41,42,42,42,42,43,43,43,44,44,44,44,45,45,46,46,47,47,47,48,48,48,49,49,49,50,50,51,52,52,53,53,54,55,55,55,56,56,56,57,57,57,57,57,57,58,58,58,59,59,60,60,61,62,62,63,64,64,65,69];
const y = [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,1,0,0,1,1,0,1,0,1,0,0,1,0,1,1,0,0,1,0,1,0,0,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1];

const N = y.length;

let belta = [0, -0.05];

let base = (x) => {
	let y = belta[0] + belta[1] * x;
	let res = Exp(y);
	console.log(`${belta[0]} + ${belta[1]} * ${x} = ${y}`);
	console.log(`e^${y} = ${res}`);
	return res;
};

let piFuc = (x) => {
	let b = base(x);
	let res = 1 / (1 + b);
	console.log(`1 / (1 + ${b}) = ${res}`);
	return res;
};


/*let F = (y, x) => {
	var h = piFuc(x);
	var res = y * ln(h) + (1 - y) * ln(1 - h);

	console.log(`${y} * ln(${h}) + ${(1 - y)} * ln(${1 - h}) = ${res}`);
	return res;
}*/


/*for(let i = 0;i < N;i++){
	console.log('<=================>');
	F(y[i], x[i]);
}*/

let f = [
	(x, y) => {
		return (y - piFuc(x));
	},
	(x, y) => {
		return x * (y - piFuc(x));
	}
];

let A = () => {
	let fs = [];
	let Fs = [];
	let l = belta.length;
	for(let i =0;i < l;i++){
		f[i] = 0;
		for(let j =0;j < N;j++){
			fs[i] += f[i](x[j], y[j]);
		}
	}
	return fs;
}



console.log(A());


/*

	[yi −π(xi)]=0 

	xi[yi − π(xi)] = 0.

		     e(β0 +β1x)
     π(x) = ------------
	        1 + e(β0+β1x) .

*/

/*let base = (x, beta0, beta1) => {
	return Exp(x * beta1 + beta0);
}

let ff = (beta0, beta1) => {
	let result = {c: 0, f: 0};

	y.forEach((e, index) => {
		let temp = data[index];
		let atom = base(temp, beta0, beta1);
		let f = (e - atom/(1+atom));

		result.c += f;
		result.f += temp * f;
	});

	console.log(result);
	return result;
}

let genMatrix = (data, beta0, beta1) => {

	let f = {a:0, b: 0, d: 0, e: 0};

	for(let e of data){ 
		let atom = base(e, beta0, beta1);
		let atom_base = pow(atom + 1, 2);
		let item = atom / atom_base;
		f.a += item;
		f.b += e * item; 
		f.d += e * item;
		f.e += pow(e, 2) * item;
	}

	console.log(f);
	return f;

};

let solveEq = (m, r) => {

	let a = m.a;
	let b = m.b;
	let c = r.c;
	let d = m.d;
	let e = m.e;
	let f = r.f;

	return {
		beta0: (c * e - b * f)/(a * e - b * d),
		beta1: (c * d - a * f)/(b * d - a * e)
	};

}


let iter = (belta = {beta0: 0, beta1: 0}) => {
	let m = genMatrix(data, belta.beta0, belta.beta1);
	let b = ff(belta.beta0, belta.beta1); 
	let temp = solveEq(m, b);
	let N = 1;

	console.log(`${N} ==> ${JSON.stringify(temp)}`);

	while(abs(temp.beta0 - belta.beta0) > delta && abs(temp.beta1 - belta.beta1) > delta){
		belta = temp;
		N++;

		m = genMatrix(data, belta.beta0, belta.beta1);
		b = ff(belta.beta0, belta.beta1); 
		temp = solveEq(m, b);
		console.log(`${N} ==> ${JSON.stringify(belta) }`);
	}
	
	return belta;
}

let res = iter();

let maxLikeHood = (b) => {
	let res = 0;
	let belta0 = b.beta0;
	let belta1 = b.beta1;

	data.forEach( (e, index) => {
		let p0 = base(e, belta0, belta1);
		let p1 = 1 - p0;
		let ty = y[index];

		res += ty * ln(p0) + (1-ty) * ln(p1);
	});
	console.log(res);
	return res;
}

maxLikeHood(res);*/

/*let base = (x, beta0, beta1) => {
	
	let b = 1/Exp(x * beta1 + beta0);
	console.log(b + `${x * beta1 + beta0}`);
	return b;
};

let hbelta = (x, beta0, beta1) => {

	let h = 1/(1 + base(x, beta0, beta1));
	console.log(h);

	return h;
};

let J = (beta0 = data.sum(), beta1 = 0) => {
	let sum = 0;
	let deltaJ = 0;
	let H = 0;

	for(let i = 0;i < N;i++){
		let y = binaray[i];
		let x = data[i];
		let h = hbelta(x, beta0, beta1);
		sum += (y * ln(y) + (1-y) * ln(1 - y));
		deltaJ += (h - y) * x;
		H += (1 - h) * h * x * x;
		console.log(`${i} === ${sum} === ${deltaJ} === ${H}`);
	}

	return {
		result: sum/N,
		deltaJ: deltaJ/N,
		H: H/N
	};
};


let t = J();
console.log(t);*/



