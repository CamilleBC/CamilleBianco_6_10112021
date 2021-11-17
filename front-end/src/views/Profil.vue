<template>
           
      <div class="card form-group">
        <h3 class="text-center text-primary">Votre Profil</h3>

      <div class="form-group p-2">
          <label for="">User name</label>
          <input type="text" class="form-control" id="Nom" placeholder="Modifiez votre nom..." required='required'>
      </div>

      <div class="form-group p-2">
          <label for="email">User email</label>
          <input type="text" class="form-control" id="email" placeholder="Modifiez votre email..." required='required'>
      </div>

      <div class="form-group p-2">
          <label for="email">**********</label>
          <input type="text" class="form-control" id="email" placeholder="Modifiez votre mot de passe..." required='required'>
      </div>

        <div class="d-flex justify-content-end">
            <button id='buttonFormulaire'  class="btn btn-secondary col-1 m-2">
                Modifier
            </button>
            <button id='buttonFormulaire'  class="btn btn-danger col-1 m-2">
                Supprimer
            </button>
        </div>
    
    </div>

</template>