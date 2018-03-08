import Matrix from './matrix.js';

let test = (ma, ba) => {
    console.log(`A is ${JSON.stringify(ma)}, B is ${JSON.stringify(ba)}`);

    let m = new Matrix(ma);
    let b = new Matrix(ba);

    console.log(m.solveEqutionsByLU(b));
};

test([
        [1, 1],
        [2, 3]
    ], 
    [
        [1],
        [1]
    ]);

test([
        [1, -2],
        [-1, 3]
    ], 
    [
        [-1],
        [3]
    ]);

test([
        [1, -2, 1],
        [0, 2, -8],
        [-4, 5, 9]
    ], 
    [
        [0],
        [8],
        [9]
    ]);

test([
        [1, -2, 1],
        [0, 2, -8],
        [-4, 5, 9]
    ], 
    [
        [0],
        [8],
        [-9]
    ]);

test([
        [2, -3, 2],
        [0, 1, -4],
        [5, -8, 7]
    ], 
    [
        [8],
        [1],
        [1]
    ]);

test([
        [8, 0],
        [0.45969769413186023,1.5403023058681398]
    ], 
    [
        [0],
        [0.1585290151921035]
    ]);