<template>
  <div>
    <h1>Liste des Articles</h1>
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Article</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="article in articles" :key="article.id">
        <td><router-link :to="{ name: 'ArticlePage', params: { id: article.id }}">
          {{ article.title }}
        </router-link></td>
        <td>{{ article.body }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      articles: []
    };
  },
  mounted() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          this.articles = response.data.slice(10, 20); // Limite à 10 articles pour les tests
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des articles:', error);
        });
  }
};
</script>
