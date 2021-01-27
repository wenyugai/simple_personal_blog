<template>
    <div>
        <div class="prompt">Editing page, modify your post here.</div>
        <div style="margin-bottom:0.5em;">
            <input type="text" v-model="title" placeholder="please type in the title" style="width:220px">
            </input>
        </div>
        <div class="edit_container">
            <quill-editor 
                v-model="content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
            
        </div>
        <span style="float:right;"><button v-on:click="update">UPDATE</button></span>
    </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; 
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
    name:'editpost',
    components: {
        quillEditor
    },
    data() {
        return {
            id:'',
            title:'',
            content: '',
            editorOption: {
                modules:{
                toolbar:[
                          ['bold', 'italic', 'underline', 'strike'],    
                          ['blockquote', 'code-block'],       
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],     
                          [{ 'script': 'sub'}, { 'script': 'super' }],        
                          [{ 'size': ['small', false, 'large', 'huge'] }], 
                          //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],     
                          [{ 'color': [] }, { 'background': [] }],     
                          [{ 'font': [] }],     
                          [{ 'align': [] }],    
                          ['clean'],    
                          ['image']    
                        ]
                }

            }
        }
    },
    created(){
        if(this.$route.params){
            this.id=this.$route.params.id;
            
            this.title=this.$route.params.title;
            this.content=this.$route.params.content;
        }
    },
    methods: {
        onEditorReady(editor) { 
 
        },
        onEditorBlur(){}, 
        onEditorFocus(){}, 
        onEditorChange(){}, 
        update(){
            
            if(this.title.length!=0 && this.content.length!=0){
                this.$axios.post('http://localhost:8080/api/article/new',{id:this.id,title:this.title,content:this.content})
	  	    .then((response)=> {
		        // handle success
	    	        //this.posts=response.data;
	    	        this.$router.push('/post/'+response.data);
	    	        //console.log(response.data);
		    })
		    .catch((error)=> {
			// handle error
			console.log(error);
		    })
		    .then( ()=> {
		       // always executed
		   });
            }
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    }
}
</script>

<style>
    .prompt {
        margin-bottom:0.5em;
    }
    .edit_container {
        margin-bottom:0.5em;
    }
    .ql-editor{
	min-height: 30em;
    }
    
    


</style>
