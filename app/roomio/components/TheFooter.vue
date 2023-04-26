<!-- Please remove this file from your project -->
<template>
    <div class="hr">
      <div class="contents">
        <div><NuxtLink to="/">Home</NuxtLink></div>
				<div><NuxtLink to="/register">Register</NuxtLink></div>
      	<div><NuxtLink to="/users">User List</NuxtLink></div>
				<div><a href="https://suwageeks.org">About Us</a></div>
			</div>
      <p class="footer-text">&copy; SuwaGeeks 2022</p>
    </div>
</template>


<script>
    export default {
        name: 'TheFooter'
    }
</script>

<style scoped>

    p{
        font-family: System-ui;
        text-align: center;
        color: gray;
    }

    .hr {
        border-top: solid;
        color: gray;
        margin-top: 20px;
    }

		.contents{
			display: flex;
			justify-content: center;
		}

		.contents > div{
			margin-right: 0.8rem;
			margin-left: 0.8rem;
			margin-bottom: 0px;
			margin-top: 0.6rem;
			font-family: System-ui;
			text-align: center;
			color: gray;
		}

		a{
			text-decoration: none;
			color: gray;
		}

	@media screen and (max-width:560px) {
		.contents > div{
			font-size: 0.8rem;
		}

		.footer-text{
			font-size: 0.8rem;
		}
  }

</style>