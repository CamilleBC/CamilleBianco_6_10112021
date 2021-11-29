<template>
  <div id="wall">
    <h1 class="text-danger text-center pb-4 pt-4">Article sélectionné</h1>

      <div class="col-10 m-auto mt-1 mb-1">
        <div class="card">
        <p><span class="font-weight-bold">{{post.userName}} : </span> Posté le {{post.frenchDate}}</p>
        <h2 class="card-title text-center p-2 mt-1">{{post.titre}}</h2>
        <div class="card-body d-flex flex-column">
          <img class="w-75 m-auto" :src="post.imageUrl" alt="Image de l'article">
          <p class="card-text m-auto p-2 h4 font-weight-light">{{post.description}}</p>
        </div>
         <div class="d-flex justify-content-end">
              <p class="mt-3">{{post.like}}</p>
              <button id="like" @click="updateLike()" data-value="1" class=" btn btn-primary m-2" :disabled='disableLike' aria-label="like"><i class="far fa-thumbs-up"></i></button>
              <p class="mt-3" >{{post.dislike}}</p>
              <button id="dislike" @click="updateDislike()" class="btn btn-danger m-2" data-value="-1" :disabled='disableDislike' aria-label="dislike"><i class="far fa-thumbs-down"></i></button>
            </div>
        </div>
                <div>
                    <div>
                        <label class=" mt-2" for="comments">Ecrire votre commentaire :</label>
                        <textarea v-model="content" id="comments" name="comments" rows='3' class="col" placeholder="Ecrire mon commentaire ...">
                        </textarea>
                        <div class="text-right">
                            <button class="btn btn-outline-primary text-primary font-weight-bold m-2" @click="createComment()">Envoyer</button>
                        </div>
                    </div>
                    <div class="border border-primary rounded">
                    <h3 class="m-4 ">Commentaires</h3>
                    <div class="card m-2 mt-4 mb-4" v-for="item of allComments" :key="item.id">
                        <p class="font-italic "><span class="font-weight-bold ">{{ item.userName }} </span>: posté le {{ item.createdAt}}</p>
                        <div>{{ item.content }}</div>
                        <div  class="d-flex ">
                            <div v-if="item.authorization" class="col">
                                <button @click="toggleModifyComment('modifyComment'+item.id)" class="btn btn-warning m-2">Modifier</button>
                                <div :id="'modifyComment'+item.id"  style="display:none" >
                                    <textarea class="col" rows="5" :placeholder='item.content' v-model="modifyContent">
                                        
                                    </textarea>
                                    <div class="d-flex justify-content-end">
                                        <button @click=" modifyComment(item.id)" class="btn btn-warning">Valider la modification</button>
                                    </div>
                                </div>
                                <button @click="deleteComment(item.id)" class="btn btn-danger m-2">Supprimer</button>
                            </div>
                            
                        </div>
                        <div class="d-flex ">
                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
          </div>  
</template>

<script>


