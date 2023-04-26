<template>
    <div class="container">
  <div class="wrapper">
    <h1 v-if="indivisual"> {{date?.replaceAll('-', '/')}} </h1>
    <ul class="sessions">
			<li v-for="activity in activities">
				<div class="time">{{ activity.timeStr }}</div>
				<p v-if="activity.isEnter" class="enter">{{`${activity.name} entered into ${activity.place}. 🚪🚶` }}</p>
				<p v-else class="exit">{{`${activity.name} exited from ${activity.place}. 🚶🚪` }}</p>
			</li>
    </ul>
  </div>
</div> 
</template>

<script lang="ts">

	import axios, { AxiosResponse, AxiosError } from "axios";

	interface act_t {
		name: string;
		place: string;
		timeStr: string;
		isEnter: boolean;
	}

	interface res_t {
		name: string;
		place: string;
		inTime: string;
		outTime: string;
	}

	export default {
		name: 'TimeLine',
		data(){
			return{
				activities: [] as act_t[]
			}
		},
		props:{
			date: String,
			indivisual: Boolean
		},
		async mounted(){

			// @ts-ignore
			const localDate = this.date;
			// @ts-ignore
			const indivisual = this.indivisual

			const getTimeStr = (date: string): string => {
				return new Date(date).toLocaleTimeString('ja-JP');
			};

			async function getHistoryData(): Promise<res_t[]> {
				const response = await axios.post(((indivisual)?'../':'')+'api/activity', {date:localDate});
				return response.data;
			}

			const data: res_t[] = await getHistoryData();

			data.forEach(elem => {
				// @ts-ignore
				this.activities.push(<act_t>{name:elem.name, place:elem.place, timeStr:getTimeStr(elem.inTime), isEnter:true});
				if(elem.outTime != null){
					// @ts-ignore
					this.activities.push(<act_t>{name:elem.name, place:elem.place, timeStr:getTimeStr(elem.outTime), isEnter:false});
				}
			});
			// @ts-ignore
			this.activities.sort((a:act_t, b:act_t) => {return (a.timeStr < b.timeStr) ? -1 : 1; });
			}
	}
	
</script>


<style>

ul, li{
  list-style: none;
  padding: 0;
}

.container{
	border: solid;
	border-color: gray;
	border-radius: 5px;
	padding: 6px;
	overflow-y: hidden;
	display: inline-block;
}
.wrapper{
  padding: 2rem;
  border-radius: 15px;
}
h1{
  font-size: 1.1rem;
  font-family: sans-serif;
	color: white;
}
.sessions{
  margin-top: 2rem;
  border-radius: 12px;
  position: relative;
	list-style:  none;
}
li{
  padding-bottom: 1.5rem;
  border-left: 1px solid gray;
  position: relative;
  padding-left: 20px;
  margin-left: 10px;
}
.enter:before{
	content:  "";
	width:  16px;
	height:  16px;
	display:  inline-block;
	border-radius:  50%;
	position:  relative;
	top: -1px;
	left: -28px;
	background-color: #5CC7F9;
}
.exit::before{
	content:  "";
	width:  16px;
	height:  16px;
	display:  inline-block;
	border-radius:  50%;
	position:  relative;
	top: -1px;
	left: -28px;
	background-color: #FC3C30;
}
.time{
  color: pink;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}
p{
  white-space: nowrap;
  color: white;
  font-family: sans-serif;
  line-height: 1.5;
  margin-top:0.4rem;
}

@media screen and (max-width:560px) {
	.container{
		border: none;
		padding: 0px;
	}

	.wrapper{
		padding: 0px;
	}

	p{
		font-size: 0.8rem;
	}

	.time{
		font-size: 0.9rem;
	}

	li{
		padding-bottom: 10px;
	}

	.enter:before, .exit::before {
		height: 8px;
		width: 8px;
		left: -24px;
	}
}

</style>