<template>
  <div class="container-fluid bg d-flex align-items-center">
    <div class="row w-100 h-75 justify-content-center align-items-center">
      <div class="col-6 d-flex justify-content-end align-items-center">
        <div class="row h-100 mr-2 img-row justify-content-around align-items-center">
          <router-link :to="{name: 'Home', params: {page: Number(route.params.page) -1}}">
            <img class="page-turn-left" src="../assets/img/turn.png" alt="">
          </router-link>
          <Image v-for="i in state.rightPage"
                 :key="i.id"
                 :i="i"
          />
        </div>
      </div>
      <div class="col-6 d-flex justify-content-start align-items-center">
        <div class="row h-100 ml-2 img-row  justify-content-around align-items-center">
          <router-link :to="{name: 'Home', params: {page: Number(route.params.page) +1}}">
            <img class="page-turn-right" src="../assets/img/turn.png" alt="">
          </router-link>
          <Image v-for="i in state.leftPage"
                 :key="i.id"
                 :i="i"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { imagesService } from '../services/ImagesService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  name: 'Home',

  setup() {
    const state = reactive({
      rightPage: computed(() => AppState.rightPage),
      leftPage: computed(() => AppState.leftPage),
      newImage: {}

    })
    onMounted(async() => {
      imagesService.get(useRoute().params.page)
    })
    return {
      state,
      route: useRoute()

    }
  }
}
</script>

<style scoped lang="scss">
        .home{
        text-align: center;
        user-select: none;
        }

        .bg {
          background-image: url('../assets/img/album.jpg');
          background-repeat:no-repeat ;
          background-position: center;
          background-size: cover;
        }
        .img-row {
          width: 70%;
        }
  .page-turn-left {
  transform: rotate(180deg);
  width: 24px;
  height: 24px;
  position: absolute;
  left: 30%;
  top: -50px;
  }
   .page-turn-right {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 30%;
  top: -50px;
   }
</style>
