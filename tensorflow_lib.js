var train = [[1, 1, 1],
             [1, 1, 0],
             [1, 0, 1],
             [0, 1, 1],

             [-1,0,-1],
             [-1,-1,0],
             [0,-1,-1],

             [0 , 0, 0],

             [-1,-1,-1],
             [-1, 0, 0],
             [0, -1, 0],
             [0 , 0,-1],
             [-1, 0, 1],
             [1 , 0,-1],
             [0 , 1,-1],
             [1 ,-1, 0],
             [0 ,-1, 1],
             [-1 ,1, 0]
           ];

var index = [[0],[0],[0],[0], [2],[2],[2], [1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1]];
let print = (a)=>{ console.log(a); }
const ann = function (args,indexLog,callLog) {
 return new Promise(function (resolve, reject) {
   try {
         const model = tf.sequential();
          model.add(tf.layers.dense({ units: 16, inputShape: 3, activation: 'tanh' }));
          model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
          model.compile({ optimizer: 'sgd', loss: 'binaryCrossentropy', lr: 0.1 });
          // Creating dataset
          const xs = tf.tensor2d(train);
          const ys = tf.tensor2d(index);
          const target = tf.tensor2d(args);
          // Train the model
          model.fit(xs, ys, {
              epochs: 100,
              callbacks: {
                onEpochEnd: async (epoch, log) => {
                  if (epoch % 100 == 0) console.log(`Epoch ${epoch}: loss = ${log.loss}`);
                  callLog(indexLog,log.loss);
                }
              }
            }).then(() => {
            //print("")
            //print('Running ANN for: epochs')
            let result = model.predict(target);//.print();
            let index = result.dataSync()[0].toFixed(2);
            resolve(index)
           });
     } catch (ex) {
       resolve(print(ex))
     }
 })
}

//print('Beginning Logic ANN tests at ' + new Date() + '... this may take a while!')
//ann([[0,0,1]]).then(function (a) {
//   print('Completed tests at ' + new Date() + '... thanks for waiting!')
//})
