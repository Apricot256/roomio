<template>
  <div class="border">
        
      <table>
        <tbody>
          <tr v-for="weeks, index in  history">
            <td v-for="day in weeks">
              <NuxtLink v-if="day.isColor" :to="day.link">
                <div class="cell" :style="{background: day.content}"></div>
              </NuxtLink>
              <div v-else-if="index!=0" class="lavel-day">{{ day.content }}</div>
              <div v-else-if="day.content!=''" class="lavel-month">{{ day.content }}</div>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script lang="ts">

import axios, { AxiosResponse, AxiosError } from "axios";

interface cell_t {
	content: string;
	isColor: boolean;
  link: string;
}


export default {
  name: 'History',
  data(){
    return{
      history: [] as cell_t[][],
      historyData: [] as number[]
    }
  },
	async mounted(){
    
    async function getHistoryData(): Promise<any[]> {
      const response = await axios.post('api//history');
      const data = response.data;
      const historyArray = data.history;
      return historyArray;
    }

    // @ts-ignore
    this.historyData = await getHistoryData();

    const getBeginDate = ():Date => {
      var lastYear: Date = new Date();
      lastYear.setFullYear(lastYear.getFullYear()-1);
      lastYear.setDate(lastYear.getDate() - lastYear.getDay());
      return lastYear;
    }

    const createLink = (date: Date): string => {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `/activity/${year}-${month}-${day}`;
    }

    const isOutRange = (pastDay: number):boolean => {
      var end: Date = new Date();
      var now = getBeginDate();
      now.setDate(now.getDate()+pastDay);
      return (now <= end)? true:false;
    }

    const getColor = (level: number):string => {
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

    var exMonth: number = getBeginDate().getMonth();

    for (let day = 0; day < 8; day++) {
      var row: cell_t[] = [];
      for (let week = 0; isOutRange((day-1)+7*(week-1)); week++) {
        var cell:cell_t = <cell_t>{};
        if(day == 0){
          cell.content = '';
          cell.isColor = false;
        }else{
          if(week == 0){
            cell.content = ['', 'Mon', '', 'Wed', '', 'Fri', ''][day-1];
            cell.isColor = false;
          }else{
            var currentDate: Date = getBeginDate();
            currentDate.setDate(currentDate.getDate()+(day-1)+7*(week-1)); 
            cell.link = createLink(currentDate);
            // @ts-ignore
            cell.content = getColor(this.historyData[(day-1)+7*(week-1)]);
            cell.isColor = true;

            // Make name of month label
            if((exMonth+1)%12 == currentDate.getMonth() && day == 6){
              // @ts-ignore
              this.history[0][week].content = currentDate.toLocaleString('default', { month: 'short' });
              exMonth = currentDate.getMonth();
            }
          }
        }
        row.push(cell);
      }
      // @ts-ignore
      this.history.push(row);
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

    .lavel-day{
      color: white;
      font-family: system-ui;
      font-size: 10px;
    }

    .lavel-month{
      width: 10px;
      height: 10px;
      color: white;
      font-family: system-ui;
      font-size: 10px;
    }

    td > div.lavel-month{
      column-span: 2;
    }

    table{
      border-spacing: 1px;
    }
</style>
