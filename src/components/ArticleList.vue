<!-- src/components/ArticleList.vue -->
<template>
  <div>
    <h1>Liste des Articles</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        {{ article.title }}
        <button @click="removeArticle(article.id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['allArticles']),
    articles() {
      return this.allArticles;
    }
  },
  methods: {
    removeArticle(id) {
      this.$store.commit('REMOVE_ARTICLE', id); // Appel de la mutation pour supprimer l'article
    }
  }
};
</script>
