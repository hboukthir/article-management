import { createStore } from 'vuex'
import VuexORM from '@vuex-orm/core'
import createPersistedState from 'vuex-persistedstate'
import User from '@/models/User'
import Article from '@/models/Article'

// Créer une base de données pour Vuex ORM
const database = new VuexORM.Database()
database.register(User)
database.register(Article)

// Configuration du store Vuex
export default createStore({
    plugins: [
        VuexORM.install(database),
        createPersistedState({
            storage: window.localStorage
        })
    ],
    state: {
        message: 'Hello Vuex ORM with persisted state!'
    },
    mutations: {
        SET_MESSAGE(state, newMessage) {
            state.message = newMessage
        }
    },
    actions: {
        // Action pour ajouter un utilisateur
        addUser(userData) {
            return User.insert({ data: userData })
        },

        // Action pour ajouter un article
        addArticle(articleData) {
            return Article.insert({ data: articleData })
        },

        // Action pour modifier un utilisateur
        editUser({ id, userData }) {
            return User.update({
                where: id,
                data: userData
            })
        },

        // Action pour supprimer un utilisateur
        deleteUser(id) {
            return User.delete(id)
        },

        // Action pour modifier un article
        editArticle({ id, articleData }) {
            return Article.update({
                where: id,
                data: articleData
            })
        },

        // Action pour supprimer un article
        deleteArticle(id) {
            return Article.delete(id)
        }
    }
})
