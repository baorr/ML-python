import {abs, sqrt} from '../lib/basic';


let initValue = (A) => {
    if(!(A instanceof Array)) throw('A is not Array');

    let temp = JSON.parse(JSON.stringify(A));

    if(!(A[0] instanceof Array)){
        temp = [temp];
    }
    return temp;
};

export default class Vector{

    constructor(A) {
        this.elem = initValue(A);
        this.rows = this.elem.length;
        this.cols = this.elem[0].length;
    }

    unitilize(){
        let elem = this.elem;
        let rows = this.rows;
        let cols = this.cols;
        let results = [];

        let d = this.distance();

        for(let i = 0;i < rows;i++){
            results[i] = results[i] ? results[i] : [];
            for(let j = 0;j < cols;j++){
                results[i].push(elem[i][j]/d);
            }
        }

        return new Vector(results);
    }

    distance(){
        let elem = this.elem;
        let rows = this.rows;
        let cols = this.cols;

        let sum = 0;

        for(let i = 0;i < rows;i++){
            for(let j = 0;j < cols;j++){
                sum += elem[i][j] * elem[i][j];
            }
        }

        return sqrt(sum);
    }

    getSize(){
        return {
            rows: this.rows,
            cols: this.cols
        };
    }

    add(m){
        let elem = this.elem;
        let rows = this.rows;
        let cols = this.cols;

        let addtionElem = m.elem;
        let results = [];

        for(let i = 0;i < rows;i++){
            results[i] = results[i] ? results[i] : [];
            for(let j = 0;j < cols;j++){
                results[i][j] = (addtionElem[i][j] + elem[i][j]);
            }
        }

        let res = new Vector(results);
        return res;
    }

    scalarMutiply(muti){
        let elem = this.elem;
        let rows = this.rows;
        let cols = this.cols;
        let results = [];

        for(let i = 0;i < rows;i++){
            results[i] = results[i] ? results[i] : [];
            for(let j = 0;j < cols;j++){
                results[i][j] = elem[i][j] * muti;
            }
        }  

        let res = new Vector(results);
        return res;      
    }

    substract(m){
        let elem = this.elem;
        let rows = this.rows;
        let cols = this.cols;

        let substractElem = m.elem;
        let results = [];

        for(let i = 0;i < rows;i++){
            results[i] = results[i] ? results[i] : [];
            for(let j = 0;j < cols;j++){
                results[i][j] = (elem[i][j] - substractElem[i][j]);
            }
        }

        let res = new Vector(results);
        return res;
    }

    mutiply(v){
        let elem = this.elem;
        let rows = this.rows;

        let mutiplyElem = v.elem;

        let cols = mutiplyElem[0].length;
        var mutiCols = elem[0].length;

        let results = [];

        for(let i = 0;i < rows;i++){
            results[i] = results[i] ? results[i] : [];
            for(let j = 0;j < cols;j++){
                results[i][j] = 0;
                for(let k = 0;k < mutiCols;k++){
                    results[i][j] += elem[i][k] * mutiplyElem[k][j];
                }
            }
        }

        let res = new Vector(results);
        return res;
    }

    innerProduct(v){
        let elem = this.elem;
        let velem = v.elem;
        let rows = this.rows;
        let cols = this.cols;
        let sum = 0;

        for(let i = 0;i < rows;i++){
            for(let j = 0;j < cols;j++){
                sum += elem[i][j] * velem[i][j];
            }
        }

        return sum;
    }

    transpose(){
        let elem = this.elem;
        let rows = this.rows;
        let cols = this.cols;

        let results = [];

        for(let i = 0;i < cols;i++){
            results[i] = results[i] ? results[i] : [];
            for(let j = 0;j < rows;j++){
                results[i][j] = elem[j][i];
            }
        }

        let res = new Vector(results);
        return res;
    }
};