<template>
  <div class="app2">
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
        <router-link to="/divise" class="nav-item-underline">DIVISE</router-link>
        <router-link to="/ordini" class="nav-item">ORDINI</router-link>
      </div>

      <div class="navbar-right">
        <router-link to="/" class="log-out" @click="logout">LOGOUT</router-link>
      </div>
    </nav>

    <!-- Main Content -->

    <div class="content">

      <div class="container">
        <div class="background-container">
          <p class="title">PRENOTAZIONE NUMERI DIVISE</p>
          <div class="grid-row">
            <div>
              <div class="form-container">
                <h2 class="form-title">SELEZIONARE TAGLIA E NUMERO:</h2>
                <form @submit.prevent="handleSubmit">
                  <div class="input-group">
                    <label for="taglia">Seleziona una taglia:</label>
                    <select id="taglia" name="taglia">
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                  <div class="input-group">
                    <label for="number-select">Seleziona un numero:</label>
                      <select id="number-select" v-model="selectedNumber" @change="checkValue">
                        <option disabled value="">Seleziona un numero</option>
                        <option v-for="n in numbers" :key="n" :value="n">
                        {{ n }}
                        </option>
                      </select>
                      <label for="number-select">{{stringa_available}}</label>
                  </div>
                  <button type="submit" :class="{'submit-button-red':request_status==1,'submit-button-viola':request_status==0,'submit-button-green':request_status==2 ,'submit-button-blue':request_status==3}">{{stringa_bottone}}</button>
                </form>
              </div>
            </div>
            <div class="immagine-felpa">
              <img src="../assets/nuova-divisa.png"  class="felpa"  >
            </div>
          </div>
          <router-view />
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import { ref, computed } from "vue";

export default {
  data() {
    return {
      available: [],  // Array per le t-shirt
      unavailable: [],     // Array per le felpe
      myNumber: 0,
      request_status: 0,
    }
  },

  setup() {
    // Variabile che tiene la taglia selezionata (se vuoi usarla)
    const selectedSize = ref("S");
  
    const selectedNumber=ref(null)
    let stringa_bottone="numero non ancora selezionato"
    let stringa_available=""
    // Mappa delle immagini per ogni colore
    



    return {
      selectedSize,
      selectedNumber,
      stringa_bottone,
      stringa_available
    };
  },

  mounted() {
    // Verifica se l'utente è già loggato
    const username = localStorage.getItem('username');
    
    if (!username) {      
      this.$router.push('/');
    }
    this.fetchMyNumber();
    this.fetchUnavailable();
  },
  computed: {

    
    numbers(){
      const numList = [];
      for (let i = 0; i < 100; i++) {
        numList.push(i);
      }
      return numList;
    }
    
  },
  methods: {
    checkValue(){
      const current_number=document.getElementById("number-select")==this.myNumber
      if(current_number==null){
        this.request_status=3;
        this.stringa_bottone="SELEZIONA NUMERO E TAGLIA"
        this.stringa_available=""
      }else if(current_number==this.myNumber){
        this.request_status=4;
        this.stringa_bottone="PREMI PER CAMBIARE TAGLIA AL TUO NUMERO"
        this.stringa_available="HAI GIA' SELEZIONATO QUESTO NUMERO"
      }else if(!this.unavailable.includes(current_number)){
        this.request_status=2;
        this.stringa_bottone="PRENOTA QUESTO NUMERO"
        this.stringa_available="DISPONIBILE"

      }else if(this.unavailable.includes(current_number)){
        this.request_status=1;
        this.stringa_bottone="NUMERO NON DISPONIBILE"
        this.stringa_available="NON DISPONIBILE"

      }

    },
    logout(){
      localStorage.removeItem('username');
            localStorage.removeItem('m_price');
            localStorage.removeItem('f_price');
            this.$router.push('/');
    },
    async handleSubmit() {
      try {
        const selectElement = document.getElementById("taglia");
        const taglia = selectElement.value;

        const selectElementNumber = document.getElementById("number-select");
        const numero = selectElementNumber.value;
        if(!this.unavailable.includes(numero)){
          const username = localStorage.getItem('username'); 
          const encodedUsername = encodeURIComponent(username);
          console.log(username);
          const response = await fetch('https://storemacacos.onrender.com/api/divise/'+encodedUsername, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              taglia: taglia,
              numero: numero
            })
          })


          if (!response.ok) {
            throw new Error('Error submitting data')
          }          
          alert("CAMBIO TAGLIA E/O NUMERO AVVENUTO CON SUCCESSO\NUMERO: "+numero+"\nTAGLIA: "+taglia)
          this.myNumber=numero;
          this.fetchUnavailable();

        }
      } catch (error) {
        console.error(error)
      }
    },
    // Funzione per ottenere le t-shirt dall'API
    fetchMyNumber() {
      const username = localStorage.getItem('username'); 
      const encodedUsername = encodeURIComponent(username);
      fetch('https://storemacacos.onrender.com/api/divise/'+encodedUsername+'/numero')
        .then(response => response.json())
        .then(data => {
          this.myNumber = data;
        })
        .catch(error => {
          console.error("Errore nel recuperare il numero:", error);
          this.myNumber=null;
        });
    },
    fetchUnavailable() {
      const username = localStorage.getItem('username'); 
      const encodedUsername = encodeURIComponent(username);
      fetch('https://storemacacos.onrender.com/api/divise/unavailable')
        .then(response => response.json())
        .then(data => {
          this.unavailable = data.map(numero=>parseInt(numero));
        })
        .catch(error => {
          console.error("Errore nel recuperare il numero:", error);
        });
    },
  }
}
</script>


