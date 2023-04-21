<template>
  <div class="all">
    <!-- <Menu> -->
    <div class="">
      <TheTitle/>
    </div>
    <div>
      <p class="section-txt">Room Status</p>
      <List/>
    </div>
    <div>
      <p class="section-txt">Room Activity</p>
      <History />
    </div>
    <TheFooter />
  </div>
  
</template>

<script lang="ts">
import Vue from 'vue';
import TheFooter from '~/components/TheFooter.vue';
import TheTitle from '~/components/TheTitle.vue';
import History from '~/components/History.vue';
import List from '~/components/List.vue';
import Menu from '~/components/Menu.vue';


export default Vue.extend({
    name: "IndexPage",
    components: {
      TheTitle,
      TheFooter,
      History,
      List,
      Menu
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
  }

  body{
    background-color: #0D1118;
  }
</style>