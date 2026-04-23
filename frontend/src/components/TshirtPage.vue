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
        <router-link to="/tshirt" class="nav-item-underline">T-SHIRT</router-link>
        <router-link to="/felpe" class="nav-item">FELPE</router-link>
        <!-- <router-link to="/divise" class="nav-item">DIVISE</router-link> -->
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
          <p class="title">T-SHIRT MACACOS ({{m_p}}€)<br>Il prezzo potrebbe cambiare una volta contattati i fornitori</p>
          
          

          <div class="grid-row">
            <div>
              <div class="form-container">
                <h2 class="form-title">SELEZIONARE TAGLIA E COLORE:</h2>
                <form @submit.prevent="handleSubmit">
                  <div class="input-group">
                    <label for="taglia">Seleziona una taglia:</label>
                    <select id="taglia" name="taglia" v-model="selectedSize">
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                  <div class="input-group">
                    <label for="colore">Seleziona un colore:</label>
                    <select id="colore" name="colore" v-model="selectedColor">
                      <option value="BIANCO">BIANCO</option>
                      <option value="NERO">NERO</option>
                      <option value="ROSA">ROSA</option>
                    </select>
                  </div>
                  <button type="submit" class="submit-button">ORDINA</button>
                </form>
              </div>
            </div>
            <div class="immagine-t-shirt">
              <img :src="selectedImage" alt="T-shirt selezionata" class="maglietta" v-if="selectedImage" >
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
import bianca from "../assets/t-shirt-bianca.png";
import nera from "../assets/t-shirt-nera.png";
import rosa from "../assets/t-shirt-rosa.png";

