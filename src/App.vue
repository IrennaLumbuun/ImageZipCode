<template>
  <div id="app">
    <h1>Submit Form Data to API</h1>
    <PostComponent/>
  </div>
</template>

<script>
import PostComponent from './components/PostComponent'
export default {
  name: 'App',
  components: {
    PostComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
