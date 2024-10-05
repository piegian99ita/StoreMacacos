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

    <!-- Main Content -->
   
    <div class="content">
      
        <div class="container">
          <div class="background-container">  
        <p class="title">FELPA MACACOS (23€)</p>
        
          <div class="form-container">
          <h2 class="form-title">SELEZIONARE UNA TAGLIA E IL COLORE:</h2>
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
            <label for="colore">Seleziona un colore:</label>
            <select id="colore" name="colore">
              <option value="BIANCO">BIANCO</option>
              <option value="NERO">NERO</option>
            </select>
              </div>
              <button type="submit" class="submit-button">ORDINA</button>
            </form>
          </div>
          <router-view />
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  methods: {
    async handleSubmit() {
      try {
        const selectElement = document.getElementById("taglia");
        const taglia = selectElement.value;

        const selectElementColor = document.getElementById("colore");
        const colore = selectElementColor.value;

        const username = localStorage.getItem('username'); 
        const encodedUsername = encodeURIComponent(username);
        console.log(username);
        const response = await fetch('https://storemacacos.onrender.com/api/ordine/'+encodedUsername+'/felpa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            taglia: taglia,
            colore: colore
          })
        })


        if (!response.ok) {
          throw new Error('Error submitting data')
        }

        // After successful submission, navigate to the second page
        
        alert("FELPA AGGIUNTA ALLA LISTA DEGLI ORDINI\nCOLORE: "+colore+"\nTAGLIA: "+taglia)
        
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>


<style scoped>
html, body {
  height: 100%;
  margin: 0;
  font-size: 16px;
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
.content{
  height: 100vh;
  width: 100vw;
 
}
.container{
  height: inherit;
  width: inherit;
}
.title{
  text-align: center;
  font-family: 'Playfair Display', serif;
  color:rgb(226, 233, 190);


  
  padding-bottom: 1vh;
  font-size: 4vw;
  text-shadow: 1px 1px 2px white, 0 0 0.5rem rgb(185, 80, 80), 0 0 0.2rem black;
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




.input-group label {
  display: block;
  font-size: 2vw;
  margin-bottom: 1vw;
  
}

/* Stili per i selettori */
.input-group select {
  width: 10%;
  text-align: center;
  font-size: 1vw; /* Aumenta la dimensione del testo del select */
  padding: 0.5vw;
  border: 0.1vw solid #316104;
  border-radius: 0.5vw;
 
}

.form-container button{
  padding: 1vw 2vw; /* Aumenta il padding per rendere il bottone più grande */
  font-size: 2vw; /* Aumenta la dimensione del testo del bottone */
  font-family: 'Georgia', serif;
  color: White;
  background:radial-gradient(rgb(25, 5, 41),#42056e) ; /* Colore viola */
  border: GreenYellow;
  border-radius: 1.5vw;
  cursor: pointer;
  margin-top: 3vw;
  transition: background-color 0.3s;
  margin-left:3vw;
}

.form-container{
  align-items:center;
  font-size:1vw;
  padding-bottom:1vw;
}
.form-title{
  align-items: center;
  font-size: 2vw;
  padding-top: 1vw;
  color:#952bbe;
  font-weight: 700;
}

.input-group {
  margin-bottom: 1vw;
  padding-top: 1vw;
}



.background-container {
  position: relative; /* Assicura che lo pseudo-elemento non esca dai confini dell'elemento principale */
  color: white; /* Colore del testo */
  padding: 2.5vw; /* Padding per il contenuto */
  padding-left:3vw;
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
  background-image: url('../assets/giungla.jpg'); /* Percorso dell'immagine */
  opacity:60%;
  background-size: cover; /* Adatta l'immagine per coprire l'intero elemento */
  background-position: center; /* Centra l'immagine */
  background-repeat: no-repeat; /* Impedisce la ripetizione dell'immagine */
  background-clip: border-box;
 /* Opacità dell'immagine di sfondo (50%) */
  z-index: -1; /* Assicura che lo pseudo-elemento stia dietro al contenuto */
}





</style>
