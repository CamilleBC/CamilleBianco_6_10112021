<template>

      
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11 col-11">
          <div class="text-black" >
            <div class="row justify-content-center">
              
              <div class="col-lg-6">

                <p class="text-danger h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Connexion</p>

                <form class="mx-1 mx-md-4">


                  <div class="d-flex flex-row align-items-center mb-4">
                    <div class="form-outline flex-fill mb-0">
                        <label aria-label='email' class="form-label" for="email">Email</label>
                        <input type="email" v-model="email" id="email" class="form-control" />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="Mot de passe">Mot de passe</label>
                      <input aria-label='Mot de passe' type="password" v-model="password" id="Mot de Passe" class="form-control" />
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" @click="login()" class="btn btn-primary btn-lg">Connecter</button>
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
  name : 'Login',
  data (){
    return{
      email : "",
      password : ""
    }
  },
  methods : {
    login : function (){
      const data = {email : this.email, password : this.password}
      this.$http.post('http://localhost:3000/api/user/login', data)
        .then(function(res){
            if(res.ok) {
              localStorage.setItem('token', res.body.token);
              localStorage.setItem('userId', res.body.userId);
              localStorage.setItem('userName', res.body.name);
              localStorage.setItem('isAdmin', res.body.isAdmin)
              window.location.href = 'http://localhost:8080/wall'
            }
            console.log(res),
          function(error){
            console.log(error)
          }
        })
    }
      
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
