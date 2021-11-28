<template>
  <div id="wall">
    <h1 class="text-primary text-center">Dernières Publications</h1>

      <div class="card col-10 m-auto mt-1 mb-1" v-for="item of allPost" :key="item.id">
        <p><span class="font-weight-bold">{{item.userName}} </span> Posté le {{item.createdAt}}.</p>
        <h5 class="card-title text-center p-2 mt-1">{{item.titre}}</h5>
        <div class="card-body d-flex flex-column">
          <img class="w-75 m-auto" :src="item.imageUrl" alt="">
          <p class="card-text">{{ item.description }}</p>
          <div class="card-text">
            <div>
              <p class="card-text">Nombre de commentaires</p>
            </div>
            <div class="d-flex justify-content-end">
              <p class="m-2">{{item.like}}</p>
              <p class=" text-primary m-2"><i class="far fa-thumbs-up"></i></p>
              <p class="m-2" >{{item.dislike}}</p>
              <p class=" text-danger m-2"><i class="far fa-thumbs-down"></i></p>
              
            </div>
            <div class="d-flex justify-content-around">
              <router-link :to="{path :'/modify' , query: { id: item.id }}" class="btn btn-outline-primary text-primary font-weight-bold">Modifier</router-link>
              <router-link :to="{path :'/article' , query: { id: item.id }}" class="btn btn-outline-primary text-primary font-weight-bold">Voir Plus</router-link>
            </div>
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
      allPost : "",
      authorization : false,
      postId : [], 
      userId : []
    }
  },
  computed : {
     
  },
  methods : {
    //A voir pour faire marcher avec v-if
    isAuthorized : function(){
      for(const data of this.allPost) {
        console.log(data.userId)
        if(localStorage.getItem('userId') == data.userId){
          return this.authorization = true;
        }
      }
    },
    //A peaufiner pour appliquer
     dateSplitCreatedAt : function(date){
          date.split('T'[0])
      },
  },
  created(){
     this.$http.get('http://localhost:3000/api/post',
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }})
                .then(function(response){
                     let allPost = response.body.post
                     this.allPost = allPost 
                     console.log(this.allPost)
                     for (const data of this.allPost){
                          this.userId.push(data.userId)
                          console.log(this.postId + " " + this.userId)
                      }
                    
                    },
                    function(error){
                        console.log(error)
                });
   
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
