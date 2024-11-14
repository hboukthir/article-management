<template>
  <div>
    <h1>Éditer Utilisateur</h1>
    <input v-model="userData.name" placeholder="Nom de l'utilisateur" />
    <button @click="updateUser">Enregistrer les modifications</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import User from '@/models/User'

export default {
  name: 'EditUserPage',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const userData = ref({})

    onMounted(() => {
      userData.value = User.find(props.id) || {}
    })

    const updateUser = () => {
      store.dispatch('editUser', { id: props.id, userData: userData.value })
          .then(() => alert("Utilisateur mis à jour !"))
          .catch(err => console.error(err))
    }

    return {
      userData,
      updateUser
    }
  }
}
</script>