<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  font-size: 16px;
  box-sizing: border-box;
  overflow-x:hidden;
}

.app2 {
  font-family: Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-x:hidden;
}

.content {
  height: 100vh;
  width: 100vw;

}

.container {
  height: inherit;
  width: inherit;
}

.title {
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: rgb(226, 233, 190);



  padding-bottom: 1vh;
  font-size: 4vw;
  text-shadow: 1px 1px 2px white, 0 0 0.5rem rgb(185, 80, 80), 0 0 0.2rem black;
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
.nav-item-underline {
  font-family: 'Roboto', sans-serif;
  color: #952bbe;
  font-weight: 800;
  resize: none;
  text-decoration:underline;
  
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
.felpa { filter: drop-shadow(0.2px 0.2px 5px white);}


.grid-row {
  display: grid;
  grid-template-columns: auto auto; /* Definisce due colonne */
  /* Opzionale: allinea gli elementi al centro verticalmente */
  align-items: center;
}


.input-group label {
  display: block;
  font-size: 2vw;
  margin-bottom: 1vw;

}

/* Stili per i selettori */
.input-group select {
  width: 10vw;
  text-align: center;
  font-size: 1vw;
  /* Aumenta la dimensione del testo del select */
  padding: 0.5vw;
  border: 0.1vw solid #316104;
  border-radius: 0.5vw;

}

.submit-button-red {
  padding: 1vw 2vw;
  /* Aumenta il padding per rendere il bottone più grande */
  font-size: 2vw;
  /* Aumenta la dimensione del testo del bottone */
  font-family: 'Georgia', serif;
  color: White;
  background: radial-gradient(rgb(54, 7, 7), #cf0505);
  /* Colore viola */
  border: GreenYellow;
  border-radius: 1.5vw;
  cursor: pointer;
  margin-top: 3vw;
  transition: background-color 0.3s;
  margin-left: 3vw;
}
.submit-button-blue {
  padding: 1vw 2vw;
  /* Aumenta il padding per rendere il bottone più grande */
  font-size: 2vw;
  /* Aumenta la dimensione del testo del bottone */
  font-family: 'Georgia', serif;
  color: White;
  background: radial-gradient(rgb(0, 6, 83), #003cff);
  /* Colore viola */
  border: GreenYellow;
  border-radius: 1.5vw;
  cursor: pointer;
  margin-top: 3vw;
  transition: background-color 0.3s;
  margin-left: 3vw;
}
.submit-button-green {
  padding: 1vw 2vw;
  /* Aumenta il padding per rendere il bottone più grande */
  font-size: 2vw;
  /* Aumenta la dimensione del testo del bottone */
  font-family: 'Georgia', serif;
  color: White;
  background: radial-gradient(rgb(7, 61, 23), #06a86a);
  /* Colore viola */
  border: GreenYellow;
  border-radius: 1.5vw;
  cursor: pointer;
  margin-top: 3vw;
  transition: background-color 0.3s;
  margin-left: 3vw;
}
.submit-button-viola {
  padding: 1vw 2vw;
  /* Aumenta il padding per rendere il bottone più grande */
  font-size: 2vw;
  /* Aumenta la dimensione del testo del bottone */
  font-family: 'Georgia', serif;
  color: White;
  background: radial-gradient(rgb(25, 5, 41), #42056e);
  /* Colore viola */
  border: GreenYellow;
  border-radius: 1.5vw;
  cursor: pointer;
  margin-top: 3vw;
  transition: background-color 0.3s;
  margin-left: 3vw;
}

.form-container {
  align-items: center;
  font-size: 1vw;
  padding-bottom: 1vw;
}

.form-title {
  align-items: center;
  font-size: 2vw;
  padding-top: 1vw;
  color: #952bbe;
  font-weight: 700;
}

.input-group {
  margin-bottom: 1vw;
  padding-top: 1vw;
}



.background-container {
  position: relative;
  /* Assicura che lo pseudo-elemento non esca dai confini dell'elemento principale */
  color: white;
  /* Colore del testo */
  padding: 2.5vw;
  /* Padding per il contenuto */
  padding-left: 3vw;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  background-clip: border-box;
}

.background-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100%;
  min-width: 100%;
  background-image: url('../assets/giungla.jpg');
  /* Percorso dell'immagine */
  opacity: 60%;
  background-size: cover;
  /* Adatta l'immagine per coprire l'intero elemento */
  background-position: center;
  /* Centra l'immagine */
  background-repeat: no-repeat;
  /* Impedisce la ripetizione dell'immagine */
  background-clip: border-box;
  /* Opacità dell'immagine di sfondo (50%) */
  z-index: -1;
  /* Assicura che lo pseudo-elemento stia dietro al contenuto */
}


@media (max-width: 768px) {



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
.nav-item-underline{
  font-family: 'Roboto', sans-serif;
  color: #952bbe; 
  font-weight: 800;
  resize:none;  
  background-color: rgba(197, 243, 170, 0);
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



  


  html,
  body {
    height: 100%;
    margin: 0;
    font-size: 16px;
    box-sizing: border-box;
    overflow-x:hidden;
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

  .content {
    height: 100vh;
    width: 100vw;

  }

  .container {
    height: inherit;
    width: inherit;
  }

  .title {
    text-align: center;
    font-family: 'Playfair Display', serif;
    color: rgb(226, 233, 190);



    padding-bottom: 1vh;
    font-size: 5vh;
    text-shadow: 1px 1px 2px white, 0 0 0.5rem rgb(185, 80, 80), 0 0 0.2rem black;
  }






  .input-group label {
    display: block;
    font-size: 2.5vh;
    margin-bottom: 1vh;

  }

  /* Stili per i selettori */
  .input-group select {
    width: 60%;
    text-align: center;
    font-size: 2.5vh;
    /* Aumenta la dimensione del testo del select */
    padding: 1vh;
    border: 0.1vh solid #316104;
    border-radius: 0.5vh;

  }

  .form-container button {
    
    padding: 2vh 3vh;
    /* Aumenta il padding per rendere il bottone più grande */
    font-size: 3vh;
    /* Aumenta la dimensione del testo del bottone */
    font-family: 'Georgia', serif;
    color: White;
    background: radial-gradient(rgb(25, 5, 41), #42056e);
    /* Colore viola */
    border: GreenYellow;
    border-radius: 1.5vh;
    cursor: pointer;
    margin-top: 8vh;
    transition: background-color 0.3s;
    margin-left: 30vw;
  }

  .form-container {
    align-items: center;
    font-size: 1vh;
    padding-bottom: 1vh;
  }

  .form-title {
    align-items: center;
    font-size: 2.7vh;
    padding-top: 2vh;
    padding-bottom: 1vh;
    color: #952bbe;
    font-weight: 700;
  }

  .input-group {
    margin-bottom: 1.5vh;
    padding-top: 1.5vh;
  }



  .background-container {
    position: relative;
    /* Assicura che lo pseudo-elemento non esca dai confini dell'elemento principale */
    color: white;
    /* Colore del testo */
    padding: 2.5vw;
    /* Padding per il contenuto */
    padding-left: 3vw;
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-clip: border-box;
  }

  .background-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    min-height: 90%;
    min-width: 100%;
    background-image: url('../assets/giungla.jpg');
    /* Percorso dell'immagine */
    opacity: 60%;
    background-size: cover;
    /* Adatta l'immagine per coprire l'intero elemento */
    background-position: center;
    /* Centra l'immagine */
    background-repeat: no-repeat;
    /* Impedisce la ripetizione dell'immagine */
    background-clip: border-box;
    /* Opacità dell'immagine di sfondo (50%) */
    z-index: -1;
    /* Assicura che lo pseudo-elemento stia dietro al contenuto */
  }
  .grid-row {
  display: grid;
  grid-template-columns: 55% 45%; /* Definisce due colonne */
  /* Opzionale: allinea gli elementi al centro verticalmente */
  align-items: left;
}


.felpa{
  height: 13vh;
  width:auto;
  margin-right: 20vh;
}




}
</style>
