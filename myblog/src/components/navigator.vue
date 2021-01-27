<template>
    <div class="site-navigator">
        <div class="site-navigator-wrap">
            <div class="site-navigator-inside">
                <div class="site-branding">
                    <p class="profile">
                        <router-link to="/">
                            <img src="../assets/logo.png" alt="avatar">
                        </router-link>
                    </p>
                    <div class="site-identity">
                        <h1>Wenyu</h1>
                        <p>Hello World!</p>
                    </div>
                    
                    <div class="site-nav-inside">
                        <ul class="menu">
                            <li class="menu-item"><router-link to="/home">HOME</router-link></li>
                            <li class="menu-item"><router-link to="/newpost">NEW POST</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
</template>

<script>
export default {
    name:'navigator'
}
</script>

<style scoped>
    a {
        text-decoration:none;
    }
    ul {
        padding:0;
    }
    li {
        list-style:none;
    }
    .site-navigator {
        background: #1d1d1d;
        color:#fff;
        height:100%;
        left: 0;
        position:fixed;
        text-align:center;
        top:0;
    }
    .profile img {
        width:100px;
        border:2px solid #d4a259;
        border-radius: 10%;
    }
    .site-identity{
        padding-bottom: 1.6em;
    }
    .site-identity h1 {
        font-size: 30px;
        line-height: 1;
    }
    .site-identity p {
        font-size: 12px;
        color: rgb(102,102,102);
    }
    .menu {
        font-size:0.8rem;
        color: #aaa;
        line-height: 1.5;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        border-bottom: 1px solid #333;
    }
    .menu-item {
    	border-top: 1px solid #333;
    	padding: 0.5rem 0;
    }
    .menu-item a {
    	color: #aaa;
    	cursor: pointer;
    }
    .menu-item a:hover {
    	color: #d4a259;
    }
    .menu-item-select {
    	color: #d4a259 !important;
    }
    @media only screen and (min-width:1001px){
    	.site-navigator {
    	    width:300px;
    	}
    	.site-navigator-inside {
    	    padding-left:30px;
    	    padding-right:30px;
    	    padding-bottom:3.33333em;
    	    padding-top: 3.33333em;
    	}
    }
    @media only screen and (min-width: 801px) and (max-width: 1001px){
    	.site-navigator {
    	    width:30vw;
    	}
    	.site-navigator-inside {
    	    padding-bottom:3.33333em;
    	    padding-top: 3.33333em;
    	}
    }
    @media only screen and (max-width:800px){
    	.site-navigator {
    	    width:30vw;
    	}
    	.profile img {
    	 width:65px;
    	}
    	.site-navigator-inside {
    	    padding-bottom:3.33333em;
    	    padding-top: 3.33333em;
    	}
    }
    .site-navigator-wrap {
    	height: 100%;
    	overflow: auto;
    	-weblit-overflow-scrolling: touch;
    	position:relative;
    }
    
</style>
