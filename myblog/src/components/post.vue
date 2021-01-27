<template>
  <div>
      <h1>{{post.title}}</h1>
      <span class="date">posted@ {{new Date(post.updateTime)}}</span>
      <div class="content" v-html="post.passage">
      </div>
      
      <span style="float:right"><button class="delete" v-on:click="delPost">DELETE</button></span> 
      <span style="float:right"><button class="edit" v-on:click="editPost">EDIT</button></span>
  </div>
</template>

<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
export default {
    name:'post',
    data(){
        return {
            post:{}
        };
    },
    created(){
        var postid=this.$route.params.id;
        var req_path='http://localhost:8080/api/article/id/'+postid;
        
        this.$axios.get(req_path)
  	    .then((response)=> {
                // handle success
                
    	        this.post=response.data;
    	        this.$nextTick(()=>{
    	            document.querySelectorAll('pre').forEach(block => {
                        hljs.highlightBlock(block);
                    });
    	        });
    	        
            })
	    .catch((error)=> {
	        // handle error
	        
	            this.$router.push('/404');
	        
	        console.log(error);
	    })
            .then( ()=> {
               // always executed
           });
    },
    methods:{
        delPost(){
            var b=confirm("Delete the post permanently?");
            if(b){
                var id=this.$route.params.id;
                var req_path='http://localhost:8080/api/article/id/'+id;
                this.$axios.delete(req_path)
                    .then((res)=>{this.$router.push('/');})
                    .catch((err)=>{console.log(err);});
            }
        },
        editPost(){
            this.$router.push({name:'editpost',params:{id:this.$route.params.id,title:this.post.title,content:this.post.passage}});
        }
    }

}
</script>

<style>
    
    .date {
        color:#6E6E6E;
    }
    .content {
        margin-top:0.5em;
        min-height:24em;
    }
    .edit {
    	font-weight:bold;
        cursor:pointer;
        background-color: #00A656;
    	border: none;
    	color: white;
    	text-align: center;
    	text-decoration: none;
    	display: inline-block;
    	font-size: 15px;
    	padding: 4px 20px;
    }
    .edit:hover {
        background-color: #009952;
    }
    .delete {
    	font-weight:bold;
        cursor:pointer;
        border: none;
        color: red;
    	text-align: center;
    	text-decoration: none;
    	display: inline-block;
    	font-size: 15px;
    	padding: 4px 20px;
    }
    .delete:hover {
        background-color: red;
        color: white;
    }
</style>
