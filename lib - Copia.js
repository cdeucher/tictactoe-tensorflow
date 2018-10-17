let data = {
    cols: [['0','0','0']
          ,['0','0','0']
          ,['0','0','0']],
    error:[0,0,0],
    log:[0,0,0],
    msg:'Play'
}
var app = new Vue({
  el: '#app',
  data:data,
  methods:{
    item(row_index,col_index, point){
       Vue.set(this.cols[row_index], col_index, point);
       this.clearLog();
       this.tensorROL();
       //this.tensorCOL();
    },
    tensorROL(){
      console.log('tensorROL');
      let max   = 0;
      let index = 0;
      for(let i in this.cols){
        //console.log(this.cols[i]);
        ann([this.cols[i]],i,this.callError).then((a) => {
          print('Completed tests at ' +a+ '... thanks for waiting!');
          if(a > max){
            max = a;
            index = i;
          }
          this.callLog(i,a,index);
        });
      }
    },
    tensorCOL(){
      console.log('tensorCOL');
      let lines = [['0','0','0']
                  ,['0','0','0']
                  ,['0','0','0']];
      for(let i in this.cols){
        for(let j in this.cols[i]){
            lines[j][i] = this.cols[i][j];
        }
      }
      for(let i in lines){
          ann([lines[i]],i,this.callError).then((a) => {
            print('Completed tests at ' +a+ '... thanks for waiting!');
            this.callLog(i,a);
          });
      }
    },
    callLog(i,log,index){
        Vue.set(this.log, i, log);
        let count = 0;
        for(let i in this.log){
          if(this.log[i] == 0){
            count++;
          }
        }
        if(count == 0)
          this.play(index);
    },
    clearLog(){
        for(let i in this.log){
            Vue.set(this.log, i, 0);
        }
        for(let i in this.error){
            Vue.set(this.error, i, 0);
        }
    },
    play(index){
      for(let i in this.cols[index]){
         if(this.cols[index][i] == 0){
           this.item(index,i, 1)
           //Vue.set(this.cols[index], i, 1);
           this.msg = "Win";
           break;
         }
      }
    },
    callError(i,log){
        Vue.set(this.error, i, log);
    },
    reload(){
       for(let index in this.cols){
          for(let i in this.cols[index]){
              Vue.set(this.cols[index], i, 0);
          }
       }
    }
  }
});
