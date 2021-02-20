<template>
  <div class="image-div" :class="{'landscape-width': i.orientation == 'landscape'}">
    <img :src="i.img" alt="failed to load" class="image">
  </div>
</template>

<script>
export default {
  name: 'Image',
  props: {
    i: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.image {
  border: 5px solid $white;
  width: 100%;
  }
.image-div{
  width: 33.333%;
}
.landscape-width{
  width: 50% !important;
}
</style>
