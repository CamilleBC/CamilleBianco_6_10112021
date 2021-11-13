<template>

    <nav class="navbar navbar-expand-lg navbar-light">   

        <h2 class="navbar-brand text-danger" href="#"><img class="logo" :src="image.source"><!-- Mettre le logo--></h2>

        <!--Si la personne est connecté-->
        <div v-if="isConnected" class="collapse navbar-collapse d-flex flex-row-reverse ">
            <ul class="navbar-nav">
                 <li class="nav-item">
                   <div class="navbar-brand"> Nom de profil</div>
                </li>
                <li class="nav-item">
                    <router-link to="/wall" class="nav-link">Accueil</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/send" class="nav-link">Poster</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/profil" class="nav-link">Paramètres</router-link>
                </li>
            </ul>
        </div>

        <!--Si la personne n'est connecté-->
        <div v-else class="collapse navbar-collapse d-flex flex-row-reverse ">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/signup" class="nav-link">S'inscrire</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login" class="nav-link">Se connecter</router-link>
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
          image : {
              source : '/images/icon-left-font.png',
              alt : 'Logo'
          }
      }
  }
}
</script>

<style scoped lang='scss'>
    .logo {
        height: 200px;
    }
</style>