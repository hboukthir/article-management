<template>
  <div>
    <h1>{{ message }}</h1>

    <!-- Formulaire pour ajouter un utilisateur -->
    <div>
      <h2>Add User</h2>
      <input v-model="newUserName" placeholder="User Name" />
      <button @click="addUser">Add User</button>
    </div>

    <!-- Formulaire pour ajouter un article -->
    <div>
      <h2>Add Article</h2>
      <select v-model="selectedUserId">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <input v-model="newArticleTitle" placeholder="Article Title" />
      <textarea v-model="newArticleContent" placeholder="Article Content"></textarea>
      <button @click="addArticle">Add Article</button>
    </div>

    <!-- Affichage des utilisateurs et de leurs articles -->
    <div>
      <h2>Users and Articles</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          <strong>{{ user.name }}</strong>
          <button @click="startEditingUser(user)">Edit</button>
          <button @click="deleteUser(user.id)">Delete</button>

          <!-- Formulaire pour modifier un utilisateur -->
          <div v-if="editingUserId === user.id">
            <input v-model="editingUserName" placeholder="Edit User Name" />
            <button @click="saveUser(user.id)">Save</button>
            <button @click="cancelEditingUser">Cancel</button>
          </div>

          <ul>
            <li v-for="article in user.articles" :key="article.id">
              <em>{{ article.title }}</em>: {{ article.content }}
              <button @click="editArticle(article.id)">Edit</button>
              <button @click="deleteArticle(article.id)">Delete</button>

              <!-- Formulaire pour modifier un article -->
              <div v-if="editingArticleId === article.id">
                <input v-model="editingArticleTitle" placeholder="Edit Article Title" />
                <textarea v-model="editingArticleContent" placeholder="Edit Article Content"></textarea>
                <button @click="saveArticle(article.id)">Save</button>
                <button @click="cancelEditingArticle">Cancel</button>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import User from '@/models/User'
import Article from '@/models/Article'

export default {
  name: 'App',
  setup() {
    const store = useStore()

    const message = computed(() => store.state.message)
    const users = computed(() => User.query().with('articles').get())
    const newUserName = ref('')
    const newArticleTitle = ref('')
    const newArticleContent = ref('')
    const selectedUserId = ref(null)

    // État pour l'édition
    const editingUserId = ref(null)
    const editingArticleId = ref(null)
    const editingUserName = ref('')
    const editingArticleTitle = ref('')
    const editingArticleContent = ref('')

    // Méthode pour ajouter un utilisateur
    const addUser = () => {
      if (newUserName.value) {
        User.insert({data: {name: newUserName.value}})
        newUserName.value = ''
      }
    }

    // Méthode pour démarrer l'édition d'un utilisateur
    const startEditingUser = (user) => {
      editingUserId.value = user.id
      editingUserName.value = user.name
    }

    // Méthode pour enregistrer un utilisateur modifié
    const saveUser = (userId) => {
      const user = User.find(userId);
      if (user) {
        user.$update({ name: editingUserName.value });
        editingUserId.value = null; // Annuler l'édition
      }
    }

    // Méthode pour annuler l'édition d'un utilisateur
    const cancelEditingUser = () => {
      editingUserId.value = null
    }

    // Méthode pour rediriger vers la page d'édition de l'article
    const editArticle = (id) => {
      editingArticleId.value = id
      const article = Article.find(id)
      editingArticleTitle.value = article.title
      editingArticleContent.value = article.content
    }

    // Méthode pour enregistrer un article modifié
    const saveArticle = (articleId) => {
      const article = Article.find(articleId);  // Trouver l'article par ID
      if (article) {
        article.$update({ title: editingArticleTitle.value, content: editingArticleContent.value });  // Mettre à jour l'article
        editingArticleId.value = null;  // Annuler l'édition
      }
    }


    // Méthode pour annuler l'édition d'un article
    const cancelEditingArticle = () => {
      editingArticleId.value = null
    }

    // Méthode pour supprimer un utilisateur
    const deleteUser = (id) => {
      User.delete(id)
    }

    // Méthode pour ajouter un article
    const addArticle = () => {
      if (selectedUserId.value && newArticleTitle.value && newArticleContent.value) {
        Article.insert({
          data: {
            title: newArticleTitle.value,
            content: newArticleContent.value,
            user_id: selectedUserId.value
          }
        })
        newArticleTitle.value = ''
        newArticleContent.value = ''
      }
    }

    // Méthode pour supprimer un article
    const deleteArticle = (id) => {
      Article.delete(id)
    }

    return {
      message,
      users,
      newUserName,
      newArticleTitle,
      newArticleContent,
      selectedUserId,
      editingUserId,
      editingArticleId,
      editingUserName,
      editingArticleTitle,
      editingArticleContent,
      addUser,
      addArticle,
      startEditingUser,
      saveUser,
      cancelEditingUser,
      editArticle,
      saveArticle,
      cancelEditingArticle,
      deleteUser,
      deleteArticle,
    }
  }
}
</script>
