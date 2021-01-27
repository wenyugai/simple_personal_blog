<template>
  <div class="notfound_container">
      <h1>404 Not Found</h1>
      <div>The requested URL was not found on this server.</div>
  </div>
</template>

<script>

export default {
    name:'notfound'

}
</script>

<style>
    .notfound_container h1 {
        color:red;
    }
    .notfound_container div {
        margin-top:0.5em;
    }
</style>
