<template>
  <div>
    <h1>{{ article.title }}</h1>
    <p>{{ article.body }}</p>
    <router-link to="/">Retour à la liste des articles</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      article: {}
    };
  },
  mounted() {
    const articleId = this.$route.params.id;
    axios.get(`https://jsonplaceholder.typicode.com/posts/${articleId}`)
        .then(response => {
          this.article = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de l\'article:', error);
        });
  }
};
</script>
