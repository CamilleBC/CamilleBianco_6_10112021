<template>
  <div id="wall">
    <h1 class="text-primary text-center">Dernières Publications</h1>

      <div class="card col-10 m-auto mt-1 mb-1">
        <p><span class="font-weight-bold">{{user}}</span> Posté le {{date}}.</p>
        <h5 class="card-title text-center p-2 mt-1">Titre de l'article</h5>
        <div class="card-body d-flex flex-column">
          <p class="card-text">Article avec photo et texte</p>
          <div class="card-text">
            <div>
              <a href="">Commentaires limités au nombre de 3</a>
              <button>Voir plus</button>
            </div>
            <textarea id="comments" name="comments" rows='5' class="col" placeholder="Ecrire mon commentaire ...">
            </textarea>
            <div class="d-flex justify-content-center">
              <button >Envoyer</button>
            </div>
            <div class="d-flex justify-content-end">
              <p class="mt-3">0</p>
              <button id = 'like' class=" btn btn-primary m-2"><i class="far fa-thumbs-up"></i></button>
              <p class="mt-3" >0</p>
              <button class="btn btn-danger m-2"><i class="far fa-thumbs-down"></i></button>
            </div>
            <button>Effacer</button>
          </div>
        </div>
      </div>

  </div>  
</template>

<script>

export default {
  name: 'Wall',
  data (){
    return {
      user : 'Thomas Robert',
      date : '13/12/21'
    }
  },
  methods : {
    generateWall : function(){
            this.$http.get('MonUrl')
                .then(
                    //Succès callback
                    function(response){
                        return response.json()
                        .then(function(resJson){
                            console.log(resJson);
                        })
                    },
                    //Erreur callback
                    function(response){
                        console.log(response)

                })
        },     
  }
  
}
</script>
<style scoped lang='scss'>

a{
  color: black;
}
a:hover{
  text-decoration: none;
  color : black;
  }
</style>
