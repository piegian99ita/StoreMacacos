<template>
  <div class="app">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-links">
        <router-link to="/home" class="nav-item1">
          <div class="input">
            <img src="../assets/logo.png" alt="Logo" class="logo">
            <p class="home">HOME</p>
          </div>
        </router-link>
        <router-link to="/tshirt" class="nav-item">T-SHIRT</router-link>
        <router-link to="/felpe" class="nav-item">FELPE</router-link>
        <router-link to="/ordini" class="nav-item">DIVISE</router-link>
        <router-link to="/ordini" class="nav-item">ORDINI</router-link>
        
      </div>

      <div class="navbar-right">
        <router-link to="/" class="log-out" @click="logout">LOGOUT</router-link>
      </div>
    </nav>


    <!-- Main Content -->
    <div class="content">
      <div class="background-container">
        <div class="container">
          <div class="left">
            <div class="column">
              <router-link to="/tshirt" class="magliette">
                <p class="maglietta-title">ORDINA UNA MAGLIETTA</p>
                <img src="../assets/t-shirt-nera.png"  class="maglietta">
              </router-link>
              <router-link to="/felpe" class="felpe">
                <p class="felpe-title">ORDINA UNA FELPA</p>
                <img src="../assets/felpa-viola.png"  class="maglietta">
              </router-link>
              <router-link to="/divise" class="divise">
                <p class="felpe-title">SCEGLI NUMERO E TAGLIA PER LA DIVISA </p>
                <img src="../assets/nuova-divisa.png"  class="maglietta">
              </router-link>
              
              <router-link to="/ordini" class="ordini">
                <p class="ordini-title">VISUALIZZA IL RIEPILOGO ORDINI</p>
                <img src="../assets/carrello.png"  class="maglietta">
              </router-link>
            </div>
          </div>
          <div class="right">
            <div class="carousel-container">
              <div class="carousel">
                <transition name="fade">
                  <img :src="currentImage" :key="currentIndex" class="carousel-image" />
                </transition>
              </div>
              
              
            </div>
          </div>
        </div>
        

        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import image1 from '../assets/home-felpe.png';
import image2 from '../assets/home-magliette.png';
import image3 from '../assets/divisa.png';
import image4 from '../assets/nuova-divisa.png';
import { nextTick } from 'vue';