export default ({
    name : 'Article',
    data (){
        return {
            id : parseFloat(window.location.search.substr(4)),
            date : "",
            post : "",
            content : "",
            disableLike : false,
            disableDislike : false,
            modifyContent : "",
            allComments : [],
            isAdmin : localStorage.getItem('isAdmin'),
            userId : localStorage.getItem('userId')

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
                this.dateSplitCreatedAt(this.post.createdAt)
            },
            function(error){
                console.log(error)
            });
        this.$http.get('http://localhost:3000/api/comment',
        { 
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(function(response){
                for(const comment of response.body.comment){
                    if(comment.postId == this.id){
                        this.allComments.push(comment)
                        this.isAuthorized()
                        this.allComments = this.allComments.reverse()                       
                        
                    }
                }
                this.dateSplitCreatedAtComments()
            },
            function(error){
                console.log(error)
            })
    },
    methods :{
         dateSplitCreatedAt : function(data){
            const useDate = data.split('T')[0]
            const splitDate = useDate.split('-')
            const year = splitDate[0]
            const month = splitDate[1]
            const day = splitDate[2]
            const date = { frenchDate : day + '/'+ month +'/' + year}
            Object.assign(this.post, date)
            
        },
        dateSplitCreatedAtComments : function(){
            for (const data of this.allComments){
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
        isAuthorized : function(){
        for (const data of this.allComments ){
          if(this.userId == data.userId ){
            let authorization = {authorization : true}
            Object.assign(data, authorization)
            
          }
          else if (this.isAdmin == 'true'){
            let authorization = {authorization : true}
            Object.assign(data, authorization)
          }
          else{
            let authorization = {authorization : false}
            Object.assign(data, authorization)
          }         
        }
      },
      
        toggleModifyComment : function(button){
            const buttonModify = document.getElementById(button);
            if (buttonModify.style.display !== 'none') {
                buttonModify.style.display = 'none';
            }
            else {
                buttonModify.style.display = 'block';
            }
        },
        createComment : function(){
            const comment = {content : this.content, postId : this.id};
            this.$http.post('http://localhost:3000/api/comment', comment,
            { 
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(function(res){
                    if(res.ok){
                        window.location.reload()
                    }
                    console.log(res.body)
                },
                function(error){
                    console.log(error)
                })
        },
        modifyComment : function(id){
                const data ={content : this.modifyContent}
                console.log(data)
                this.$http.put('http://localhost:3000/api/comment/'+ id, data,
                {
                    headers : {
                        Authorization: "Bearer " + localStorage.getItem("token")

                }})
                    .then(function(res){
                         if(res.ok){
                            window.location.reload()
                        }
                        console.log(res.body)
                    },
                    function(error){
                        console.log(error)
                    })

        },
        deleteComment : function(id){
            this.$http.delete('http://localhost:3000/api/comment/'+ id,
            {
                headers : {
                    Authorization: "Bearer " + localStorage.getItem("token")
            }})
                .then(function(res){
                    if(res.ok){
                        window.location.reload()
                    }
                    console.log(res.body)
                },
                function(error){
                    console.log(error)
                })
        },
        updateLike : function(){
            const value = parseFloat(document.getElementById('like').getAttribute('data-value'))
            if(value == 1){
                document.getElementById('like').setAttribute('data-value', 0)
                const data = { like : 1}
                const url ='http://localhost:3000/api/post/' + this.id + '/like'
                this.$http.post(url, data,
                { 
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(function(res){
                        console.log(res.body)
                        if(res.ok){
                            window.location.reload()
                        }
                    },
                    function(error){
                        console.log(error)
                    })
            }
            else {
                document.getElementById('like').setAttribute('data-value', 1)
                const data = { like : 0}
                const url ='http://localhost:3000/api/post/' + this.id + '/like'
                this.$http.post(url, data,
                { 
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(function(res){
                        console.log(res.body)
                        if(res.ok){
                            window.location.reload()
                        }
                    },
                    function(error){
                        console.log(error)
                    })

            }
        },
        updateDislike : function(){
                const value = parseFloat(document.getElementById('dislike').getAttribute('data-value'))
            if(value == -1){
                document.getElementById('dislike').setAttribute('data-value', 0)
                const data = { like : -1}
                const url ='http://localhost:3000/api/post/' + this.id + '/like'
                this.$http.post(url, data,
                { 
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(function(res){
                        console.log(res.body)
                        if(res.ok){
                            window.location.reload()
                        }
                    },
                    function(error){
                        console.log(error)
                    })
            }
            else {
                document.getElementById('dislike').setAttribute('data-value', -1)
                const data = { like : 0}
                const url ='http://localhost:3000/api/post/' + this.id + '/like'
                this.$http.post(url, data,
                { 
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(function(res){
                        console.log(res.body)
                        if(res.ok){
                            window.location.reload()
                        }
                    },
                    function(error){
                        console.log(error)
                    })

            }
        }
    }
})
</script>
<style scoped>
.btn {
    font-size: 1.2rem;
}
</style>