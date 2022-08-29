<template>
  <transition name="flashmessage">
    <base-flash-message :status="messageStatus" v-if="showMessage">
      <span>{{ messageText }}</span>
    </base-flash-message>
  </transition>
  <div class="wrapper">
    <side-bar name="Qatelier"></side-bar>
    <main>
      <base-control-bar>
        <template #left>
          <div class="left">
            <base-search></base-search>
            <!--
              <base-button @click="ascSort" text="A-Z">
              <ion-icon name="arrow-down-outline"></ion-icon>
            </base-button>
            <base-button @click="descSort" text="Z-A">
              <ion-icon name="arrow-up-outline"></ion-icon>
            </base-button>
              -->
          </div>
        </template>

        <base-button
          @click="redirectToAddProjectForm"
          text="add project"
          mode="success"
        >
          <ion-icon name="add-outline"></ion-icon>
        </base-button>
      </base-control-bar>

      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from "./components/Menu/SideBar.vue";
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    SideBar,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const messageStatus = computed(() => {
      return store.getters.messageStatus;
    });
    const messageText = computed(() => {
      return store.getters.messageText;
    });

    const showMessage = computed(() => {
      return store.getters.showMessage;
    });

    watch(showMessage,()=>{
      setTimeout(() => (store.dispatch('setShowMessage', false)), 1300)
    })

    onMounted(() => {
      store.dispatch("fetchProjects");
    });

    function redirectToAddProjectForm() {
      router.push("/addProject");
    }

    return {
      redirectToAddProjectForm,
      showMessage,
      messageStatus,
      messageText,
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: row wrap;
}

main {
  flex-wrap: wrap;
  flex: 2;
  max-height: 100vh;
  padding: 50px 80px;
}

.control-bar {
  margin-bottom: 20px;
}

.container {
  width: 100%;
  height: 800px;
  overflow-y: scroll;
}

.control-bar .left button {
  margin-left: 15px;
}

.left {
  display: flex;
}

.flashmessage-enter-from,
.flashmessage-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.flashmessage-enter-to,
.flashmessage-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.flashmessage-enter-active,
.flashmessage-leave-active {
  transition: all 0.1s ease;
}
</style>
