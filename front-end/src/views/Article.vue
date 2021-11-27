<template>
  <div id="wall">
    <h1 class="text-primary text-center">Dernières Publications</h1>

      <div class="col-10 m-auto mt-1 mb-1">
        <div class="card">
        <p><span class="font-weight-bold">{{post.userName}}</span> Posté le {{post.createdAt.split('T')[0]}}.</p>
        <h5 class="card-title text-center p-2 mt-1">{{post.titre}}</h5>
        <div class="card-body d-flex flex-column">
          <img class="w-75 m-auto" :src="post.imageUrl" alt="">
          <p class="card-text">{{post.description}}</p>
        </div>
         <div class="d-flex justify-content-end">
              <p class="mt-3">0</p>
              <button id = 'like' class=" btn btn-primary m-2"><i class="far fa-thumbs-up"></i></button>
              <p class="mt-3" >0</p>
              <button class="btn btn-danger m-2"><i class="far fa-thumbs-down"></i></button>
            </div>
        </div>
                <ul>
                    <div>
                        <label for="comments">Ecrire votre commentaire :</label>
                        <textarea v-model="content" id="comments" name="comments" rows='3' class="col" placeholder="Ecrire mon commentaire ...">
                        </textarea>
                        <div class="text-right">
                            <button @click="createComment()">Envoyer</button>
                        </div>
                    </div>
                    <li class="card" v-for="item of allComments" :key="item.id">
                        <p class="card-title">{{ item.userName }} : posté le {{ item.createdAt.split('T')[0]}} .</p>
                        <div class="card-body">{{ item.content }}</div>
                        <div class="d-flex ">
                            <div class="col">
                                <button id="buttonModify" @click="toggleModifyComment()" class="text-white btn btn-warning m-2">Modifier</button>
                                <div id="modifyComment"  style="display:none" >
                                    <textarea name="modifyComment" id="modify" class="col" rows="10" :placeholder='item.content' v-model="modifyContent">
                                        
                                    </textarea>
                                    <div class="d-flex justify-content-end">
                                        <button @click=" modifyComment(item.id)" class="btn btn-warning">Valider la modification</button>
                                    </div>
                                </div>
                                <button id="buttonDelete" @click="deleteComment(item.id)" class="text-white btn btn-danger m-2">Supprimer</button>
                            </div>
                            
                        </div>
                        <div class="d-flex ">
                        
                        </div>
                    </li>
                </ul>
            </div>
          </div>  
</template>

<script>


export default ({
    name : 'Article',
    data (){
        return {
            id : parseFloat(window.location.search.substr(4)),
            post : "",
            content : "",
            modifyContent : "",
            allComments : []

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
                        console.log(this.allComments)
                    }
                }
            },
            function(error){
                console.log(error)
            })
    },
    methods :{
        toggleModifyComment : function(){
            const modifyComment = document.getElementById('modifyComment');
            if (modifyComment.style.display !== 'none') {
                modifyComment.style.display = 'none';
            }
            else {
            modifyComment.style.display = 'block';
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
        }
    }
})
</script>