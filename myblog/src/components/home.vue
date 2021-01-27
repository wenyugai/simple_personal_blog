<template>
    <div>
        <div><h1 style="font-size:30px">Home page, you can see all your posts here.</h1></div>
        <div class="posts">
            <ul>
                <li v-for="(post,index) in posts" :key="post._id" v-on:click="clickLi(post._id)">
                    <span class="index">{{(cur-1)*limit+index+1}}</span><span>{{post.title}}</span>
                    <span class="date">posted@ {{new Date(post.updateTime).toDateString()}}</span>
                </li>
            </ul>
        </div>
        
        <div>
        <ul class="mo-paging">
		<li 
		:class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : cur === 1}]"
		@click="prev">prev</li>
		
        	<li
        	:class="['paging-item', 'paging-item--first', {'paging-item--disabled' : cur === 1}]"
        	@click="first">first</li>
        
        	<li
        	:class="['paging-item', 'paging-item--more']"
        	v-if="showPrevMore">...</li>

        	<li
        	:class="['paging-item', {'paging-item--current' : cur === pager}]"
        	v-for="pager in pagers"
        	@click="go(pager)">{{ pager }}</li>

        	<li
        	:class="['paging-item', 'paging-item--more']"
        	v-if="showNextMore">...</li>
        
        
		<li
		:class="['paging-item', 'paging-item--last', {'paging-item--disabled' : cur === pages}]"
		@click="last">last</li>

        
		<li
		:class="['paging-item', 'paging-item--next', {'paging-item--disabled' : cur === pages}]"
		@click="next">next</li>
	</ul>
       </div>
       
       
        
        
    </div>
</template>

<script>
export default {
    name:'home',
    data(){
        return {
            allposts:[],
            cur : 1,     //current page
            limit : 10,  //articles per page
            size : 1,    //total number of articles
            showPrevMore : false,
            showNextMore : false,
            perPages :5  //number of pages for selection (1 2 3 4 5 ..next last)
        };
    },
    props: {
        
    },
    mounted(){
        //window.vue=this;
        this.$axios.get('api/article/list')
  	    .then((response)=> {
                // handle success
    	        this.allposts=response.data;
    	        this.size=this.allposts.length;
            })
	    .catch((error)=> {
	        // handle error
	        console.log(error);
	    })
            .then( ()=> {
               // always executed
           });
    },
    methods: {
        clickLi(id){
            this.$router.push('/post/'+id);
        },
        prev(){
            if (this.cur > 1) {
                this.go(this.cur - 1)
            }
        },
        next(){
            if (this.cur < this.pages) {
                this.go(this.cur + 1)
            }
        },
        first(){
            if (this.cur !== 1) {
                this.go(1)
            }
        },
        last(){
            if (this.cur != this.pages) {
                this.go(this.pages)
            }
        },
        go (page) {
            if (this.cur !== page) {
                this.cur = page
            }
        }
    },
    computed : {
        posts(){
            var res=this.allposts.slice((this.cur-1)*this.limit,this.cur*this.limit);
            return res;
        },
        
        pages(){
            return Math.ceil(this.size / this.limit)
        },
        pagers () {
            const array = []
            const perPages = this.perPages
            const pageCount = this.pages
            let current = this.cur
            const _offset = (perPages - 1) / 2

            
            const offset = {
                start : current - _offset,
                end   : current + _offset
            }

            //-1, 3
            if (offset.start < 1) {
                offset.end = offset.end + (1 - offset.start)
                offset.start = 1
            }
            if (offset.end > pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            if (offset.start < 1) offset.start = 1

            this.showPrevMore = (offset.start > 1)
            this.showNextMore = (offset.end < pageCount)

            for (let i = offset.start; i <= offset.end; i++) {
                array.push(i)
            }

            return array
        }
    }
    
}
</script>

<style>
    .posts {
        
        min-height:25em;
    }
    .posts .date {
        color:#6E6E6E;
        float:right;
    }
    /*
    .posts a{
        text-decoration:none;
        color: #405061;
    }
    */
    .posts a:hover {
        color: #607D8B
        
    }

    .posts ul {
        list-style-type: none;
        margin: 0 0 2em 0;
	    
	padding: 0;
	width: 50em;
    }
    
	
	.posts li {
	    cursor:pointer;
	    color: #405061;
	    position: relative;
	    left: 0;
	    background-color: #EEE;
	    margin: .5em;
	    padding: .3em 0;
	    height: 1.6em;
	    border-radius: 4px;
	}
	.posts li:hover {
	    background-color: #BBD8DC !important;
	    color: #607D8B;
	    left: .1em;
	}
	
	
	.posts .index {
	    display: inline-block;
	    font-size: small;
	    color: white;
	    padding: 0.8em 0.7em 0 0.7em;
	    background-color: #405061;
	    line-height: 1em;
	    position: relative;
	    left: -1px;
	    top: -4px;
	    height: 1.8em;
	    margin-right: .8em;
	    border-radius: 4px 0 0 4px;
	}
	
.mo-paging {
  display: inline-block;
  padding: 0;
  margin: 1rem 0;
  font-size: 0;
  list-style: none;
  user-select: none;
}
.mo-paging > .paging-item {
  display: inline;
  font-size: 14px;
  position: relative;
  padding: 6px 12px;
  line-height: 1.42857143;
  text-decoration: none;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-left: -1px;
  cursor: pointer;
  color: #0275d8;
}
.mo-paging > .paging-item:first-child {
  margin-left: 0;
}
.mo-paging > .paging-item:hover {
  background-color: #f0f0f0;
  color: #0275d8;
}
.mo-paging > .paging-item.paging-item--disabled, .mo-paging > .paging-item.paging-item--more {
  background-color: #fff;
  color: #505050;
}
.mo-paging > .paging-item.paging-item--disabled {
  cursor: not-allowed;
  opacity: 0.75;
}
.mo-paging > .paging-item.paging-item--more, .mo-paging > .paging-item.paging-item--current {
  cursor: default;
}
.mo-paging > .paging-item.paging-item--current {
  background-color: #0275d8;
  color: #fff;
  position: relative;
  z-index: 1;
  border-color: #0275d8;
}




</style>
