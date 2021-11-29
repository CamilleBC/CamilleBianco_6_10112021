<template>

  <div > 
      <form enctype="multipart/form-data">      
      <div class="form-group">
        <h3 class="text-center text-danger pb-4 pt-4">Article à poster</h3>

      <div class="form-group p-2">
          <input type="text" class="form-control" v-model="titre" id="titre" placeholder="Titre de l'article" required='required'>
      </div>

      <div class="d-flex flex-column form-group p-2">
          <label for="fileImage" class="font-weight-bold m-2">Sélectionnez votre image</label>
          <input type="file" @change="getUrlFile()" ref="file" class="col-lg-3 col-sm-5 " accept=".png, .jpg, .jpeg" id="fileImage"  required='required' name="image">
          <img id="image" :src="img">
      </div>

  </div>

      <div class="form-group p-2">
          <textarea name="description" class="col" v-model="description" id="descritpion" rows="10" placeholder="Description"></textarea>
      </div>
      <a @click="createPost()" class="btn btn-secondary w-25 m-2">
          Valider
      </a>
   </form>
  </div>
</template>

<script>
export default {
    name : 'Send',
    data (){
        return {
            img :"",
            titre :"",
            description : "",
            imageFile:""
        }

    },
    methods : {
        getUrlFile : function(){
           this.imageFile= this.$refs.file.files[0]
           this.img = URL.createObjectURL(this.imageFile)
        },    
        createPost : function(){
            const formData = new FormData();
            formData.append("image", this.imageFile); 
            formData.append("titre", this.titre);
            formData.append("description", this.description);
            formData.append('userName', localStorage.getItem('userName'))        
            this.$http.post('http://localhost:3000/api/post', formData, 
            {headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }})
                .then(function(res){
                    if(res.ok){
                        window.location.href = 'http://localhost:8080/wall'
                    }
                    console.log(res.body)
                },
                function(error){
                    console.log(error)
                })
        }
    }
}
</script>