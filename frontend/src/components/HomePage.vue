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
  
 
  height: 100vh;
  width: 100vw;
  margin: 0;
}

.navbar {
  font-family: 'Roboto', sans-serif;
  background-color: hsl(251, 51%, 15%);
  opacity:90%;
  height: 12vh;
  width: 100vw;
  display: flex;
  justify-content: left;
  align-items: left;
  padding: 1rem;
}

.nav-item {
  font-family: 'Roboto', sans-serif;
  color: #952bbe; 
  font-weight: 800;
  font-size: 2.2rem;
  padding: 1rem 4rem;
  border-radius: 4px;
  text-shadow: 5px 5px 5px hsl(0, 0%, 0%);
}

.logo {
  width: auto; /* Imposta la larghezza del logo */
  height: 8vh; /* Mantieni le proporzioni dell'immagine */
  display: block; /* Rimuove lo spazio sotto l'immagine */
}

.input {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.nav-item1 {
  color: #9b59b6; /* Viola */
  font-family: 'Georgia', serif;
  font-size: 2.5rem;
  background-color: black;
  border-radius: 10px;
  margin-right: 2rem;
  padding: 0rem 1rem;
}

.home {
  text-align: center;
  padding: 0.5rem 0.2rem;
  
  text-shadow: 1px 1px 2px red, 0 0 0.5rem blue, 0 0 0.2em blue;
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
  padding: 15px;
  cursor: pointer;
  z-index: 10;
}

.prev-button {
  left: 550px;
}

.next-button {
  right: 550px;
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
  padding: 20px; /* Padding per il contenuto */
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
