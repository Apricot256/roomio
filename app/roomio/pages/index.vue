<template>
  <div class="all">

    <div class="">
      <TheTitle/>
    </div>

    <div class="main">
        <div class="content">
          <div class="flex-content">
            <p class="section-txt">Room Status</p>
            <List/>
          </div>
          <div>
            <p class="section-txt">Room Activity</p>
            <div class="history">
              <History />
            </div>
          </div>
        </div>
        <div>
            <p class="section-txt">Timeline</p>
            <TimeLine :date="getTodayStr()" />
        </div>
      </div>
    <div class="footer">
      <TheFooter />
    </div>

  </div>
  
</template>

<script lang="ts">
import Vue from 'vue';
import TheFooter from '~/components/TheFooter.vue';
import TheTitle from '~/components/TheTitle.vue';
import History from '~/components/History.vue';
import List from '~/components/List.vue';
import TimeLine from '~/components/TimeLine.vue';


export default Vue.extend({
    name: "IndexPage",
    components: {
      TheTitle,
      TheFooter,
      TimeLine,
      History,
      List,
    },
    methods:{
      getTodayStr: (): string => {
        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      }
    }
})
</script>

<style>
  .all {
    margin-top: 80px;
    padding-left: 10%;
    padding-right: 10%;
  }

  .section-txt{
    color: white;
    font-size: 40px;
    font-family: System-ui;
    color: white;
    margin-top: 20px;
    margin-bottom: 0px;
  }

  body{
    background-color: #0D1118;
  }

  .history{
    margin-right: 30px;
  }

  @media screen and (min-width:1000px) {
    .main {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
    }

    .content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    
  } 


  .footer{
    margin-top: 30px;
    /* position: fixed;
    bottom: 0;
    left: 0;
    right: 0; */
  }

</style>