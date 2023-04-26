<!-- Please remove this file from your project -->
<template>
  <div>
     <div class="flex">
      <div class="logo-wrap">
        <img src="../static/SuwaGeeks.png" alt="Logo" class="logo">
      </div>
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
      justify-content: flex-end;
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
      margin: 0 0 0 0.4rem;
      vertical-align: middle;
      display: inline-block;
      font-size: 6rem;
      font-family: System-ui;
      color: white;
    }

    .logo-wrap{
      display: flex;
      align-items: center;
    }

    .subtitle-text{
      margin-top: 0px;
      color: white;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .logo, .title-text, .subtitle-text{
      filter: drop-shadow(0em 0em 3.4rem #00ccff);
    }

@media screen and (max-width:560px) {
  .flex .logo{
    height: 6rem;
    width: 6rem;
  }

  .flex .title-text{
    font-size: 4rem;
  }

  .subtitle-text{
    font-size: 0.8rem;
  }

  .logo, .title-text, .subtitle-text{
    filter: drop-shadow(0em 0em 2.4rem #00ccff);
  }
    
} 

</style>