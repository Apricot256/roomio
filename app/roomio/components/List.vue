<template>
    <div class="master">
			<table v-if="!isEmpty" id="table">
				<thead>
					<tr>
						<!-- <th class="status">Status</th> -->
						<th class="name">Name</th>
						<th class="place">Place</th>
						<th class="in-t">In Time</th>
						<th class="spent-t">Spend Time</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="elem in todaysLog">
						<!-- <td>Active <div class="dot"></div></td> -->
						<td>{{ elem.name }}</td>
						<td>{{ elem.place }}</td>
						<td>{{ elem.inTime.toLocaleTimeString('ja-JP') }}</td>
						<td>{{ getSpendTime(elem.inTime).toLocaleTimeString('ja-JP') }}{{ getEmoji(getSpendTime(elem.inTime)) }}</td>
					</tr>
				</tbody>
			</table>
			<div v-if="isEmpty" class="no-room">
				<p>No one is active in any room.</p>
			</div>
    </div>
</template>

<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";

interface Log_t {
	name: string;
	place: String;
	inTime: Date;
}

export default {
  name: 'List',
  data() {
      return{
        isEmpty :false,
		todaysLog: [] as Array<Log_t>
      }
  },
	mounted(){
		axios.post('api/activeuser')
				.then((res: AxiosResponse<Log_t[]>) => {
				// Sort by name and stores
				res.data.forEach(elem => {
					// @ts-ignore
					this.todaysLog.push({'name': elem.name, 'place': elem.place, 'inTime': new Date(elem.inTime)});
				});
				// @ts-ignore
				this.todaysLog.sort((a, b) => {return (a.name < b.name) ? -1 : 1; });
				// @ts-ignore
				if(this.todaysLog.length == 0)this.isEmpty = true;
			}).catch((e: AxiosError<{ error: string }>) => {
				console.log(e.message);
			});
	},
	methods: {
		getSpendTime: (time: Date):Date => {
			var currentTime:Date = new Date();
			currentTime.setFullYear(currentTime.getFullYear() - time.getFullYear());
			currentTime.setMonth(currentTime.getMonth() - time.getMonth());
			currentTime.setHours(currentTime.getHours() - time.getHours());
			currentTime.setMinutes(currentTime.getMinutes() - time.getMinutes());
			currentTime.setSeconds(currentTime.getSeconds() - time.getSeconds());
			return currentTime;
		},
		getEmoji: (time: Date):string => {
			const hour = time.getHours();
			if(hour <= 0){
				return ' 🐣';
			}else if(hour <= 1){
				return ' 🐔';
			}else if(hour <= 2){
				return ' ✨';
			}else if(hour <= 3){
				return ' 🔥';
			}else{
				return ' 🥜'
			}
		}
	}
}

</script>

<style scoped>
    .master{
	  border: solid;
      border-color: gray;
      border-radius: 5px;
      padding: 2px 2px 2px 2px;
      overflow-y: hidden;
      display: inline-block;
    }

    #table{
        color: white;
        font-family: system-ui;
				font-size: 1.2rem;
				text-align: left;
				display: block;
  			border-collapse: collapse;
				border-spacing: 5px;
				overflow-x: scroll;
				margin: 1rem;
    }

	.dot {
		height: 8px;
		width: 8px;
		background-color: greenyellow;
		border-radius: 50%;
		display: inline-block;
		filter: drop-shadow(0em 0em 30px green);
	}

	.no-room{
		width: 700px;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: system-ui;
		color: gray;
	}

	th{
		border-bottom: 1px solid white;
	}

	td, th{
		height: 40px;
		padding-right: 1rem;
		padding-left: 1rem;
	}




</style>
