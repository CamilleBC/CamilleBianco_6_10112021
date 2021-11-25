<template>

  <div class="card"> 
      <form enctype="multipart/form-data">      
      <div class="form-group">
        <h3 class="text-center text-primary">Article à modifier</h3>

      <div class="form-group p-2">
          <label class="font-italic" for="titre"><span class="font-weight-bold font-italic">Votre titre</span> : {{post.titre}}</label>
          <input type="text" class="form-control" v-model="titre" id="titre" placeholder="Modifier le titre..." required='required'>
      </div>

      <div class="d-flex flex-column form-group p-2">
          <label for="oldImage" class="font-weight-bold font-italic">Votre image</label>
          <img :src="post.imageUrl" alt="Votre image">
          <label for="fileImage" class="font-weight-bold m-2">Sélectionnez votre nouvelle image</label>
          <input type="file" @change="getUrlFile()" ref="file" class="col-lg-3 col-sm-5 " accept=".png, .jpg, .jpeg" id="fileImage"  required='required' name="image">
          <img id="image" :src="img">
      </div>

  </div>

      <div class="form-group p-2">
          <p class="font-italic"><span class="font-italic font-weight-bold">Votre description</span> : {{post.description}}</p>
          <textarea name="description" class="col" v-model="description" id="descritpion" rows="10" placeholder="Modifier la description..."></textarea>
      </div>

      <div class="d-flex justify-content-between">
      
      <a @click="modifyPost()" class="text-white fonc-weight-bold btn btn-warning w-25 m-2">
          Modifier
      </a>
      
      <a @click="deletePost()" class="text-white fonc-weight-bold btn btn-danger w-25 m-2">
          Supprimer
      </a>
      </div>
   </form>
  </div>
</template>

<script>
export default {
    name : 'Send',
    data (){
        return {
            id : parseFloat(window.location.search.substr(4)),
            img :"",
            titre :"",
            description : "",
            imageFile:"",
            post : ""
        }

    },
    created(){
        this.$http.get('http://localhost:3000/api/post/' + this.id,
         { 
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        )
            .then(function(response){
                this.post = response.body.post
                console.log(this.post)
            },
            function(error){
                console.log(error)
            })
    },
    methods : {
        getUrlFile : function(){
           this.imageFile= this.$refs.file.files[0]
           this.img = URL.createObjectURL(this.imageFile)
        },    
        modifyPost : function(){
            const formData = new FormData();
            formData.append("image", this.imageFile); 
            if(this.titre.length > 0){
                formData.append("titre", this.titre);
            }
            if(this.description.length > 0) {
                formData.append("description", this.description); 
            }      
            this.$http.put('http://localhost:3000/api/post/' + this.id, formData, 
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
        },
        deletePost : function(){
            this.$http.delete('http://localhost:3000/api/post/' + this.id,
            {headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }})
                .then(function(res){
                    if(res.ok){
                        window.location.href = 'http://localhost:8080/wall'
                    }
                },
                function(error){
                    console.log(error)
                })
        }
    }
}
</script>