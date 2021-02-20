<template>
  <!-- <header>
    <div class="header bg-dark"></div>
  </header> -->
  <main>
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
        <component :is="Component" v-if="appState.account" />
      </transition>
    </router-view>
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade"
         id="exampleModalCenter"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Modal title
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="col-12 d-flex justify-content-center">
              <div class="row">
                <form @submit.prevent="createImage">
                  <img class="uploaded-img" style="" :src="state.newImage.img" alt="">
                  <input
                    class="mb-2"
                    type="file"
                    @change="handleImage"
                    accept="image/*"
                  />
                  <input
                    class="mb-2"
                    type="text"
                    placeholder="Image title..."
                    v-model="state.newImage.title"
                  />
                  <button class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="navbar bg-dark">
      <div class="ml-5">
        <button type="button" class="btn btn-outline-light" data-toggle="modal" data-target="#exampleModalCenter">
          +
        </button>
      </div>
      <div class="bg-dark text-light text-center">
        Made with 💖
      </div>
      <span class="mr-5">
        <button
          class="btn btn-outline-primary text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded avatar"
            />
          </div>
          <div
            class="dropdown-menu p-0 list-group"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >

            <span class=" list-group-item list-group-item-action">{{ user.name }}</span>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </footer>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from './AppState'
import { AuthService } from './services/AuthService'
import { imagesService } from './services/ImagesService'
import { logger } from './utils/Logger'

export default {
  name: 'App',
  setup() {
    const state = reactive({
      dropOpen: true,
      newImage: {}

    })
    return {
      appState: computed(() => AppState),
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      },
      handleImage(e) {
        const selectedImage = e.target.files[0]
        this.createBase64Image(selectedImage)
      },
      createBase64Image(fileObject) {
        const reader = new FileReader()
        reader.onload = (e) => {
          state.newImage.img = e.target.result
        }
        reader.readAsDataURL(fileObject)
      },
      async createImage() {
        try {
          console.log(state.newImage)
          const i = new Image()
          i.src = state.newImage.img
          let orientation = ''
          if ((i.width / i.height).toFixed(1) > 1) {
            orientation = 'landscape'
          } else {
            orientation = 'portrait'
          }
          await imagesService.create(state.newImage, orientation)
        } catch (error) {
          logger.error(error)
        }
      }

    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.dropdown-menu {
  user-select: none;
  display: block;
  transition: all 0.15s linear;
  transform: translateY(-150px) translateX(-120px) scale(1);
}
.dropdown-menu.show {
  transform: translateY(-80px) translateX(-80px) scale(0) !important;
  // display: none;
}
.dropdown-toggle{
  transform: rotate(180deg);
  color: $white;
}
.avatar {
  transform: rotate(180deg);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
.navbar {
  height: 60px;
}
.header {
  height: 40px;
}
.uploaded-img{
        height: 200px;
        width: 200px;
        }
</style>
