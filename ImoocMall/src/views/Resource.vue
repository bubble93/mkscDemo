<template>
    <div id="app" class="container">
        <h1>vue-resource插件讲解</h1>
        <a href="javascript:;" class="btn btn-primary" @click="get">Get请求</a>
        <a href="javascript:;" class="btn btn-primary">Post请求</a>
        <a href="javascript:;" class="btn btn-primary">JSONP请求</a>
        <br>
        <span>{{msg}}</span>
    </div>
</template>
<script>
    export default {
        el: "#app",
        data:{
            msg:''
        },
        methods:{
            get: function(){
                this.$http.get("../../../package.json", {
                    params:{
                        userId: "101"
                    },
                    headers:{
                        token:"abcd"
                    }
                }).then(res=>{
                    this.msg = res.data;
                }, error=>{
                    this.msg = error;
                });
            }
        }
    }
</script>