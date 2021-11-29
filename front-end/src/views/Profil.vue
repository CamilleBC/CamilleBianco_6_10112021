<template>
           
      <div class="card form-group">
        <h3 class="text-center text-danger pb-4 pt-4">Profil de : <br> <span class="font-weight-bold font-italic"> {{ name }} </span></h3>

      <div class="form-group p-2">
          <label for="email">{{email}}</label>
          <input type="text" class="form-control" id="email" v-model="newEmail" placeholder="Nouveau mail..." required='required'>
          <button @click="modifyEmail()" class="btn btn-warning col-lg-1 col-4 mt-2">
                Modifier
          </button>
      </div>

    <div class="form-group p-2">
          <label for="password">**********</label>
          <input type="password" class="form-control" v-model ="newPassword" id="password" placeholder="Nouveau mot de passe..." required='required'>
           <button @click="modifyPassword()" class="btn btn-warning col-lg-1 col-4 mt-2">
                Modifier
          </button>
      </div>

        <div class="d-flex justify-content-end">
            <button @click="deleteUser()"  class="btn btn-danger col-lg-2 col-4 m-2">
                Supprimer
            </button>
        </div>
    
    </div>

</template>

<script>
export default ({
    name : 'Profil',
    data (){
        return {
            name : "",
            email : "",
            isAdmin : false,
            newEmail : "",
            newPassword : ""
        }
    },
    methods : {

        modifyEmail : function(){
        if(this.email !== this.newEmail){
        const data = { email : this.newEmail }
        this.$http.put('http://localhost:3000/api/user/profil/email',
            data,
            {headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }})
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
        else{
            console.log('Email identique')
        }
    },

    modifyPassword : function(){
        const data = { password : this.newPassword }
        console.log(data)
        this.$http.put('http://localhost:3000/api/user/profil/password',
            data,
            {headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }})
                .then(function(res){
                    console.log(res.body)
                    if(res.ok){
                        window.location.reload()
                    }
                },
                function(error){
                    console.log(error)
                })
    },

        deleteUser : function(){
            this.$http.delete('http://localhost:3000/api/user/profil', 
                {headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }})
                .then(function(res){
                    if(res.ok){
                        localStorage.clear();
                        window.location.href = 'http://localhost:8080/login'
                    }
                    console.log(res),
                    function(error){
                        console.log(error)
                    }
                })
        },

        getUser : function(){
            this.$http.get('http://localhost:3000/api/user/profil',{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(function(res){
                    this.name = res.body.user.name;
                    this.email = res.body.user.email;
                    this.isAdmin = res.body.user.isAdmin;
                    console.log(res.body)             
                },
                    function(error){
                        console.log(error)
                    })
        }
    },

    beforeMount(){
        this.getUser()
    }
})
</script>

<style scoped>
.btn {
    font-size: 1.2rem;
}
</style>