export default {
  setup() {
    // Variabile che tiene la taglia selezionata (se vuoi usarla)
    const selectedSize = ref("S");
    const m_p=localStorage.getItem("m_price");

    // Variabile per il colore selezionato
    const selectedColor = ref("BIANCO");

    // Mappa delle immagini per ogni colore
    const colorImages = {
      BIANCO: bianca,
      NERO: nera,
      ROSA: rosa,
    };

    // Computed per aggiornare l'immagine in base alla selezione
    const selectedImage = computed(() => colorImages[selectedColor.value] || "");

    return {
      selectedSize,
      selectedColor,
      selectedImage,
      m_p
    };
  },

  mounted() {
    // Verifica se l'utente è già loggato
    const username = localStorage.getItem('username');
    const m_price = localStorage.getItem('m_price');
    if (!username) {      
      this.$router.push('/');
    }else{
      if(!m_price){
        
        localStorage.setItem('m_price', "16.60"); 
        localStorage.setItem('f_price', "25.20"); 
        
      }
      else if(Number(m_price)>16.60){
        localStorage.setItem('m_price', "16.60"); 
        localStorage.setItem('f_price', "25.20"); 
        
      }
    }
  },

  methods: {
    logout(){
      localStorage.removeItem('username');
            localStorage.removeItem('m_price');
            localStorage.removeItem('f_price');
            this.$router.push('/');
    },
    async handleSubmit() {
      try {
        const taglia = this.selectedSize;
        const colore = this.selectedColor;

        const username = localStorage.getItem("username");
        const encodedUsername = encodeURIComponent(username);
        console.log(username);

        const response = await fetch(
          "https://storemacacos.onrender.com/api/ordine/" + encodedUsername + "/tshirt",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              taglia: taglia,
              colore: colore,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Errore nell'invio dell'ordine");
        }

        // Dopo l'invio, mostra un alert
        alert("T-SHIRT AGGIUNTA ALLA LISTA DEGLI ORDINI\nCOLORE: " + colore + "\nTAGLIA: " + taglia);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
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
  text-decoration: underline;
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
  justify-content: flex-end;
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
  margin-left: auto; /* Aggiunto margine per separare dal resto */
  border: 0.7vh solid black;
}

.maglietta { filter: drop-shadow(0.2px 0.2px 5px white);}

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

.form-container button {
  /* display:none; */
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

/*####################################################################################################################################################################
########################################################################################################################*/
/*####################################################################################################################################################################
########################################################################################################################*/
/*####################################################################################################################################################################
########################################################################################################################*/
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
  justify-content: space-between;
  align-items: center;
  padding: 1.5vw;
  z-index:1000;
  position:sticky;
  top:0;
  box-shadow: 0 2vw 5vw rgb(0, 0, 0);
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 2.8vh; /* Distanza tra i link */
}


.navbar-right {
  display: flex;
  align-items: right;
  justify-content: flex-end;
}

.log-out {
  font-family: 'Roboto', sans-serif;
  color:white;
  background: radial-gradient(rgb(255, 0, 0),rgb(95, 5, 5));
  font-weight: 800;
  resize: none;
  font-size: 3vw;
  padding: 0.8vh 1vw;
  border-radius: 2.5vw;
  text-shadow: 0.2vw 0.2vw 0.2vw hsl(0, 0%, 0%);
  margin-left: 100%; /* Aggiunto margine per separare dal resto */
  border: 0.3vh solid black;
  margin-left: auto;
  
}


.nav-item {
  font-family: 'Roboto', sans-serif;
  color: #952bbe; 
  font-weight: 800;
  resize:none;
  font-size: 3vw;
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
  font-size: 3vw;
  padding:0vh 0vw;
  border-radius: 1vw;
  text-shadow: 0.2vw 0.2vw 0.2vw hsl(0, 0%, 0%);
}


.logo {
  width: 80%; /* Imposta la larghezza del logo */
  height: 100%; /* Mantieni le proporzioni dell'immagine */
  width: auto;
  padding-top: 0;
  display: block; /* Rimuove lo spazio sotto l'immagine */
}
.input{
  height:8vh;
  width:22vw;
}
.home {
  text-align: center;
  padding: 2.5vh 0vw;
  font-weight: 500vh;
  font-size: 3vw;
  height:2vh;
  color: rgb(196, 186, 186);
  text-shadow: 0.01vw 0.01vw 0.1vw rgb(255, 0, 0), 0 0 0.5vw rgb(25, 27, 146), 0 0 0.2vw blue;
}



.nav-item1 {
  color: #9b59b6; /* Viola */
  font-family: 'Georgia', serif;
  font-size: 2.5vw;
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

  .form-title{
    display:none;
  }
  .title{
    margin-top: 5vh;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
}

/* Sposta il contenitore dell'immagine in cima */
.immagine-t-shirt {
  order: -1; 
  margin-bottom: 2vh;
  margin-top: 4vh;
}
.maglietta {
  height: 30vh; /* Regola la grandezza su mobile */
  width: auto;
}
  .form-container {
    order: 2;
    width: 100%;
    text-align: center;
  }

.form-container form {
  display: flex;
  flex-direction: row; /* Affianca gli elementi */
  flex-wrap: wrap;      /* Permette al bottone di andare a capo */
  justify-content: center;
  gap: 2vw;             /* Spazio tra i due selettori */
}

 .input-group {
  flex: 1;              /* Fa sì che i due selettori si dividano lo spazio */
  min-width: 140px;     /* Impedisce che diventino troppo stretti */
  text-align: center;
}

.input-group select {
    width: 90%;          /* Occupa quasi tutto lo spazio del suo gruppo */
    padding: 1.5vh;      /* Aumenta l'altezza interna del tasto */
    font-size: 2.2vh;    /* Rende il testo interno più grande */
    border-radius: 1vh;  /* Arrotonda gli angoli per un look più moderno */
    background-color: white; /* Assicura che sia leggibile */
    border: 0.2vh solid #316104;
    cursor: pointer;
  }

  /* Opzionale: aumenta anche la dimensione della Label sopra */
  .input-group label {
    font-size: 1.8vh;
    font-weight: bold;
    margin-bottom: 1vh;
    display: block;
  }

.form-container button.submit-button {
    /* 1. LARGHEZZA: Usa width o max-width */
    width: 50% !important;   /* Qui decidi quanto deve essere largo (es. 70% dello schermo) */
    flex-basis: 70%;        /* Ripristina il valore per permettere alla width di funzionare */
    
    /* 2. ALTEZZA: Usa padding o height */
    height: 8vh;             /* Altezza fissa */
    /* padding: 2vh 0; */    /* In alternativa all'altezza fissa */
    
  box-shadow: 0 0.7vh 1vh rgb(66, 5, 110); /* Ombra scura sotto il tasto */
  border: 0.2vh solid rgba(255, 255, 255, 0.3); /* Leggero riflesso sul bordo */

    /* 3. CENTRAMENTO */
    margin: 7vh auto !important; 
    display: flex;
    align-items: center;
    justify-content: center;

    /* 4. TESTO */
    font-size: 3vh;
    font-family: 'Georgia', serif;
  }
}




</style>
