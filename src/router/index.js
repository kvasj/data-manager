import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import AddProject from '../components/AddProject.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    alias: ['','/'],
    component: DashboardView
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView
  },
  {
    path: '/addProject',
    name: 'addProject',
    component: AddProject
  },
  {
    path: '/:NotFound(.*)*',
    name: 'notfound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
