<script>
import {store} from '../store'
import axios from 'axios';

export default {
  data() {
    return {
      store,
    }
  },
  created() {

  },
  methods: {
    sendMessage() {
      const data = {
        th
      };

      axios.post(`${store.urlBack}/api/chat`).then(resp => {
        
      })
    }
  }
}
</script>

<template>
  <div id="chat" class="px-2 py-2">
    <header>
      <h6>DeliveBot</h6>
    </header>
    <main>
      <!-- <div v-for="message in mesPrint" class="d-flex message"
        :class="message.figure === 'user' ? 'justify-content-end' : ''">
        <div class="col">
          <p :class="message.figure === 'Chopper' ? 'received' : 'send'">{{ message.messages }}</p>
        </div>
      </div> -->
    </main>
    <footer>
      <!-- <div class="d-flex align-items-center gap-2 pt-4">
        <input class="flex-grow-1" type="text" placeholder="Chatta" v-model="mesUser">
        <i v-if="mesUser === ''" class="fa-regular fa-paper-plane"></i>
        <i v-else @click="startThread" class="fa-solid fa-paper-plane"></i>
      </div> -->
    </footer>
  </div>
</template>

<style lang="scss" scoped>
#chat {
  width: 250px;
  height: 350px;
  background-color: brown;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 10;

  header {
    height: 10%;
    background-color: blue;

  }

  main {
    height: 80%;
    background-color: blueviolet;
    overflow-y: scroll;

    .received {
      background-color: rgb(119, 203, 1);
      padding: 10px;
    }

    .send {
      background-color: rgb(240, 240, 240);
      padding: 10px;
    }
  }

  footer {
    height: 10%;
    background-color: chocolate;
  }
}
</style>