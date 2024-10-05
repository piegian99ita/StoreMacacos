<template>
  <div class="app">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <router-link to="/home" class="nav-item1">
        <div class="input">
          <img src='../assets/logo-macacos.jpg' alt="Logo" class="logo">
          <p class="home">HOME</p>
        </div>
      </router-link>
      <router-link to="/tshirt" class="nav-item">T-SHIRT</router-link>
      <router-link to="/felpe" class="nav-item">FELPE</router-link>
      <router-link to="/ordini" class="nav-item">ORDINI</router-link>
    </nav>

    <!-- Main Content -->
    <div class="content">
    <div class="background-container">

      <div class="carousel-container">
        <div class="carousel">
          <transition name="fade">
            <img :src="currentImage" :key="currentIndex" class="carousel-image" />
          </transition>
        </div>
        <button @click="prevImage" class="carousel-button prev-button">&lt;</button>
        <button @click="nextImage" class="carousel-button next-button">&gt;</button>
      </div>

      <router-view />
    </div>
    </div>
  </div>
</template>

<script>
import image1 from '@/assets/felpa.jpg';
import image2 from '@/assets/tshirt.jpg';
import image3 from '@/assets/divisa.jpg';

export default {
  data() {
    return {
      images: [image1, image2, image3],
      currentIndex: 0,
      interval: null,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    }
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    startAutoSlide() {
      this.interval = setInterval(() => {
        this.nextImage();
      }, 15000);
    },
    stopAutoSlide() {
      clearInterval(this.interval);
    }
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    this.stopAutoSlide();
  }
};
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  font-size: 16px;
 
  height: 100vh;
  width: 100vw;
  margin: 0;
}

.navbar {
  font-family: 'Roboto', sans-serif;
  background:radial-gradient(hsl(251, 57%, 22%),hsl(250, 51%, 11%)) ;
  opacity:98%;
  height: 12vh;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
  padding: 1vw;
  z-index:1000;
  position:sticky;
  top:0;
  box-shadow: 0 2vw 5vw rgb(0, 0, 0);
}


.nav-item {
  font-family: 'Roboto', sans-serif;
  color: #952bbe; 
  font-weight: 800;
  resize:none;
  font-size: 2vw;
  padding:1.2vh 4vw;
  border-radius: 1vw;
  text-shadow: 0.2vw 0.2vw 0.2vw hsl(0, 0%, 0%);
}


.logo {
  width: 100%; /* Imposta la larghezza del logo */
  height: 7.8vh; /* Mantieni le proporzioni dell'immagine */
  padding-top: 0.5vh;
  display: block; /* Rimuove lo spazio sotto l'immagine */
}

.home {
  text-align: center;
  padding: 1vh 0vw;
  font-weight: 550vw;
  color: rgb(196, 186, 186);
  text-shadow: 0.01vw 0.01vw 0.1vw rgb(255, 0, 0), 0 0 0.5vw rgb(25, 27, 146), 0 0 0.2vw blue;
}

.input {
  display: flex;
  justify-content: center;
  gap: 1vw;
}

.nav-item1 {
  color: #9b59b6; /* Viola */
  font-family: 'Georgia', serif;
  font-size: 2vw;
  background-color: black;
  border-radius: 1.5vh;
  margin-right: 2vw;
  padding: 0vh 1vw;
}



.carousel-container {
  position: relative;
  width: 100%;
  height:85vh;
  margin: 0 auto;
  overflow: hidden;
}

.carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  opacity:90%;
  object-fit: contain;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: grey;
  opacity:50%;
  color: white;
  border: none;
  padding: 1vw;
  cursor: pointer;
  z-index: 10;
}

.prev-button {
  left: 30vw;
}

.next-button {
  right: 30vw;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.background-container {
  position: relative;
  overflow: hidden; /* Assicura che lo pseudo-elemento non esca dai confini dell'elemento principale */
  color: white; /* Colore del testo */
  padding: 2.5vw; /* Padding per il contenuto */
}

.background-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/sfondo.jpg'); /* Percorso dell'immagine */
  background-size: cover; /* Adatta l'immagine per coprire l'intero elemento */
  background-position: center; /* Centra l'immagine */
  background-repeat: no-repeat; /* Impedisce la ripetizione dell'immagine */
  opacity: 0.5; /* Opacità dell'immagine di sfondo (50%) */
  z-index: -1; /* Assicura che lo pseudo-elemento stia dietro al contenuto */
}
</style>
