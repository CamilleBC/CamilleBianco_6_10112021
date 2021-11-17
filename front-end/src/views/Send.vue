<template>

  <div class="card">       
      <div class="form-group">
        <h3 class="text-center text-primary">Article à poster</h3>

      <div class="form-group p-2">
          <input type="text" class="form-control" id="titre" placeholder="Titre de l'article" required='required'>
      </div>

      <div class="form-group p-2">
          <input type="text" class="form-control" id="image" placeholder="Url de l'image" required='required'>
      </div>

  </div>

      <div class="form-group p-2">
          <textarea name="description" class="col" id="descritpion" rows="10" placeholder="Description"></textarea>
      </div>
      <a id='buttonFormulaire'  class="btn btn-secondary w-25 m-2">
          Valider
      </a>
   
  </div>
</template>