<template>
  <div class="container">
    <h2>Ajouter un article</h2>
    <form @submit.prevent="addArticle">
      <input v-model="newArticle" placeholder="Nom de l'article" />
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newArticle: ''
    };
  },
  methods: {
    addArticle() {
      // Vérifie si un nom d'article a été saisi
      if (this.newArticle.trim() !== '') {
        // Appelle la mutation Vuex pour ajouter l'article
        this.$store.commit('addArticle', { id: Date.now(), title: this.newArticle });
        this.newArticle = ''; // Réinitialise le champ après l'ajout
        this.$router.push('/'); // Redirige vers la page d'accueil ou la liste des articles
      }
    }
  }
};
</script>
