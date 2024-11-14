<template>
  <div>
    <h1>Éditer Article</h1>
    <input v-model="articleData.title" placeholder="Titre de l'article" />
    <textarea v-model="articleData.content" placeholder="Contenu de l'article"></textarea>
    <button @click="updateArticle">Enregistrer les modifications</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import Article from '@/models/Article'

export default {
  name: 'EditArticlePage',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const articleData = ref({})

    onMounted(() => {
      articleData.value = Article.find(props.id) || {}
    })

    const updateArticle = () => {
      store.dispatch('editArticle', { id: props.id, articleData: articleData.value })
          .then(() => alert("Article mis à jour !"))
          .catch(err => console.error(err))
    }

    return {
      articleData,
      updateArticle
    }
  }
}
</script>
