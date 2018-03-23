from numpy import *
# https://docs.scipy.org/doc/numpy/reference/arrays.ndarray.html#array-methods

def initliseWeights(rows, cols):
    weights = (random.rand(rows, cols)-0.5)*2/sqrt(rows);
    return weights;

def transform(inputs, w, beta=1):
    trans = dot(inputs,w);
    outputs = 1.0/(1.0+exp(-beta * trans));
    return outputs;


class MLP:
    def __init__(self, inputs, targets, hiddenlayerSize, beta=1, momentum=0.9, transformType='logistic'):
        self.inputSize = shape(inputs)[0];                 #how many size of the input data;
        self.singleInputVectorSize = shape(inputs)[1];     #how many size of the single vector of the input data;
        self.singleOutputVectorSize = shape(targets)[1];   #how many size of the single vector of the output data;
        self.hiddenlayerSize = hiddenlayerSize;            #how many layers of the hidden layer;

        self.beta = beta;           #beta for sigmoid function
        self.momentum = momentum;   #ratio for the last weight when update it add to the new weight;
        self.transformType = transformType;     #the type of tansform data;

        self.w1 = initliseWeights(self.singleInputVectorSize + 1, self.hiddenlayerSize);
        self.w2 = initliseWeights(self.hiddenlayerSize + 1, self.singleOutputVectorSize);

    def calc(self, inputs):

        self.hiddenInputs = transform(inputs, self.w1, self.beta);
        # hidden layer
        self.hiddenInputs = concatenate((self.hiddenInputs, -ones((shape(self.hiddenInputs)[0], 1))), axis=1)
        # ouputs
        outputs = transform(self.hiddenInputs, self.w2, self.beta);

        return outputs;


    def train(self,inputs, targets, eta, niterations):
        updatew1 = zeros((shape(self.w1)));
        updatew2 = zeros((shape(self.w2)));

        inputs = concatenate((inputs, -ones((self.inputSize, 1))), axis=1)
        change = range(self.inputSize);

        for n in range(niterations):
            self.outputs = self.calc(inputs);
            self.updateWeights(inputs, targets, updatew1, updatew2, eta);

            random.shuffle(change)
            inputs = inputs[change, :]
            targets = targets[change, :]

    def updateWeights(self, inputs, targets, updatew1, updatew2, eta): # update the weights
        outputs = self.outputs;
        hiddenInputs = self.hiddenInputs;
        momentum = self.momentum;
        w1 = self.w1;
        w2 = self.w2;

        ##generate the output update
        eltaouputs = (targets - outputs) * outputs * (1 - outputs);
        ##generate hidden layer update
        eltahiddenlayer = hiddenInputs * (1 - hiddenInputs) * (dot(eltaouputs, transpose(w2)));

        updatew1 = eta * (dot(transpose(inputs), eltahiddenlayer[:, : -1])) + momentum * updatew1;
        updatew2 = eta * (dot(transpose(hiddenInputs), eltaouputs)) + momentum * updatew2;

        self.w1 = w1 + updatew1;
        self.w2 = w2 + updatew2;

    def applyTrain(self, inputs, targets, valid, validtargets, eta, niterations):
        valid = concatenate((valid, -ones((shape(valid)[0], 1))), axis=1)

        old_val_error1 = 100002
        old_val_error2 = 100001
        new_val_error = 100000

        count = 0
        while (((old_val_error1 - new_val_error) > 0.001) or ((old_val_error2 - old_val_error1) > 0.001)):
            count += 1
            print count
            self.train(inputs, targets, eta, niterations)
            old_val_error2 = old_val_error1
            old_val_error1 = new_val_error
            validout = self.calc(valid)
            new_val_error = 0.5 * sum((validtargets - validout) ** 2)

        print "Stopped", new_val_error, old_val_error1, old_val_error2
        return new_val_error

    def confmat(self, inputs, targets):
        # Add the inputs that match the bias node
        inputs = concatenate((inputs, -ones((shape(inputs)[0], 1))), axis=1)
        outputs = self.calc(inputs)

        nclasses = shape(targets)[1]

        if nclasses == 1:
            nclasses = 2
            outputs = where(outputs > 0.5, 1, 0)
        else:
            # 1-of-N encoding
            outputs = argmax(outputs, 1) #get the column's index of the max element in each row.
            targets = argmax(targets, 1) #get the column's index of the max element in each row.

        cm = zeros((nclasses, nclasses))
        for i in range(nclasses):
            for j in range(nclasses):
                cm[i, j] = sum(where(outputs == i, 1, 0) * where(targets == j, 1, 0)) # if i == j, it is classified correctly, else is misclassified.

        print "Confusion matrix is:"
        print cm
        print "Percentage Correct: ", trace(cm) / sum(cm) * 100