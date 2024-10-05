<template>
  <div class="app">
    <div class="container">
      <h1 class="title">MACACOS STORE</h1>
      <div class="form-container">
        <h2 class="form-title">INSERIRE NOME, COGNOME ED E-MAIL:</h2>
        <form @submit.prevent="handleSubmit" class="flex-class">
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


@media (max-width: 768px) {
  

  .app {
    font-family: Arial, sans-serif;
    width: 100vw;
    height: 100vh;
    
    
    display: flex;
    flex-direction: column;
    
  }
  .flex-class{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .macaco{
    flex: 0.5;
    order:1;
    background-color: #000000;
    overflow: hidden;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  .logo{
    padding-top: 1vh;
    object-fit: contain; /* Adatta l'immagine per coprire l'intero elemento */
    object-position: center; /* Centra l'immagine */
    width: 100%;
    height: 100%;

  }
  .container {
    flex:1.5;
    order: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width:100vw;
    overflow:hidden;
    background: linear-gradient(to top, #430955, #000000);
  }

  .title {
    font-family: 'Montserrat', sans-serif; /* Font personalizzato */
    font-size: 9vh; /* Dimensione del font */
    color:  #ff4081; /* Gradiente di colore */
    font-weight: 1000;
    
    text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.2), 5px 5px 0px rgba(0, 0, 0, 0.1); /* Ombra del testo */
    letter-spacing: 2px; /* Spaziatura tra le lettere */
    margin: 0; /* Rimuove il margine predefinito */
    animation: bounce 4s infinite; /* Animazione di rimbalzo */
    -webkit-text-stroke: 0.3vh rgb(3, 41, 5); /* Bordo bianco di 1px */
    font-weight: 500;
    
    
    
    
    text-align: center;
    padding-bottom: 5vh;
    
    
    
   
  }
  @keyframes bounce {
    0% { color: #ff00bf; }   /* Rosa Shock */
    2% { color: #ff1ab2; }   /* Rosa brillante */
    4% { color: #ff339d; }   /* Rosa acceso */
    6% { color: #ff4d88; }   /* Rosa medio chiaro */
    8% { color: #ff668f; }   /* Rosa chiaro */
    10% { color: #ff7f77; }  /* Rosa pallido */
    12% { color: #ff9a61; }  /* Rosa molto pallido */
    14% { color: #ffb54d; }  /* Rosa tenue */
    16% { color: #ffcf3a; }  /* Rosa tenue dorato */
    18% { color: #ffde29; }  /* Giallo dorato */
    20% { color: #e6dd23; }  /* Giallo brillante */
    22% { color: #ccdb27; }  /* Giallo limone */
    24% { color: #b2d62c; }  /* Verde lime */
    26% { color: #99d52f; }  /* Verde chiaro */
    28% { color: #7ec933; }  /* Verde acceso */
    30% { color: #66bc39; }  /* Verde medio */
    32% { color: #57b12c; }  /* Verde fresco */
    34% { color: #46a823; }  /* Verde tenue */
    36% { color: #39a41f; }  /* Verde scuro */
    38% { color: #3f9518; }  /* Verde menta */
    40% { color: #4ca60d; }  /* Verde prato */
    42% { color: #59b80c; }  /* Verde brillante */
    44% { color: #6fd80b; }  /* Verde lime intenso */
    46% { color: #8afc07; }  /* Verde fosforescente */
    48% { color: #9bff03; }  /* Verde lime brillante */
    50% { color: #aaff00; }  /* Verde lime molto brillante */
    52% { color: #bbff05; }  /* Verde lime chiaro */
    54% { color: #d3ff07; }  /* Verde lime luminoso */
    56% { color: #e6ff1a; }  /* Giallo luminoso */
    58% { color: #ffff2f; }  /* Giallo acceso */
    60% { color: #fffb54; }  /* Giallo tenue */
    62% { color: #ffea6a; }  /* Giallo chiaro */
    64% { color: #ffdc81; }  /* Giallo pallido */
    66% { color: #ffcc9a; }  /* Giallo molto pallido */
    68% { color: #ffb1b1; }  /* Rosa chiaro */
    70% { color: #ff99cc; }  /* Rosa pallido */
    72% { color: #ff80e1; }  /* Rosa acceso */
    74% { color: #ff66ff; }  /* Rosa shock */
    76% { color: #e64cbb; }  /* Rosa chiaro */
    78% { color: #cc3299; }  /* Rosa brillante */
    80% { color: #b3008c; }  /* Rosa scuro */
    82% { color: #91006c; }  /* Rosa molto scuro */
    84% { color: #850063; }  /* Rosa scurissimo */
    86% { color: #740057; }  /* Rosa quasi nero */
    
    100% { color: #ff00bf; } /* Rosa Shock */
  }

  .email-group{
    margin-bottom: 7vh;
    
  }

  .form-container{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .form-title {
    display:flex;
    font-size: 1.5vh;
    margin-bottom: 1vh;
  }

  .input-group {
    display: flex;
    justify-content: center;
    gap: 1vh;
    margin-bottom: 2.5vh;

  }

  .input-box {
    padding: 1vh;
    font-size:1vh;
    border: 0.4vh solid #979393;
    border-radius: 4vh;
  }

  .input-label {
    display: flex;
    align-items: center;
    font-size: 1.25vh;
  }

  .email-label {
    
    align-items: center;
    font-size: 1.25vh;
  }

  .submit-button {
    padding: 1.5vh 2vh; /* Aumenta il padding per rendere il bottone più grande */
    font-size: 2.5vh; /* Aumenta la dimensione del testo del bottone */
    font-family: 'Georgia', serif;
    color: rgb(130, 219, 170);
    text-shadow: 5vh 5vh 5vh hsl(0, 0%, 0%);
    background:radial-gradient( #4f2e6d,rgb(0, 0, 0)); /* Colore viola */
    border: rgb(0, 0, 0);
    border-radius:1vh;
    border-width: 2vh;
    cursor: pointer;
    
    transition: background-color 0.3s;
    position: relative;
    display: flex;
    align-items: center;
  }

  .submit-button:hover {
    background-color: #5a0c9e; /* Colore viola più scuro */
  }



}





</style>


