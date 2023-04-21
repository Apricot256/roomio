<template>
  <div class="border">
        
      <table>
        <tr v-for="weeks in  history">
          <td v-for="day in weeks">
            <div v-if="day.isColor" class="cell" :style="{background: day.content}"></div>
            <div v-else class="lavel">{{ day.content }}</div>
          </td>
        </tr>
      </table>
  </div>
</template>

<script lang="ts">

interface cell_t {
	content: string;
	isColor: boolean;
}

export default {
  name: 'History',
  data(){
    return{
      history: [] as Array<Array<cell_t>>
    }
  },
	mounted(){

    var data = new Array(366);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.floor(Math.random() * 10);
    }

    const getBeginDate = ():Date => {
      var lastYear: Date = new Date();
      lastYear.setFullYear(lastYear.getFullYear()-1);
      lastYear.setDate(lastYear.getDate() - lastYear.getMonth());
      return lastYear;
    }

    const isOutRange = (pastDay: number):boolean => {
      var end: Date = new Date();
      var now = getBeginDate();
      now.setDate(now.getDate()+pastDay);
      return (now <= end)? true:false;
    }

    for (let day = 0; day < 8; day++) {
      var row: cell_t[] = [];
      for (let week = 0; isOutRange((day-1)+7*(week-1)); week++) {
        var cell:cell_t = <cell_t>{content:'', isColor: false};
        if(day == 0){
          
        }else{
          if(week == 0){
            cell.content = ['', 'Mon', '', 'Wed', '', 'Fri', ''][day-1];
            cell.isColor = false;
          }else{
            cell.content = this.getColor(data[(day-1)+7*(week-1)]);
            cell.isColor = true;
          }
        }
        console.log()
        row.push(cell);
      }
      this.history.push(row);
    }
    console.log(this.history.length)
    console.log(this.history[0].length)
  },
  methods: {
    getColor : (level: number):string => {
      if(level == 0){
        return '#161C22';
      }else if(level <= 2){
        return '#0E442A';
      }else if(level <= 6){
        return '#006D32';
      }else if(level <= 8){
        return '#26A641';
      }else{
        return '#39D353';
      }
    }
  }

}


</script>

<style scoped>

    .border{
      border: solid;
      border-color: gray;
      border-radius: 5px;
      padding: 6px;
      overflow-y: hidden;
      display: inline-block;
    }

    .cell{
      width: 10px;
      height: 10px;
      border-radius: 1px;
      background: #808080;
    }

    .lavel{
      color: white;
      font-family: system-ui;
      font-size: 10px;
    }

    table{
      border-spacing: 1px;
    }
</style>
