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
        <p class="title">T-SHIRT MACACOS (13€)</p>
        
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
              <option value="ROSA">ROSA</option>
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
        const response = await fetch('https://storemacacos.onrender.com/api/ordine/'+encodedUsername+'/tshirt', {
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
        
        alert("T-SHIRT AGGIUNTA ALLA LISTA DEGLI ORDINI\nCOLORE: "+colore+"\nTAGLIA: "+taglia)
        
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

.app {
  font-family: Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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




.input-group label {
  display: block;
  font-size: 2rem;
  margin-bottom: 20px;
  
}

/* Stili per i selettori */
.input-group select {
  width: 10%;
  text-align: center;
  font-size: 1em; /* Aumenta la dimensione del testo del select */
  padding: 10px;
  border: 1px solid #ff00d4;
  border-radius: 4px;
  box-shadow: 0px 4rem 8rem rgba(0, 0, 0, 0.1); /* Aggiunge un'ombra al select */
}

.form-container button{
  padding: 1rem 2rem; /* Aumenta il padding per rendere il bottone più grande */
  font-size: 2.5rem; /* Aumenta la dimensione del testo del bottone */
  font-family: 'Georgia', serif;
  color: White;
  background-color: #42056e; /* Colore viola */
  border: GreenYellow;
  border-radius: 35px;
  cursor: pointer;
  margin-top: 5.5rem;
  transition: background-color 0.3s;
  margin-left:4rem;
}

.form-container{
  align-items:center;
  font-size:1.5rem;
  padding-bottom:1rem;
}
.form-title{
  align-items: center;
  font-size: 2.5rem;
  color:#952bbe;
  font-weight: 700;
}

.input-group {
  margin-bottom: 20px;
  margin-top: 20px;
  padding-top: 1rem;
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
.background-container {
  position: relative;
  overflow: hidden; /* Assicura che lo pseudo-elemento non esca dai confini dell'elemento principale */
  color: white; /* Colore del testo */
  padding: 70px; /* Padding per il contenuto */
  padding-left:4.9rem;
}

.background-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  min-width: 100vw;
  background-image: url('../assets/giungla.jpg'); /* Percorso dell'immagine */
  opacity:60%;
  background-size: cover; /* Adatta l'immagine per coprire l'intero elemento */
  background-position: center; /* Centra l'immagine */
  background-repeat: no-repeat; /* Impedisce la ripetizione dell'immagine */
 /* Opacità dell'immagine di sfondo (50%) */
  z-index: -1; /* Assicura che lo pseudo-elemento stia dietro al contenuto */
}





</style>
