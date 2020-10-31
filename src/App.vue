<template>
      <div id="app">
      <Sidebar v-if="shouldShowSidebar"></Sidebar> 
      <router-view/>
      </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'; 

export default {
  computed:{
    shouldShowSidebar(){
        return this.$route.meta.Sidebar!==false;
    }
  },
  components: {
    Sidebar
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
