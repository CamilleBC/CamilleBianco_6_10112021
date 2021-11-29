<template>

      
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11 col-11">
          <div class="text-black">
            <div class="row justify-content-center">
              
              <div class="col-lg-6">

                <p class="text-danger h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 ">Créer un compte.</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <div class="form-outline flex-fill mb-0">
                    <label class="form-label" for="name">Votre nom</label>
                    <input type="text" v-model="name" id="name" class="form-control" />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="email">Votre Email</label>
                        <input type="email" v-model="email" id="email" class="form-control" />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="Mot de passe">Votre mot de passe</label>
                      <input v-b-popover.hover.top="'Au minimum 8 caractères avec majuscule, caratères spéciaux, chiffre.'" aria-label="Mot de passe" type="password" v-model="password" id="Mot de Passe" class="form-control" />
                      <p v-if="infoPassword" class="text-danger text-center">Votre mot de passe doit contenir au minimum 8 caractères avec au moins une majuscule, un caractère spécial et un chiffre.</p>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" @click="signup" class="btn btn-primary btn-lg">Inscription</button>
                  </div>
                </form>

              </div>
            </div>
        </div>
      </div>
  </div>

</template>
<script>
export default {
    name : 'Signup',

    data (){
      return {
        //Reprise des éléments du formulaires grâce à la directive v-model
        name : "",
        email : "",
        password :"",
        infoPassword : false

      }
    },

    methods : {

      signup : function(){
        //Reprise des information le formulaire
        const data = {name : this.name, email : this.email, password : this.password}
        //Envoi les infos à l'aide d'une méthode post dans notre BDD 
        this.$http.post('http://localhost:3000/api/user/signup', data)
          //Si envoi réussi
          .then(function(res){
            if(res.status === 200){
            window.location.href = 'http://localhost:8080/login'
            }
            console.log(res.body)
          },
          //Si envoi échoué
          function(error){
            this.infoPassword = true
            console.log(error.body)
          })
        },

    }   
}
</script>
<style scoped lang='scss'>

section {
  background-color:  #eee;
 }
  .btn {
    font-size: 1.5rem;
}

</style>