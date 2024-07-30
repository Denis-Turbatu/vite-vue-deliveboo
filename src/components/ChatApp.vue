<script>
import { Logger } from 'sass';
import { store } from '../store'
import axios from 'axios';

export default {
  data() {
    return {
      store,
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2"
      },
      haveThreadId: false,
      threadId: '',
      mesUser: '',
      mesUserCopy: '',
      mesReturn: '',
      runId: '',
      isCompleted: false,
      isLoading: false,
      openAiUrl: 'https://api.openai.com/v1/threads',
      mesPrint: [
        {
          figure: 'DeliveBot',
          messages: "Ciao! 😃 Benvenuto/a nel nostro servizio di delivery! Sono qui per aiutarti a trovare il miglior ristorante o piatto secondo i tuoi gusti. 🍕🍔🍣 Dimmi un po', cosa ti piacerebbe mangiare oggi? 🔍 Oppure, se hai già un ristorante in mente e vuoi sapere i piatti disponibili, fammi sapere e ti darò una lista! 📋 Fammi sapere! 😊"
        }
      ]
    }
  },
  created() {

  },
  methods: {
    async getThreadId() {
      this.isLoading = true;
      const data = {};

      const headers = this.headers;
      headers["Authorization"] = "Bearer " + this.store.api_key;

      try {
        const response = await axios.post(`${this.openAiUrl}`, data, {
          headers
        });

        console.log('getThreadID', response)
        this.threadId = response.data.id;
        this.haveThread = true;
        this.isLoading = false;
      }
      catch (error) {
        console.error('Errore in getThreadId()', error);
      }
    },
    async postMessages() {
      this.isLoading = true
      const data = {
        "role": "user",
        "content": this.mesUserCopy
      };

      const headers = this.headers;
      headers["Authorization"] = "Bearer " + this.store.api_key;

      try {
        const response = await axios.post(`${this.openAiUrl}/${this.threadId}/messages`, data, {
          headers
        });
        console.log('postMessages', response)
        this.isLoading = false;
      }
      catch (error) {
        console.error('Errore in postMessages()', error);
      }
    },
    async runThread() {
      this.isLoading = true;
      const data = {
        "assistant_id": "asst_P9RMitIOIlDIclGkcF3YDVrX",
        "additional_instructions": null,
        "tool_choice": null
      };

      const headers = this.headers;
      headers["Authorization"] = "Bearer " + this.store.api_key;

      try {
        const response = await axios.post(`${this.openAiUrl}/${this.threadId}/runs`, data, {
          headers
        });
        console.log('runThread', response)
        this.runId = response.data.id;
        this.isLoading = false;

        await this.pollThreadStatus();
      }
      catch (error) {
        console.error('Errore in runsThread()', error);
      }
    },
    async pollThreadStatus() {
      this.isLoading = true;

      const headers = this.headers;
      headers["Authorization"] = "Bearer " + this.store.api_key;

      const checkStatus = async () => {
        const response = await axios.get(`${this.openAiUrl}/${this.threadId}/runs/${this.runId}`, {
          headers
        });
        console.log('pollThreadStatus', response);

        // Check if the status indicates that the run is complete
        if (response.data.status === 'completed') {
          this.isLoading = false;
          return this.isCompleted = true;
        } else {
          return this.isCompleted = false;
        }
      };

      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

      while (!this.isCompleted) {
        this.isCompleted = await checkStatus();
        if (!this.isCompleted) {
          await delay(1000); // Wait for 1 seconds before the next status check
        }
      }
    },
    async getMessages() {
      this.isLoading = true;

      const headers = this.headers;
      headers["Authorization"] = "Bearer " + this.store.api_key;

      try {
        const response = await axios.get(`${this.openAiUrl}/${this.threadId}/messages`, {
          headers
        });
        console.log('getMessages', response)
        const newMesReceie = {
          figure: 'DeliveBot',
          messages: response.data.data[0].content[0].text.value,
        }

        this.mesPrint.push(newMesReceie)
        this.isCompleted = false;
        this.isLoading = false;

        // Scroll to the bottom of the chat
        this.scrollToBottom();

      } catch (error) {
        console.error('Errore in getMessages()', error);
      }
    },
    async starWithoutThreadId() {
      await this.postMessages();
      await this.runThread();
      await this.getMessages();
    },
    async startThread() {
      this.getUserMessage();

      if (!this.haveThreadId) {
        try {
          await this.getThreadId();
          this.starWithoutThreadId()
          this.haveThreadId = true;

        } catch (error) {
          console.error('Errore in startThread()', error);
        }
      } else {
        try {
          this.starWithoutThreadId()
        } catch (error) {
          console.error('Errore in startThread()', error);
        }
      }

    },
    getUserMessage() {
      this.mesUserCopy = this.mesUser;
      this.mesUser = '';
      const newMesSend = {
        figure: 'user',
        messages: this.mesUserCopy
      }

      this.mesPrint.push(newMesSend);

      // Scroll to the bottom of the chat
      this.scrollToBottom();

    },
    togglechatIsOpen() {
      this.store.chatIsOpen = !this.store.chatIsOpen;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$el.querySelector('main');
        chatContainer.scroll({
          top: chatContainer.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  }
}
</script>

<template>
  <div @click="togglechatIsOpen" v-if="!store.chatIsOpen" id="chat-icon">
    <!-- <img :src="getImgPath(chat.png)" alt=""> -->
    <i class="fa-solid fa-comment"></i>
  </div>

  <div v-else id="chat" class="px-3 py-3">
    <header class="d-flex justify-content-between align-items-center px-2">
      <h6>DeliveBot</h6>
      <i @click="togglechatIsOpen" class="ms_close-icon fa-regular fa-circle-xmark"></i>
    </header>
    <main>
      <div v-for="message in mesPrint" class="row message mb-2"
        :class="message.figure === 'user' ? 'justify-content-end ms-2' : 'me-2'">
        <div class="col">
          <p :class="message.figure === 'DeliveBot' ? 'received' : 'send'">
            {{ message.messages }}
            <span>{{ message.figure }}</span>
          </p>
        </div>
      </div>
      <div v-if="isLoading" id="fake-writing" class="">
        <div class="ball ball-1">
        </div>
        <div class="ball ball-2">
        </div>
        <div class="ball ball-3">
        </div>
        <div class="ball ball-4">
        </div>
      </div>
    </main>
    <footer class="d-flex align-items-center gap-2">
      <input @keyup.enter="startThread" class="ms_input-chat flex-grow-1" type="text" placeholder="Chatta"
        v-model="mesUser">
      <!-- <i v-if="mesUser !== ''" class="fa-regular fa-paper-plane"></i> -->
      <i @click="startThread()" class="fa-solid fa-paper-plane"></i>
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
  width: 350px;
  height: 450px;
  border-radius: 20px;
  background-color: rgb(240, 240, 240);
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 10;
  overflow: hidden;

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
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* edge */
  }

  main::-webkit-scrollbar {
    display: none; /* chrome */
  }

  p {
    margin-bottom: 0;
    position: relative;

    span {
      position: absolute;
      right: 5px;
      bottom: 5px;
      color: grey;
    }
  }

  #fake-writing {
    width: 100px;
    height: 40px;
    padding: 5px;
    border-radius: 5px;
    background: #ffc107;
  }

  .ball {
    float: left;
    margin-top: 20px;
    margin-left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: black;
  }

  .ball-1 {
    animation: ball1 0.6s ease-in-out infinite;
    animation-delay: 0.2s;
  }

  .ball-2 {
    animation: ball1 0.6s ease-in-out infinite;
    animation-delay: 0.3s;
  }

  .ball-3 {
    animation: ball1 0.6s ease-in-out infinite;
    animation-delay: 0.4s;
  }

  .ball-4 {
    animation: ball1 0.6s ease-in-out infinite;
    animation-delay: 0.5s;
  }

  @keyframes ball1 {
    0% {
      transform: translateY(0px);
    }

    100% {
      transform: translateY(-10px);
    }
  }

  .received {
    background-color: #ffc107;
    padding: 10px;
    border-radius: 10px;
    padding-bottom: 30px;
  }

  .send {
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 10px;
    padding-bottom: 30px;
  }

  footer {
    height: 10%;
    background-color: white;
    padding: 5px 15px;
    border-radius: 20px;

    .ms_input-chat {
      border: none;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>