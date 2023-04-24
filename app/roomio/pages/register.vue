<template>
    <div class="all">
        <h1>Register</h1>
        <table class="form">
          <tbody>
            <tr>
                <td>Student ID</td><td><input v-model="id" type="text" :placeholder="id_p"></td>
            </tr>
            <tr>
                <td>Name</td><td><input v-model="name" type="text" :placeholder="name_p"></td>
            </tr>
          </tbody>
        </table>
        <a @click="cancel" class="cancel_btn">Cancel</a>
        <a @click="register" class="register_btn">Register</a>
        <div class="footer">
          <TheFooter />
        </div>
    </div>
    
</template>
  
  <script lang="ts">
  import Vue from 'vue';
  import TheFooter from '~/components/TheFooter.vue';
  import axios, { AxiosResponse, AxiosError } from "axios";
  
  export default Vue.extend({
      name: "Register",
      data(){
        return{
          id: '',
          id_p: '',
          name: '',
          name_p: ''
        }
      },
      components: {
        TheFooter,
      },
      methods: {
        isStringEmpty(str: string):boolean {
          const trimed:string = str.trim();
          if (!(trimed ?? true) || (trimed == '')) {
            return true;
          } else {
            return false;
          }
        },
        cancel(){
          this.$router.push('/');
        },
        register(){
          console.log(`ID:${this.id}`);
          console.log(`Name:${this.name}`);
          const isIDEmpty:boolean = this.isStringEmpty(this.id);
          const isNameEmpty:boolean = this.isStringEmpty(this.name);

          if(isIDEmpty)this.id_p = 'Invalid ID!';
          if(isNameEmpty)this.name_p = 'Invalid name!';

          if(!isIDEmpty && !isNameEmpty){
            axios.post('http://localhost:8080/api/register', {
                id: this.id,
                name: this.name
            }).then((res: AxiosResponse<string>) => {
                console.log(res.data)
              }).catch((e: AxiosError<{ error: string }>) => {
                console.log(e.message);
              });
            this.$router.push('/');
          }
        }
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
    }

    ::placeholder {
      color: red;
    }

    a{
      width: 160px;
      font-size: 16px;
      cursor: pointer;
      margin: 20px;
      padding: 10px;
      height: 55px;
      text-align:center;
      background-size: 300% 100%;
      text-decoration: none;
      color: white;
      border: solid;
      border-color: gray;
      border-radius: 5px;
    }

    .cancel_btn{
      background-color: transparent;
    }

    .register_btn{
      background-color: green;
    }

    .footer{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }

  </style>