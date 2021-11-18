<template>

    <nav class="navbar navbar-expand-lg navbar-light">   

        <h1 class="navbar-brand text-danger" href="#"><img class="logo" :src="image.source">Groupomania</h1>

        <!--Si la personne est connecté-->
        <div v-if="isConnected" class="collapse navbar-collapse d-flex justify-content-end ">
            <ul class="navbar-nav">
                <li class="nav-item ">
                    <router-link to="/wall"  class="nav-link m-2 btn btn-outline-primary text-primary font-weight-bold">Accueil</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/send" class="nav-link m-2 btn btn-primary text-white font-weight-bold">Poster un article</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/profil" class="nav-link  font-weight-bold"><i id='profil' class="fas fa-user-circle"></i></router-link>
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
          isConnected : false,
          user : 'Marie Robert',
          image : {
              source : '/images/icon.png',
              alt : 'Logo'
          }
      }
  }
}
</script>

<style scoped lang='scss'>
@import '../app.scss';
    .logo {
        height: 3rem;
    }
    .btn {
        border-radius: 9999px;
        border-width: 2px;
    }
    #profil {
        font-size: 3rem;
        color: #007bff;
    }
</style>