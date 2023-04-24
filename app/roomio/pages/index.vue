<template>
  <div class="all">
    <div class="">
      <TheTitle/>
    </div>
    <div>
      <p class="section-txt">Room Status</p>
      <List/>
    </div>
    <div>
      <p class="section-txt">Timeline</p>
      <TimeLine :date="getTodayStr()" />
    </div>
    <div>
      <p class="section-txt">Room Activity</p>
      <History />
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
    margin-left: 10%;
    margin-right: 10%;
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

  .footer{
    margin-top: 30px;
    /* position: fixed;
    bottom: 0;
    left: 0;
    right: 0; */
  }

</style>