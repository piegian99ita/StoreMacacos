<template>
  <div class="app2">
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
    
    <div class="content">
      <div class="background-container"> 
        <p class="title">ORDINI EFFETTUATI</p>
        <div class="list-container">
          <!-- Lista T-shirt -->
          <div class="list">
            <h2 class="form-title">T-shirt:</h2>
            <div class="subtitle-container">
              <h3 class="form-subtitle">TAGLIA</h3>
              <h3 class="form-subtitle">COLORE</h3>
            </div>
            
            <div v-for="(tshirt, index) in tshirts" :key="tshirt.id" class="list-item">
              <div class="subtitle-container2">
                <h3 class="form-subtitle2">{{ tshirt.taglia }}</h3>
                <h3 class="form-subtitle3">{{ tshirt.colore }}</h3>
                <button @click="deleteTshirt(index)" class="submit-button">ELIMINA</button>
              </div>              
            </div>
          </div>

          <!-- Lista Felpe -->
          <div class="list">
            <h2 class="form-title">Felpe:</h2>
            <div class="subtitle-container">
              <h3 class="form-subtitle">TAGLIA</h3>
              <h3 class="form-subtitle">COLORE</h3>
            </div>
            
            <div v-for="(felpa, index) in felpe" :key="felpa.id" class="list-item">
              <div class="subtitle-container2">
                <h3 class="form-subtitle2">{{ felpa.taglia }}</h3>
                <h3 class="form-subtitle3">{{ felpa.colore }}</h3>
                <button @click="deleteFelpa(index)" class="submit-button2">ELIMINA</button>
              </div>  
            </div>
          </div>
        </div>
      <div>
        <p class="title2">TOTALE: {{ this.totale }} €</p>
      </div>  
      
      </div>
      
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tshirts: [],  // Array per le t-shirt
      felpe: [],     // Array per le felpe
      totale: {type:Number}
    }
  },
  mounted() {
    this.fetchTshirts();
    this.fetchFelpe();
    this.fetchTotale();
  },
  methods: {
    // Funzione per ottenere le t-shirt dall'API
    fetchTshirts() {
      const username = localStorage.getItem('username'); 
      const encodedUsername = encodeURIComponent(username);
      fetch('http://localhost:3050/api/utente/'+encodedUsername+'/ordini/tshirt')
        .then(response => response.json())
        .then(data => {
          this.tshirts = data;
        })
        .catch(error => {
          console.error("Errore nel recuperare le t-shirt:", error);
        });
    },

    // Funzione per ottenere le felpe dall'API
    fetchFelpe() {
      const username = localStorage.getItem('username'); 
      const encodedUsername = encodeURIComponent(username);
      fetch('http://localhost:3050/api/utente/'+encodedUsername+'/ordini/felpa')
        .then(response => response.json())
        .then(data => {
          this.felpe = data;
        })
        .catch(error => {
          console.error("Errore nel recuperare le felpe:", error);
        });
    },

    fetchTotale() {
      const username = localStorage.getItem('username'); 
      const encodedUsername = encodeURIComponent(username);
      fetch('http://localhost:3050/api/utente/'+encodedUsername+'/totale')
        .then(response => response.json())
        .then(data => {
          this.totale = data;
        })
        .catch(error => {
          console.error("Errore nel recuperare le felpe:", error);
        });
    },
    
    // Funzione per eliminare una t-shirt
    deleteTshirt(index) {
      const tshirtToDelete = this.tshirts[index];
      const username = localStorage.getItem('username'); 
      const encodedUsername = encodeURIComponent(username);
      fetch('http://localhost:3050/api/ordine/'+encodedUsername+'/tshirt', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          taglia: tshirtToDelete.taglia,
          colore: tshirtToDelete.colore
        })
      })
      .then(response => {
        if (response.ok) {
          this.tshirts.splice(index, 1);
          this.fetchTotale(); // Rimuove l'elemento dalla lista
        } else {
          console.error("Errore nell'eliminare la t-shirt.");
        }
      })
      .catch(error => {
        console.error("Errore nell'eliminare la t-shirt:", error);
      });
    },

    // Funzione per eliminare una felpa
    deleteFelpa(index) {
      const felpaToDelete = this.felpe[index];
      const username = localStorage.getItem('username'); 
      const encodedUsername = encodeURIComponent(username);
      fetch('http://localhost:3050/api/ordine/'+encodedUsername+'/felpa', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          taglia: felpaToDelete.taglia,
          colore: felpaToDelete.colore

         })
      })
      .then(response => {
        if (response.ok) {
          this.felpe.splice(index, 1); // Rimuove l'elemento dalla lista
          this.fetchTotale();
        } else {
          console.error("Errore nell'eliminare la felpa.");
        }
      })
      .catch(error => {
        console.error("Errore nell'eliminare la felpa:", error);
      });
    }
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  box-sizing: border-box;
}

