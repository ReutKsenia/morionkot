<template>
  <div class='v-main-page'>
    <banner/>
    <item-category/>
  </div>
</template>

<script>
import banner from './banner'
import itemCategory from './item-category'

  export default {
    name: "v-main-page",
    components: {
      banner,
      itemCategory
    },
    props: {},
    data() {
      return {}
    },
    computed: {}
  }
</script>

<style>
</style>