import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('../views/TableList.vue'),
      children:[
        {
          path: 'add',  
          name: 'Add',
          component: () => import('../views/FormView.vue'),
        },
        {
          path: 'edit/:id',  
          name: 'Edit',
          component: () => import('../views/FormView.vue'),
        }
      ]
    },
    // {
    //   path: '/form',
    //   name: 'Form',
    //   component: () => import('../views/FormView.vue'),
    // },

  ],  
})

export default router
