<!-- Please remove this file from your project -->
<template>
  <div>
     <div class="flex">
      <img src="../static/SuwaGeeks.png" alt="Logo" class="logo">
      <div>
        <p class="title-text">roomio</p><br>
        <p class="subtitle-text">powerd by SuwaGeeks</p>
      </div>
    </div>
  </div> 
</template>

  
<script>
    export default {
        name: 'TheTitle'
    }
</script>

<style scoped>

    .flex{
      display: flex;
      justify-content: center;
    }

    .flex .logo{
      height: 9em;
      width: 9em;
      margin: 0;
      padding: 0;
      /* overflow: hidden; */
      position: relative;
    }

    .flex .title-text{
      margin: 0 0 0 20px;
      vertical-align: middle;
      display: inline-block;
      font-size: 100px;
      font-family: System-ui;
      color: white;
    }

    .subtitle-text{
      margin-top: 0px;
      color: white;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .logo, .title-text, .subtitle-text{
      filter: drop-shadow(0em 0em 53px #00ccff);
    }
</style>