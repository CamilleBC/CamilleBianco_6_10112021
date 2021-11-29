<template>

    <nav class="navbar navbar-expand d-flex justify-content-between flex-lg-row flex-column navbar-light">   

        <h1 id="titreLogo" class="navbar-brand text-danger align-self-start" href="#"><img class="logo" :src="image.source" alt="Logo Groupomania">Groupomania</h1>

        <!--Si la personne est connecté-->
        <div v-if="isConnected()" class="d-flex flex-column-reverse flex-xl-row">
            <ul class="navbar-nav d-flex justify-content-center">
                <li class="nav-item">
                    <router-link to="/send" class="nav-link m-2 btn btn-primary text-white font-weight-bold">Poster un article</router-link>
                </li>
                </ul>
                <ul class="navbar-nav mb-4">
                <li class="nav-item ">
                    <router-link to="/wall" class="nav-link m-2 btn btn-outline-primary text-primary font-weight-bold">Accueil</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/profil" aria-label="Profil" class="nav-link font-weight-bold"><i id='profil' class="fas fa-user-circle"></i></router-link>
                </li>
                <li class="nav-item">
                    <button @click="disconnected()" aria-label="Déconnection" class="nav-link m-2 btn btn-danger text-white font-weight-bold"><i class="fas fa-sign-out-alt"></i></button>
                </li>
                </ul>
           
        </div>

        <!--Si la personne n'est connecté-->
        <div v-else class="collapse navbar-collapse d-flex justify-content-end ">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/login" class="nav-link btn btn-outline-primary text-primary font-weight-bold m-2">Se connecter</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/signup" type='button' class="nav-link btn btn-primary text-white font-weight-bold m-2">S'inscrire</router-link>
                </li>
                
            </ul>
        </div>
    </nav>
    
</template>

<script>
export default {
  name : 'Nav',
  data() {
      return {
          user : 'Marie Robert',
          image : {
              source : '/images/icon.png',
              alt : 'Logo'
          }
      }
  },
  methods : {
      isConnected : function(){
          if (localStorage.getItem('token') !== null){
              return true
          }
          return false
      },
      disconnected : function(){
          localStorage.clear();
          window.location.href = 'http://localhost:8080/login'
      }
  }
}
</script>

<style scoped lang='scss'>
@import '../app.scss';
    .logo {
        height: 5rem;
    }
    .btn {
        border-radius: 9999px;
        border-width: 2px;
        font-size: 1.5rem;
    }
  
    #profil {
        font-size: 3.5rem;
        color: #007bff;
    }
    #titreLogo{
        font-size: 2rem;
    }
</style>