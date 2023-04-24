<template>
	<div class="all">
		<TimeLine :date="$route.params.date"></TimeLine>
	</div>
</template>

<script>

import TimeLine from '~/components/TimeLine.vue';

export default {
    name: 'activity',
    components: {
        TimeLine
    }
    
}

</script>

<style scoped>
	.all {
    margin-top: 80px;
    margin-left: 10%;
    margin-right: 10%;
		background-color: #0D1118;
  }
	
</style>