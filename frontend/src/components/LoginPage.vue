<template>
  <div class="app">
  <div class="container">
    <h1 class="title">MACACOS STORE</h1>
    <div class="form-container">
      <h2 class="form-title">INSERIRE NOME, COGNOME ED E-MAIL:</h2>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="nome" class="input-label">Nome:</label>
          <input type="text" v-model="nome" id="nome" class="input-box" placeholder="Nome">
          <label for="cognome" class="input-label">Cognome:</label>
          <input type="text" v-model="cognome" id="cognome" class="input-box" placeholder="Cognome">
        </div>
        <div class="email-group">
          <label for="email" class="email-label">E-mail:</label>
          <input type="text" v-model="email" id="email" class="input-box" placeholder="e-mail">
        </div>
        <button type="submit" class="submit-button">ENTRA</button>
      </form>
    </div>
    
  </div>
</div>
</template>


<script>
export default {
  data() {
    return {
      nome: '',
      cognome: '',
      email:''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('https://storemacacos.onrender.com/api/utente/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.nome,
            surname: this.cognome,
            email: this.email
          })
        })

        if (!response.ok) {
          throw new Error('Error submitting data')
        }

        // After successful submission, navigate to the second page
        const data = await response.json(); 
        const username = data.username;
        console.log(username);
        localStorage.setItem('username', username); 
        this.$router.push({path: '/home' })
        console.log("prova");
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
/* Global Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
   overflow-x: hidden; /* Nasconde l'overflow orizzontale */
  overflow-y: hidden; 
}



html, body {
  height: 100%;
  width: 100%;
  margin:0;
  font-size: 16px;
  overflow:hidden;
  font-family: 'Georgia', serif;
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


.container {
  background-image: url('../assets/logo-macacos.jpg'); /* Percorso dell'immagine */
  background-size: contain; /* Adatta l'immagine per coprire l'intero elemento */
  background-position: right; /* Centra l'immagine */
  background-repeat: no-repeat; /* Impedisce la ripetizione dell'immagine */

  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  height: 100vh;
  width:100vw;
  overflow:hidden;
}

.title {
  font-size: 6.5rem;
  font-weight: 500;
  font-family: 'Georgia', serif;
  color: fuchsia; /* Colore viola */
  margin-bottom: 8rem;
  margin-left:2rem;
  text-shadow: 1px 1px 2px red, 0 0 0.5rem white, 0 0 0.2em blue;
}

.email-group{
  margin-bottom: 7rem;
  text-align:left;
}

.form-container {
  margin-left:2rem;
  text-align: left;
}

.form-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  justify-content: left;
  gap: 1rem;
   margin-bottom: 2.5rem;

}

.input-box {
  padding: 1rem;
  font-size:1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-label {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
}

.email-label {
  margin-right:1rem;
  align-items: center;
  font-size: 1.25rem;
}

.submit-button {
  padding: 1rem 2rem; /* Aumenta il padding per rendere il bottone più grande */
  font-size: 2.5rem; /* Aumenta la dimensione del testo del bottone */
  font-family: 'Georgia', serif;
  color: White;
  background-color: #6a0dad; /* Colore viola */
  border: GreenYellow;
  border-radius: 35px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left:2rem;
}

.submit-button:hover {
  background-color: #5a0c9e; /* Colore viola più scuro */
}
</style>


