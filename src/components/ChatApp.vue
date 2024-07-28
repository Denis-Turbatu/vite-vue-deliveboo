<script>
import { Logger } from 'sass';
import {store} from '../store'
import axios from 'axios';

export default {
  data() {
    return {
      store,
    }
  },
  created() {
    const newMessageReceive = {
      "figure": "DeliveBot",
      "message": "Ciao! 😃 Benvenuto/a nel nostro servizio di delivery! Sono qui per aiutarti a trovare il miglior ristorante o piatto secondo i tuoi gusti. 🍕🍔🍣 Dimmi un po', cosa ti piacerebbe mangiare oggi? 🔍 Oppure, se hai già un ristorante in mente e vuoi sapere i piatti disponibili, fammi sapere e ti darò una lista! 📋 Fammi sapere! 😊",
    }
    this.store.chat.push(newMessageReceive)
    // this.sendMessage();
  },
  methods: {
    sendMessage() {
      const messageSendcopy = this.store.mesUser;

      this.store.mesUser = '';

      const newMessageSend = {
        "figure": "user",
        "message": messageSendcopy
      };

      this.store.chat.push(newMessageSend);

      const data = {
        'message': messageSendcopy,
        'thread_id': this.store.thread_id
      };

      axios.post(`${store.urlBack}/api/chat`, data).then(resp => {
        console.log(resp);
        store.thread_id = resp.data.thread_id
        const newMessageReceive = {
          "figure": 'DeliveBot',
          "message": resp.data.message
        };
        this.store.chat.push(newMessageReceive)
      })
    },
    getImgPath(img) {
      return new URL(`../assets/img/${img}`, import.meta.url).href;
    },
    togglechatIsOpen() {
      this.store.chatIsOpen = !this.store.chatIsOpen;
    }
  }
}
</script>

<template>
  <div @click="togglechatIsOpen" v-if="!store.chatIsOpen" id="chat-icon">
    <!-- <img :src="getImgPath(chat.png)" alt=""> -->
    <i class="fa-solid fa-comment"></i>
  </div>

  <div v-else id="chat" class="px-2 py-2">
    <header class="d-flex justify-content-between align-items-center px-2">
      <h6>DeliveBot</h6>
      <i @click="togglechatIsOpen" class="ms_close-icon fa-regular fa-circle-xmark"></i>
    </header>
    <main>
      <div v-for="message in store.chat" class="d-flex"
        :class="message.figure === 'user' ? 'justify-content-end' : ''">
        <div class="py-2">
          <p :class="message.figure === 'DeliveBot' ? 'received' : 'send'">
            {{ message.message }}
            <span>{{ message.figure }}</span>
          </p>
        </div>
      </div>
    </main>
    <footer class="d-flex align-items-center gap-2">
        <input @keyup.enter="sendMessage" class="ms_input-chat flex-grow-1" type="text" placeholder="Chatta" v-model="store.mesUser">
        <i v-if="store.mesUser === ''" class="fa-regular fa-paper-plane"></i>
        <i v-else @click="sendMessage" class="fa-solid fa-paper-plane"></i>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
#chat-icon {
  font-size: 2rem;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 10;

}

#chat {
  width: 300px;
  height: 400px;
  border-radius: 20px;
  background-color: rgb(240, 240, 240);
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 10;

  header {
    height: 10%;

    .ms_close-icon {
      font-size: 1.5rem;
    }
  }

  main {
    height: 80%;
    overflow-y: scroll;
    padding-bottom: 10px;

    p {
      margin-bottom: 0;
      position: relative;

      span{
        position: absolute;
        right: 5px;
        bottom: 5px;
        color: grey;
      }
    }

    .received {
      background-color: rgb(196, 239, 135);
      padding: 10px;
      border-radius: 10px;
    }

    .send {
      background-color: rgb(255, 255, 255);
      padding: 10px;
      border-radius: 10px;
    }
  }

  footer {
    height: 10%;
    background-color: white;
    padding: 5px 15px;
    border-radius: 20px;

    .ms_input-chat {
      border: none;

      &:focus{
        outline: none;
      }
    }
  }
}
</style>