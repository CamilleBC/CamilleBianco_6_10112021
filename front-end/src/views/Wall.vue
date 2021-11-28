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
            <div class="d-flex justify-content-end">
              <p class="m-2">{{item.like}}</p>
              <p class=" text-primary m-2"><i class="far fa-thumbs-up"></i></p>
              <p class="m-2" >{{item.dislike}}</p>
              <p class=" text-danger m-2"><i class="far fa-thumbs-down"></i></p>
              
            </div>
            <div v-if="item.authorization" class="d-flex justify-content-around">
              <router-link :to="{path :'/modify' , query: { id: item.id }}" class="btn btn-outline-primary text-primary font-weight-bold">Modifier</router-link>
              <router-link :to="{path :'/article' , query: { id: item.id }}" class="btn btn-outline-primary text-primary font-weight-bold">Voir Plus</router-link>
            </div>
            <div v-else class="d-flex justify-content-around">
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
      allPost : [],
      userId : localStorage.getItem('userId'),
      authorization: [],
    }
  },
 
  methods : {
    //Authorisation d'accès au fonctionnalité modifier et supprimer
    isAuthorized : function(){
      for (const data of this.allPost ){
          if(this.userId == data.userId || data.isAdmin == true){
            let authorization = {authorization : true}
            Object.assign(data, authorization)
            
          }
          else{
            let authorization = {authorization : false}
            Object.assign(data, authorization)
          }         
        }
      },
    
    //Changer la date 
     dateSplitCreatedAt : function(){
       for (const data of this.allPost){
        const useDate = data.createdAt.split('T')[0]
        const splitDate = useDate.split('-')
        const year = splitDate[0]
        const month = splitDate[1]
        const day = splitDate[2]
        const frenchDate = day + '/'+ month +'/' + year
        
        let newDate = {createdAt : frenchDate}
        Object.assign(data, newDate)
        }
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
                     this.allPost = allPost.reverse() 
                     console.log(this.allPost)
                      this.isAuthorized()   
                      this.dateSplitCreatedAt()             
                    },
                    function(error){
                        console.log(error)
                });
    },
    
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