.app2 {
  font-family: Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.list-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2.5rem;
}
.list {
  width: 45%;
}
.list-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;
  margin-right: 10px;
}

.input {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.content{
  height: 100vh;
  width: auto;
  flex:1;
}
.title{
  text-align: center;
  font-family: 'Playfair Display', serif;
  color:rgb(226, 233, 190);


  padding-top: 0rem;
  padding-bottom: 1rem;
  font-size: 5rem;
  text-shadow: 1px 1px 2px white, 0 0 0.5rem rgb(185, 80, 80), 0 0 0.2em black;
}
.title2 {
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: rgb(226, 233, 190);
  position: fixed;  /* Fissa l'elemento in fondo */
  bottom: 0;        /* Posiziona l'elemento in fondo alla finestra */
  left: 50%;        /* Centra orizzontalmente */
  transform: translateX(-50%); /* Centra esattamente l'elemento */
  margin: 0;       /* Elimina margini predefiniti */
  padding: 1rem;   /* Spaziatura verticale attorno al titolo */
  font-size: 2rem; /* Dimensione del font */
  background-color: rgba(0, 0, 0, 0.7); /* Sfondo semi-trasparente */
  width: 100%;      /* Occupa l'intera larghezza della finestra */
}

.logo {
  width: auto; /* Imposta la larghezza del logo */
  height: 8vh; /* Mantieni le proporzioni dell'immagine */
  display: block; /* Rimuove lo spazio sotto l'immagine */
}

.subtitle-container{
  display: flex;
  justify-content: left;
  padding-bottom: 2rem;
  
}
.form-subtitle{
  padding-right: 13rem;
  padding-bottom: 0rem;
  font-size: 1.5rem;
  color: burlywood;
}

.subtitle-container2{
  display: flex;
  justify-content: left;
  padding-bottom: 1rem;
  
}
.form-subtitle2{
  padding-top:0.3rem;
  padding-right: 15rem;
  padding-left: 2rem;
  padding-bottom: 0rem;
  font-size: 1.2rem;
}

.form-subtitle3{
  padding-top:0.3rem;
  padding-left: 1.5rem;
  padding-bottom: 0rem;
  font-size: 1.2rem;
}
.submit-button{
  padding: 0.8rem 0.7rem; /* Aumenta il padding per rendere il bottone più grande */
  font-size: 1rem; /* Aumenta la dimensione del testo del bottone */
  font-family: 'Georgia', serif;
  color: White;
  background-color: #970202; /* Colore viola */
  border: GreenYellow;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom:0rem;
  transition: background-color 0.3s;
  
  position:absolute;
  margin-left:25%;
  
}

.submit-button2{
  padding: 0.8rem 0.7rem; /* Aumenta il padding per rendere il bottone più grande */
  font-size: 1rem; /* Aumenta la dimensione del testo del bottone */
  font-family: 'Georgia', serif;
  color: White;
  background-color: #970202; /* Colore viola */
  border: GreenYellow;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom:0rem;
  transition: background-color 0.3s;
  margin-left:2rem;
  position:absolute;
  margin-left: 27%;
  
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
.form-title{
  align-items: left;
  padding-left: 0rem;
  padding-bottom: 1rem;
  font-size: 2.5rem;
  color:#952bbe;
  font-weight: 700;
  text-shadow: 1px 1px 2px black, 0 0 0.5rem rgb(185, 80, 80), 0 0 0.2em black;
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

.background-container {
  position: relative;
  overflow: hidden; /* Assicura che lo pseudo-elemento non esca dai confini dell'elemento principale */
  color: white; /* Colore del testo */
  padding: 50px; /* Padding per il contenuto */
  padding-left:4.9rem;
  width: 100%;
  height: 100%;
}

.background-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  background-image: url('../assets/giungla.jpg'); /* Percorso dell'immagine */
  opacity:60%;
  background-size: cover; /* Adatta l'immagine per coprire l'intero elemento */
  /* Centra l'immagine */
  background-repeat: no-repeat; /* Impedisce la ripetizione dell'immagine */
 /* Opacità dell'immagine di sfondo (50%) */
  z-index: -1; /* Assicura che lo pseudo-elemento stia dietro al contenuto */
}

</style>
