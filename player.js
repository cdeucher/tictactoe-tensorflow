const tensorRow = function (host) {
    let log = [0,0,0];
    let max   = 0;
    let index = false;
    let count = 0;

    console.log('tensorROL');
    return new Promise( (resolve, reject)=> {
        for(let i in host.cols){
          ann([host.cols[i]],i,host.callError).then((a) => {
              print('Completed tests at ' +a+ '... thanks for waiting!');
              host.callMax(i,a);
              count++;
              if(a > max){
                max = a;
                index = i;
              }
              //console.log(count , host.cols.length);
              if(count >= host.cols.length){
                 for(let i in host.cols){
                     if(host.cols[index][i] == 0){
                          console.log('win',host.cols[index]);
                          resolve({row:index,col:i,max:max});
                          break;
                     }
                 }
                 resolve({row:0,col:0,max:0});
              }
          });
        }
    })
}
const tensorCow = function (host) {
    let log = [0,0,0];
    let max   = 0;
    let index = false;
    let count = 0;
    let lines = [['0','0','0']
                ,['0','0','0']
                ,['0','0','0']];
    console.log('tensorCOL');
    return new Promise( (resolve, reject)=> {
        for(let i in host.cols){
          for(let j in host.cols[i]){
              lines[j][i] = host.cols[i][j];
          }
        }
        for(let i in lines){
          ann([lines[i]],i,host.callError).then((a) => {
              //console.log(lines[i]);
              print('Completed tests at ' +a+ '... thanks for waiting!');
              host.callMax(i,a);
              count++;
              if(a > max){
                max = a;
                index = i;
              }
              //console.log(count , host.cols.length);
              if(count >= lines.length){
                 for(let i in lines){
                     if(lines[index][i] == 0){
                          console.log('win',lines[index]);
                          resolve({row:i,col:index,max:max});
                          break;
                     }
                 }
                 resolve({row:0,col:0,max:0});
              }
          });
        }
    })
}
