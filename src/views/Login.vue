<template>

    <section class="vh-100">
      
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="row justify-content-center">
              
              <div class="col-lg-6">

                <p class="text-danger h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Connexion</p>

                <form class="mx-1 mx-md-4">


                  <div class="d-flex flex-row align-items-center mb-4">
                    <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="email">Email</label>
                        <input type="email" id="email" class="form-control" />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="Mot de passe">Mot de passe</label>
                      <input type="password" id="Mot de Passe" class="form-control" />
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg">Connecter</button>
                  </div>
                </form>

              </div>
            </div>
        </div>
      </div>
  </div>
</section>

</template>

<style scoped lang='scss'>

section {
  background-color:  #eee;
 }

</style>