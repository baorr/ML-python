from numpy import *
import mlp;

data = loadtxt('./data/iris_proc.data',delimiter=',')   #get all the dataset


inputs = data[:,:4];

targets = zeros((shape(data)[0],3));     #init the target data;
indices = where(data[:,4]==0)           #get the first class's indices;
targets[indices,0] = 1                   #reset the first class's indices of the target data;
indices = where(data[:,4]==1)           #get the second class's indices;
targets[indices,1] = 1                   #reset the second class's indices of the target data;
indices = where(data[:,4]==2)           #get the third class's indices;
targets[indices,2] = 1                   #reset the third class's indices of the target data;

trains = data[::2,0:4]
traints = targets[::2, :]

valid = data[1::4,0:4]
validt = targets[1::4, :]

test = data[3::4,0:4]
testt = targets[3::4, :]

m = mlp.MLP(trains, traints, 5);
m.applyTrain(trains, traints, valid, validt, 0.1, 100);
m.confmat(test, testt);