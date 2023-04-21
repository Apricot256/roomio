<template>
    <div class="master">
			<table v-if="!isEmpty" id="table">
				<tr>
					<!-- <th class="status">Status</th> -->
					<th class="name">Name</th>
					<th class="place">Place</th>
					<th class="in-t">In Time</th>
					<th class="spent-t">Spend Time</th>
				</tr>
				<tr v-for="elem in todaysLog">
					<!-- <td>Active <div class="dot"></div></td> -->
					<td>{{ elem.ID }}</td>
					<td>{{ elem.place }}</td>
					<td>{{ elem.inTime.toLocaleTimeString('ja-JP') }}</td>
					<td>{{ getSpendTime(elem.inTime).toLocaleTimeString('ja-JP') }}{{ getEmoji(getSpendTime(elem.inTime)) }}</td>
				</tr>
			</table>
			<div v-if="isEmpty" class="no-room">
				<p>No one is active in any room.</p>
			</div>
    </div>
</template>

<script lang="ts">

interface Log_t {
	ID: string;
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
		this.todaysLog = [
				{'ID': 'mochi','place': 'MediaLab' ,'inTime':new Date(2023, 4, 20)},
				{'ID': 'mochi','place': 'MediaLab' ,'inTime':new Date(2023, 4, 20, 1)},
				{'ID': 'mochi','place': 'MediaLab' ,'inTime':new Date(2023, 4, 20, 2)},
				{'ID': 'mochi','place': 'MediaLab' ,'inTime':new Date(2023, 4, 20, 3)},
				{'ID': 'mochi','place': 'MediaLab' ,'inTime':new Date(2023, 4, 20, 4)},
		]
		if(this.todaysLog.length == 0)this.isEmpty = true;
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

		td{
			height: 40px;
			padding-right: 100px;
		}




</style>
