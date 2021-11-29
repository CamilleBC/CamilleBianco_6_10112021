<template>
  <div id="app">
    <div>
    <Nav/>
   <router-view/>
   </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  components : {
    Nav,
  }
}
</script>
