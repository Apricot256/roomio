<template>
    <div class="all">
        <h1>User List</h1>
        <table>
          <thead>
            <tr>
              <th>Student ID</th><th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users">
              <td>{{ user.id }}</td><td>{{ user.name }}</td>
            </tr>
          </tbody>
        </table>
        <div class="footer">
          <TheFooter />
        </div>
    </div>
</template>
  
<script lang="ts">
  import Vue from 'vue';
  import axios, { AxiosResponse, AxiosError } from "axios";
  import TheFooter from '~/components/TheFooter.vue';

  interface User_t {
		id: string;
		name: string;
  }
  
  export default Vue.extend({
      name: "users",
      data(){
        return{
            users: [] as Array<User_t>
        }
      },
      components: {
        TheFooter,
      },
			mounted() {
				axios.post('http://localhost:8080/api/userlist')
					.then((res: AxiosResponse<User_t[]>) => {
            // Sort by id and stores
						this.users = res.data.sort((a, b) => {return (a.id < b.id) ? -1 : 1; });
					}).catch((e: AxiosError<{ error: string }>) => {
						console.log(e.message);
					});
			}
  })
  </script>
  
  <style scoped>
    .all {
      margin-top: 80px;
      margin-left: 10%;
      margin-right: 10%;
      text-align: center;
      color: white;
      font-family: system-ui;
    }
  
    .form{
        margin-top: 120px;
        margin-bottom: 50px;
    }
  
    body{
      background-color: #0D1118;
    }

    table{
      margin:auto;
      color: white;
      border-collapse: collapse;
      margin-top: 100px;
    }

    th{
      border-bottom: 1px solid white;
    }

    td, th{
      height: 40px;
      padding-right: 50px;
      padding-left: 50px;
    }


  </style>