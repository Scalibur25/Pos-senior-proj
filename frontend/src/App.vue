<template>
  <div id="app">
    <nav class="sticky-top px-4">
      <div id="essist">ESSIST</div>
      <router-link to="/">Home</router-link>
      <span>|</span>
      <router-link to="/stock">Stock Management</router-link>
      <span>|</span>
      <router-link to="/store">Storefront</router-link>
    </nav>
    <router-view class="router-view" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  /* padding: 15px 30px; */
  height: 100px;
  text-align: center;
  /* position: relative; */
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: white;
  position: sticky;
  box-shadow: 0px 0px 15px #8997a6;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

#essist {
  font-size: 3em;
  font-weight: bold;
  padding: 0 30px 0 0;
}

nav span {
  padding: 0 10px;
}

.router-view {
  background-color: #f5f5f5;
}
</style>
