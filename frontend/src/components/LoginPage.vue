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
    <div class="macaco">
      <img src='../assets/logo-macacos.jpg' alt="Logo" class="logo">
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




html, body {
  height: 100vh;
  width: 100vw;
  margin:0;
  font-size: 2wv;
  overflow:hidden;
  font-family: 'Georgia', serif;
}
.app {
  font-family: Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  
  
  display: flex;
  flex-direction: row;
  
}

.macaco{
  flex: 1;
  background-color: #000000;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.logo{
  object-fit: contain; /* Adatta l'immagine per coprire l'intero elemento */
  object-position: center; /* Centra l'immagine */
  width: 100%;
  height: 100%;

}
.container {
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  height: 100vh;
  width:100vw;
  overflow:hidden;
  background: linear-gradient(to right, #430955, #000000);
}

.title {
  font-size: 5vw;
  font-weight: 500;
  font-family: 'Georgia', serif;
  color: rgb(255, 7, 143); /* Colore viola */
  margin-bottom: 8vh;
  margin-left:2vw;
  text-shadow: 1vw 1vw 2vw rgb(7, 0, 10), 0 0 0.5vw rgb(0, 0, 0), 0 0 0.2vw rgb(0, 0, 0);
}

.email-group{
  margin-bottom: 7vh;
  text-align:left;
}

.form-container {
  margin-left:2vw;
  text-align: left;
}

.form-title {
  font-size: 1.5vw;
  margin-bottom: 1vw;
}

.input-group {
  display: flex;
  justify-content: left;
  gap: 1vw;
   margin-bottom: 2.5vw;

}

.input-box {
  padding: 1vw;
  font-size:1vw;
  border: 0.4vw solid #979393;
  border-radius: 4vw;
}

.input-label {
  display: flex;
  align-items: center;
  font-size: 1.25vw;
}

.email-label {
  margin-right:1vw;
  align-items: center;
  font-size: 1.25vw;
}

.submit-button {
  padding: 1.5vh 2vw; /* Aumenta il padding per rendere il bottone più grande */
  font-size: 2.5vw; /* Aumenta la dimensione del testo del bottone */
  font-family: 'Georgia', serif;
  color: rgb(130, 219, 170);
  text-shadow: 5vh 5vh 5vh hsl(0, 0%, 0%);
  background:radial-gradient( #4f2e6d,rgb(0, 0, 0)); /* Colore viola */
  border: rgb(0, 0, 0);
  border-radius:1vw;
  border-width: 2vw;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left:2vw;
}

.submit-button:hover {
  background-color: #5a0c9e; /* Colore viola più scuro */
}
@media (max-width: 768vw) {
  .header h1 {
    font-size: 2vw;
  }

  .form input,
  button {
    font-size: 1vw;
    padding: 8vw;
  }
}
</style>

