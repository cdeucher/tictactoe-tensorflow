let data = {
    cols: [[0,0,0]
          ,[0,0,0]
          ,[0,0,0]],
    error:[0,0,0],
    max:[0,0,0],
    win: 'Waiting',
    row:undefined,
    col:undefined
}
var app = new Vue({
  el: '#app',
  data:data,
  methods:{
    item(row_index,col_index, point){
       this.win = 'Playing';
       Vue.set(this.cols[row_index], col_index, point);

         tensorRow(this).then((obj) => {
              console.log('tensorRow',obj);
              this.row = obj;
              this.choice();
         });
         tensorCow(this).then((obj) => {
              console.log('tensorCow',obj);
              this.col = obj;
              this.choice();
         });

    },
    choice(){
        if(this.col != undefined && this.row != undefined){
            if(this.col.max >= this.row.max){
              Vue.set(this.cols[this.col.row], this.col.col, 1);
              Vue.set(this.max, this.col.row, this.col.max);
            }else{
              Vue.set(this.cols[this.row.row], this.row.col, 1);
              Vue.set(this.max, this.row.row, this.row.max);
            }
            this.row = undefined;
            this.col = undefined;
        }
    },
    callMax(i,log){
        Vue.set(this.max, i, log);
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
