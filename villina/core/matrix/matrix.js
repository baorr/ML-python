import {abs} from '../lib/basic';

const delta = 1e-10; 

let genArray = (rows, cols, e = delta) => {
    let mar = [];

    for(let i = 0;i < rows;i++){
        mar[i] = mar[i] ? mar[i] : [];
        for(let j = 0;j < cols;j++){
            mar[i][j] = e;
        }
    }

    return new Matrix(mar);
};

let initValue = (A) => {
    if(!(A instanceof Array)) throw('A is not Array');

    let temp = JSON.parse(JSON.stringify(A));

    if(!(A[0] instanceof Array)){
        temp = [temp];
    }
    return temp;
}

let genMatrixByDefualt = (rows, cols, v = 0) => {
    let mar = [];
    for(let i = 0;i < rows;i++){
        mar[i] = mar[i] ? mar[i] : [];
        for(let j = 0;j < cols;j++){
            mar[i][j] = v;
        }
    }
    return new Matrix(mar);
};

export default class Matrix{

    constructor(A) {
        this.matrix = initValue(A);
        this.rows = this.matrix.length;
        this.cols = this.matrix[0].length;
    }

    getSize(){
        return {
            rows: this.rows,
            cols: this.cols
        };
    }

    splitMatrix(){
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let res = {
            L: [],
            D: [],
            U: []
        };

        for(let i = 0;i < rows;i++){
            res.L[i] = res.L[i] ? res.L[i] : [];
            res.U[i] = res.U[i] ? res.U[i] : [];
            res.D[i] = res.D[i] ? res.D[i] : [];
            for(let j = 0;j < cols;j++){
                let a = matrix[i][j];
                if(i > j){
                    res.L[i][j] = 0 - a;
                    res.D[i][j] = 0;
                    res.U[i][j] = 0;
                }else if(i == j){
                    res.L[i][j] = 0;
                    res.D[i][j] = 1/a;
                    res.U[i][j] = 0;
                }else if(i < j){
                    res.L[i][j] = 0;
                    res.D[i][j] = 0;
                    res.U[i][j] = 0 - a;
                }
            }
        }

        return {
            L: new Matrix(res.L),
            D: new Matrix(res.D),
            U: new Matrix(res.U)
        };
    }

    add(m){
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let addtionMatrix = m.matrix;
        let mar = [];

        for(let i = 0;i < rows;i++){
            mar[i] = mar[i] ? mar[i] : [];
            for(let j = 0;j < cols;j++){
                mar[i][j] = (addtionMatrix[i][j] + matrix[i][j]);
            }
        }

        let res = new Matrix(mar);
        return res;
    }

    scalarMutiply(muti){
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        for(let i = 0;i < rows;i++){
            for(let j = 0;j < cols;j++){
                matrix[i][j] = matrix[i][j] * muti;
            }
        }        
    }

    substract(m){
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let addtionMatrix = m.matrix;
        let mar = [];

        for(let i = 0;i < rows;i++){
            mar[i] = mar[i] ? mar[i] : [];
            for(let j = 0;j < cols;j++){
                mar[i][j] = (matrix[i][j] - addtionMatrix[i][j]);
            }
        }

        let res = new Matrix(mar);
        return res;
    }

    mutiply(m){
        let matrix = this.matrix;
        let rows = this.rows;
        

        let mutiplyMatrix = m.matrix;

        let cols = mutiplyMatrix[0].length;
        var mutiCols = matrix[0].length;

        let mar = [];

        for(let i = 0;i < rows;i++){
            mar[i] = mar[i] ? mar[i] : [];
            for(let j = 0;j < cols;j++){
                mar[i][j] = 0;
                for(let k = 0;k < mutiCols;k++){
                    mar[i][j] += matrix[i][k] * mutiplyMatrix[k][j];
                }
            }
        }

        let res = new Matrix(mar);
        return res;
    }

