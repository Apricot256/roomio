<template>
    <div class="all">
      <div class="content">
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
      </div>
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
				axios.post('api/userlist')
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

      min-height: 100%;
      display: flex;
      flex-direction: column;
    }

    .content {
        flex: 1;
    }

    .footer {
        text-align: center;
    }

    html,body {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    h1{
      font-size: 2rem;
    }
  
    body{
      background-color: #0D1118;
    }

    table{
      margin:auto;
      color: white;
      border-collapse: collapse;
      margin-top: 80px;
      margin-bottom: 70px;
    }

    th{
      border-bottom: 1px solid white;
    }

    td, th{
      height: 40px;
      padding-right: 1rem;
      padding-left: 1rem;
      white-space:nowrap;
    }

    .footer{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }


  </style>