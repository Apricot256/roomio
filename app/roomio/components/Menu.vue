<template>
	<div>
		<header>
			<div>
        <div>
          <h1>
            <nuxt-link to="/">Nuxt Cafe</nuxt-link>
          </h1>
          <div>
            <!-- TODO: ハンバーガーメニュー実装 -->
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <nuxt-link to="/Register">Register</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/Users">Users</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/information">お知らせ</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
		</header>
	</div>
</template>

<script lang="ts">
    export default {
    	name: 'Menu',
    }
</script>

<style scoped>
    div{
        height: 500px;
        border: solid;
        border-color: white;
        color: white;
    }
</style>
