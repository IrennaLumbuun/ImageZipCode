<template>
    <div>
        <form @submit="postData" method="post">
            <input type="text" name="base64" placeholder="base64" v-model="post.base64"> <br> <br> 
            <button type="submit">Post</button>
        </form>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
export default {
    name: "PostComponent",
    data(){
        return {
            post:{
                base64:""
            }
        }
    },
    methods:{
        postData(e)
        {
            console.log(this.post)
            this.axios.post('http://localhost:8081/post', this.post)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err.response);
            });
            e.preventDefault();
        }
    }
}
</script>
