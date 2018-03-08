let fs = [];
let Fs = [];

obj.x.forEach((e, index) => {
	f.forEach((elem, i) => {
		fs[i] = fs[i] ? fs[i] : 0;
		fs[i] += elem(b, e, y[index], i);
	});

	F.forEach((el, i) => {
		Fs[i] = Fs[i] ? Fs[i] : [];
		el.forEach((elem, j) => {
			Fs[i][j] = Fs[i][j] ? Fs[i][j] : 0;
			Fs[i][j] +=elem(b, e, j < i ? i : j);
		});
	});
});

console.log(fs);
console.log(Fs);


let Am = new Matrix(Fs);
let bm = new Matrix(fs);
bm = bm.transpose();

let result = Am.solveEqutionsByLU(bm);

console.log(JSON.stringify(result));


b = new Matrix(b);
console.log(JSON.stringify(b));
b = b.substract(result.X);
console.log(JSON.stringify(b));

b = b.matrix[0];

let M = 100;
let CNT = 0;
let test = () => {
	while(--M && !result.X.compare()){
		console.log(`==========${++CNT}=============`);
		fs = [];
		Fs = [];

		obj.x.forEach((e, index) => {
			f.forEach((elem, i) => {
				fs[i] = fs[i] ? fs[i] : 0;
				fs[i] += elem(b, e, y[index], i);
			});

			F.forEach((el, i) => {
				Fs[i] = Fs[i] ? Fs[i] : [];
				el.forEach((elem, j) => {
					Fs[i][j] = Fs[i][j] ? Fs[i][j] : 0;
					Fs[i][j] +=elem(b, e, j < i ? i : j);
				});
			});
		});

		console.log(fs);
		console.log(Fs);

		Am = new Matrix(Fs);
		bm = new Matrix(fs);
		bm = bm.transpose();

		result = Am.solveEqutionsByLU(bm);

		console.log(JSON.stringify(result));

		b = new Matrix(b);
		console.log(JSON.stringify(b));
		b = b.substract(result.X);
		console.log(JSON.stringify(b));

		b = b.matrix[0];
	}

}

test();