// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ArticlePage from '../views/ArticlePage.vue';
import AddArticle from '../components/AddArticle.vue'; // Importer AddArticle
import EditArticlePage from '@/views/EditArticlePage.vue';
import EditUserPage from "@/views/EditUserPage.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/article/:id',
        name: 'ArticlePage',
        component: ArticlePage
    },
    {
        path: '/add-article',
        name: 'AddArticle',
        component: AddArticle
    },
    { path: '/edit-user/:userId', component: EditUserPage, name: 'EditUserPage' },
    { path: '/edit-article/:articleId', component: EditArticlePage, name: 'EditArticlePage' },
];

const router = createRouter({
    history: createWebHistory(),  // Crée une instance de router avec l'historique du navigateur
    routes
});

export default router;
