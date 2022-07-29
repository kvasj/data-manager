import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import AddProjectFormView from '../views/AddProjectFormView.vue'
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
    component: AddProjectFormView
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