export default {
  data() {
    return {
      images: [image1, image2, image3,image4],
      currentIndex: 0,
      interval: null,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    }
  },
  mounted() {
    // Verifica se l'utente è già loggato
    const username = localStorage.getItem('username');
    const m_price = localStorage.getItem('m_price');
    console.log(username);
    
    if (!username) { 
      console.log("not username")   
      
      nextTick(() => {
        this.$router.push('/');
      });
    }else{
      console.log("username yes")
      if(!m_price){
        console.log("no price")
        let macacos=["pietro-giannini","tommaso-passerini","giacomo-serati","nicola-trotter","giordani-luca","lorenzo-fedrizzi","andrea-pizzinini","alessandro-chiste","damiano-osello","eugenio-tani","umberto-tani","gabriele-padovani","fabio-tessari","giacomo-valla","axel-barbieri","luca-giannini","pietro-mirandola"];
        if(macacos.includes(username)){
          localStorage.setItem('m_price', "16.30"); 
          localStorage.setItem('f_price', "24.60"); 
        }else{
          localStorage.setItem('m_price', "16.50"); 
          localStorage.setItem('f_price', "25"); 
        }
      }
      console.log(this);
      this.startAutoSlide();
      console.log("errore dopo");
    }
    
  },
  methods: {
    logout(){
      localStorage.removeItem('username');
      localStorage.removeItem('m_price');
      localStorage.removeItem('f_price');
      this.$router.push('/');
    },
    nextImage() {
      this.stopAutoSlide();
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.startAutoSlide();
    },
    prevImage() {
      this.stopAutoSlide();
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.startAutoSlide();
    },
    startAutoSlide() {
      this.interval = setInterval(() => {
        this.nextImage();
      }, 5000);
    },
    stopAutoSlide() {
      clearInterval(this.interval);
    }
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
  display: table-row;
  grid-row: 20% 80%;
  height: 100vh;
  width: 100vw;
  margin: 0;
}
.navbar {
  font-family: 'Roboto', sans-serif;
  background: radial-gradient(hsl(251, 57%, 22%), hsl(250, 51%, 11%));
  opacity: 98%;
  height: 12vh;
  width: 100%;
  display: flex;
  justify-content: space-between; /* Modifica qui */
  align-items: center; /* Modifica qui */
  padding: 1vw;
  z-index: 1000;
  position: sticky;
  top: 0;
  box-shadow: 0 2vw 5vw rgb(0, 0, 0);
}
.content{
  height:auto;
  width: auto;
}

.nav-item {
  font-family: 'Roboto', sans-serif;
  color: #952bbe;
  font-weight: 800;
  resize: none;
  font-size: 2vw;
  padding: 1.2vh ;
  border-radius: 1vw;
  text-shadow: 0.2vw 0.2vw 0.2vw hsl(0, 0%, 0%);
}

.logo {
  width: 100%;
  height: 7.8vh;
  padding-top: 0.5vh;
  display: block;
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
  color: #9b59b6;
  font-family: 'Georgia', serif;
  font-size: 2vw;
  background-color: black;
  border-radius: 1.5vh;
  padding: 0vh 1vw;
  filter: drop-shadow(0.1px 0.1px 2px rgb(234, 149, 241));
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 4vw; /* Distanza tra i link */
}


.navbar-right {
  display: flex;
  align-items: center;
}

.log-out {
  font-family: 'Roboto', sans-serif;
  color:white;
  background: radial-gradient(rgb(255, 0, 0),rgb(95, 5, 5));
  font-weight: 800;
  resize: none;
  font-size: 1.5vw;
  padding: 1vh 1.5vw;
  border-radius: 3vw;
  text-shadow: 0.2vw 0.2vw 0.2vw hsl(0, 0%, 0%);
  margin-left: 2vw; /* Aggiunto margine per separare dal resto */
  border: 0.7vh solid black;
}


.container{
  display: grid;
  grid-template-columns: 38% 62%; /* Definisce due colonne */
  /* Opzionale: allinea gli elementi al centro verticalmente */
  align-items: center;
}

.left{
  gap:10%;
  align-items: center;
  justify-content: space-between; /* Modifica qui */

}
.right{
  margin-right:10%;
}

.column {
  display: flex;
  flex-direction: column; /* Dispone gli elementi in colonna */
  align-items: left;
  gap:2vw;
  justify-content: space-between; /* Modifica qui */
  margin-right: 10%;
  margin-left: 20%;
}
.felpe{
  display:flex;
  flex-direction: column;
  align-items: center;
  background:radial-gradient(#241858 50%, #130E2A 90%);
  border-radius: 5%;
  filter: drop-shadow(0.2px 0.2px 5px rgb(255, 255, 255));
  
  
} 
.magliette{
  display:flex;
  flex-direction: column;
  align-items: center;
  background:radial-gradient(#241858 50%, #130E2A 90%);
  border-radius: 5%;
  filter: drop-shadow(0.2px 0.2px 5px rgb(255, 255, 255));
  
} 
.ordini{
  display:flex;
  flex-direction: column;
  align-items: center;
  background:radial-gradient(#241858 50%, #130E2A 90%);
  border-radius: 5%;
  filter: drop-shadow(0.2px 0.2px 5px rgb(255, 255, 255));
  
}
.felpe-title{
  color: #952bbe;
  font-family: 'Roboto', sans-serif;
  font-size: 2vw;
  font-weight: 700;
  text-align: center;
  text-shadow: 0.1vw 0.1vw 0vw hsl(0, 0%, 0%);
  border-radius: 1.5vh;
  padding: 0vh 1vw;
  margin-top: 3%;
  letter-spacing: -2.5px;
}
.maglietta-title{
  color: #952bbe;
  font-family: 'Roboto', sans-serif;
  font-size: 2vw;
  font-weight: 700;
  text-align: center;
  text-shadow: 0.1vw 0.1vw 0vw hsl(0, 0%, 0%);
  border-radius: 1.5vh;
  padding: 0vh 1vw;
  margin-top: 3%;
  letter-spacing: -2.5px;
}
.ordini-title{
  color: #952bbe;
  font-family: 'Roboto', sans-serif;
  font-size: 2vw;
  font-weight: 700;
  text-align: center;
  text-shadow: 0.1vw 0.1vw 0vw hsl(0, 0%, 0%);
  border-radius: 1.5vh;
  padding: 0vh 1vw;
  margin-top: 3%;
  letter-spacing: -2.5px;
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
  filter: drop-shadow(0.2px 0.2px 5px white);
}





.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.maglietta { 
  filter: drop-shadow(0.2px 0.2px 5px rgb(255, 200, 200));
  height:18vh;
  width:auto;
  margin-top: 1%;
  margin-bottom: 5%;
  padding:0.5% 15%;
  background:radial-gradient( rgba(245, 140, 255, 0.82), rgba(102, 27, 27, 0.82));
  border-radius: 5%;
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

@media (max-width: 768px) {
  .app {
  font-family: Arial, sans-serif;
  font-size: 16px;
  overflow-x:hidden;
 
  height: 100vh;
  width: 100vw;
  margin: 0;
}

.navbar {
  font-family: 'Roboto', sans-serif;
  background:radial-gradient(hsl(251, 57%, 22%),hsl(250, 51%, 11%)) ;
  opacity:98%;
  height: 8vh;
  width: 100vw;
  display: flex;
  justify-content: left;
  align-items: left;
  padding: 1vw;
  z-index:1000;
  position:sticky;
  top:0;
  box-shadow: 0 2vw 5vw rgb(0, 0, 0);
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 2vh; /* Distanza tra i link */
}


.navbar-right {
  display: flex;
  align-items: center;
  
}

.log-out {
  font-family: 'Roboto', sans-serif;
  color:white;
  background: radial-gradient(rgb(255, 0, 0),rgb(95, 5, 5));
  font-weight: 800;
  resize: none;
  font-size: 1.7vw;
  padding: 0.8vh 1vw;
  border-radius: 2.5vw;
  text-shadow: 0.2vw 0.2vw 0.2vw hsl(0, 0%, 0%);
  margin-left: 7.5vw; /* Aggiunto margine per separare dal resto */
  border: 0.3vh solid black;
}


.nav-item {
  font-family: 'Roboto', sans-serif;
  color: #952bbe; 
  font-weight: 800;
  resize:none;
  font-size: 3.5vw;
  padding:0vh 0vw;
  border-radius: 1vw;
  text-shadow: 0.2vw 0.2vw 0.2vw hsl(0, 0%, 0%);
}
.nav-item-underline {
  font-family: 'Roboto', sans-serif;
  color: #952bbe; 
  font-weight: 800;
  resize:none;
  text-decoration: underline;
  font-size: 3.5vw;
  padding:0vh 0vw;
  border-radius: 1vw;
  text-shadow: 0.2vw 0.2vw 0.2vw hsl(0, 0%, 0%);
}


.logo {
  width: 100%; /* Imposta la larghezza del logo */
  height: 7vh; /* Mantieni le proporzioni dell'immagine */
  width: auto;
  padding-top: 1vh;
  display: block; /* Rimuove lo spazio sotto l'immagine */
}

.home {
  text-align: center;
  padding: 3vw 0vw;
  font-weight: 500vh;
  font-size: 2.5vh;
  color: rgb(196, 186, 186);
  text-shadow: 0.01vw 0.01vw 0.1vw rgb(255, 0, 0), 0 0 0.5vw rgb(25, 27, 146), 0 0 0.2vw blue;
}



.nav-item1 {
  color: #9b59b6; /* Viola */
  font-family: 'Georgia', serif;
  font-size: 1vw;
  background-color: black;
  border: #316104   0.1vw;
  border-radius: 2vh;
  filter: drop-shadow(0.1px 0.1px 2px rgb(234, 149, 241));
  padding: 0vh 0.5vh;
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





.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.background-container {
  position: relative;
  overflow: hidden; /* Mantieni se necessario */
  padding: 2.5vw;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  color: white; /* Assicurati di avere un colore per il testo */
}

.background-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/sfondo.jpg');
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  opacity: 0.3; /* Opacità applicata solo all'immagine di sfondo */
  z-index: -1; /* Assicura che l'immagine sia dietro il contenuto */
}


.right{
  display:none;
}
.content{
  height:auto;
  width: auto;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: left;
  

}
.left{
  margin-top: 3vh;
  margin-bottom: 0vh;
  margin-right: 2vh;
  align-items: center;
  
}
.column {
  display: flex;
  flex-direction: column; /* Dispone gli elementi in colonna */
  align-items: left;
  gap:2vh;
  
  
}

.felpe{
  display:flex;
  flex-direction: column;
  align-items: center;
  background:radial-gradient(#241858 50%, #130E2A 90%);
  border-radius: 5%;
  filter: drop-shadow(0.2px 0.2px 5px rgb(255, 255, 255));
  
  
} 
.magliette{
    display:flex;
  flex-direction: column;
  align-items: center;
  background:radial-gradient(#241858 50%, #130E2A 90%);
  border-radius: 5%;
  filter: drop-shadow(0.2px 0.2px 5px rgb(255, 255, 255));

} 
.ordini{
  display:flex;
  flex-direction: column;
  align-items: center;
  background:radial-gradient(#241858 50%, #130E2A 90%);
  border-radius: 5%;
  filter: drop-shadow(0.2px 0.2px 5px rgb(255, 255, 255));
}
.felpe-title{
  color: #952bbe;
  font-family: 'Roboto', sans-serif;
  font-size: 2.5vh;
  font-weight: 700;
  text-align: center;
  text-shadow: 0.1vw 0.1vw 0vw hsl(0, 0%, 0%);
  border-radius: 1.5vh;
  padding: 0vh 1vh;
  margin-top: 3%;
  letter-spacing: -0.2vh;
}
.maglietta-title{
  color: #952bbe;
  font-family: 'Roboto', sans-serif;
  font-size: 2.5vh;
  font-weight: 700;
  text-align: center;
  text-shadow: 0.1vw 0.1vw 0vw hsl(0, 0%, 0%);
  border-radius: 1.5vh;
  padding: 0vh 1vh;
  margin-top: 3%;
  letter-spacing: -0.2vh;
}
.ordini-title{
  color: #952bbe;
  font-family: 'Roboto', sans-serif;
  font-size: 2.5vh;
  font-weight: 700;
  text-align: center;
  text-shadow: 0.1vw 0.1vw 0vw hsl(0, 0%, 0%);
  border-radius: 1.5vh;
  padding: 0vh 1vh;
  margin-top: 3%;
  letter-spacing: -0.2vh;
}

.maglietta {
  filter: drop-shadow(0.2px 0.2px 5px rgb(255, 200, 200));
  height:12.5vh;
  width:auto;
  margin-top: 1%;
  margin-bottom: 5%;
  padding:1% 3%;
  background:radial-gradient( rgba(245, 140, 255, 0.82), rgba(102, 27, 27, 0.82));
  border-radius: 5%;
}
content{
  width: 100wv;
  height: 100%;
}
}


</style>