    solveMarixEquation(b, initX){
        let res = this.splitMatrix();

        let tempX = initX;

        let fixParts = res.L.add(res.U);
        let cons = res.D.mutiply(b);
        let N = 1;

        fixParts = res.D.mutiply(fixParts);
        initX = fixParts.mutiply(initX).add(cons);

        while(!tempX.compare(initX)){
            tempX = initX;
            console.log(`${N++}`);
            console.log(`${JSON.stringify(initX)}`);
            console.log(`======================`);
            initX = fixParts.mutiply(initX).add(cons);
        }

        return tempX;
    }

    compare(m, e = delta){
        let rows = this.rows;
        let cols = this.cols;

        let matrix = this.matrix;
        let compareMatrix = m ? m : genMatrixByDefualt(rows, cols);
        compareMatrix = compareMatrix.matrix;

        for(let i = 0;i <rows ;i++){
            for(let j = 0;j < cols;j++){
                if(abs(matrix[i][j] - compareMatrix[i][j]) > e){
                    return false;
                }
            }
        }

        return true;
    }

    transpose(){
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let mar = [];

        for(let i = 0;i < cols;i++){
            mar[i] = mar[i] ? mar[i] : [];
            for(let j = 0;j < rows;j++){
                mar[i][j] = matrix[j][i];
            }
        }

        let res = new Matrix(mar);
        return res;
    }

    getElementByColumn(colIndex){
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = colIndex - 1;

        let mar = [];

        for(let i = 0;i < rows;i++){
            mar[i] = [];
            mar[i][0] = matrix[i][cols];
        }

        let res = new Matrix(mar);
        return res;
    }

    LUsplit(){
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let computeL = (i, j, L, U) => {
            let sum = 0;
            let l = j;
            for(let k = 0;k < l;k++){
                sum += L[i][k] * U[k][j];
            }
            return sum;
        };

        let computeU = (i, j, L, U) => {
            let sum = 0;
            let l = i;
            for(let k = 0;k < l;k++){
                sum += L[i][k] * U[k][j];
            }
            return sum;
        };

        let L = [];
        let U = [];

        let k = 0;

        for(let i = 0;i < cols;i++){
            L[i] = L[i] ? L[i] : [];
            U[i] = U[i] ? U[i] : [];
            for(let j = 0;j < rows;j++){
                if(i <= j){
                    U[i][j] = matrix[i][j] - computeU(i, j, L, U);
                    L[i][j] = (i < j) ? 0 : 1;
                }else {
                    U[i][j] = 0;
                    L[i][j] = (matrix[i][j] - computeL(i, j, L, U))/U[j][j];
                }
            }
        }

        return {
            L: new Matrix(L),
            U: new Matrix(U)
        }
    }

    solveEqutionsByLU(b){
        let m = this.LUsplit();

        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let computeY = (i, L, Y) => {
            let sum = 0;
            let l = i;
            for(let j = 0;j < l;j++){
                sum += L[i][j] * Y[j];
            }
            return sum;
        };

        let computeX = (i, U, X) => {
            let sum = 0;
            let s = i + 1;
            for(let j = s;j < cols;j++){
                sum += U[i][j] * X[j];
            }
            return sum;
        };

        console.log(m);

        let L = m.L.matrix;
        let U = m.U.matrix;
        let B = b.transpose().matrix[0];

        let Y = [B[0]/L[0][0]];


        for(let i = 1;i < cols;i++){
            Y[i] = (B[i] - computeY(i, L, Y))/L[i][i];
        }

        let X = [];
        let N = cols - 1;

        X[N] = Y[N] / U[N][N];

        for(let i = N - 1;i > -1;i--){
            X[i] = (Y[i] - computeX(i, U, X))/U[i][i];
        }

        return {
            X: new Matrix(X),
            Y: new Matrix(Y)
        }
    }

    static genMatrixByDefualt(rows, cols, v = 0){
       return genMatrixByDefualt(rows, cols, v = 0)
    }
};