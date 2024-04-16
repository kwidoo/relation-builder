// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Relations.vue'),
    children: [

      { 
        path: '/hasOne', 
        name: 'hasOne', 
        component: () => import('@relations/HasOne.vue'), 
        meta: { name: 'Has One' } 
      },
      { 
        path: '/hasMany', 
        name: 'hasMany', 
        component: () => import('@relations/HasMany.vue'), 
        meta: { name: 'Has Many' } 
      },
      { 
        path: '/hasManyThrough', 
        name: 'hasManyThrough', 
        component: () => import('@relations/HasManyThrough.vue'), 
        meta: { name: 'Has Many Through' } 
      },
      { 
        path: '/hasOneThrough', 
        name: 'hasOneThrough', 
        component: () => import('@relations/HasOneThrough.vue'), 
        meta: { name: 'Has One Through' } 
      },
      { 
        path: '/belongsTo', 
        name: 'belongsTo', 
        component: () => import('@relations/BelongsTo.vue'), 
        meta: { name: 'Belongs To' } 
      },
      { 
        path: '/belongsToMany', 
        name: 'belongsToMany', 
        component: () => import('@relations/BelongsToMany.vue'), 
        meta: { name: 'Belongs To Many' } 
      },
      { 
        path: '/morphTo', 
        name: 'morphTo', 
        component: () => import('@relations/MorphTo.vue'), 
        meta: { name: 'Morph To' } 
      },
      { 
        path: '/morphOne', 
        name: 'morphOne', 
        component: () => import('@relations/MorphOne.vue'), 
        meta: { name: 'Morph One' } 
      },
      { 
        path: '/morphMany', 
        name: 'morphMany', 
        component: () => import('@relations/MorphMany.vue'), 
        meta: { name: 'Morph Many' } 
      },
      { 
        path: '/morphToMany', 
        name: 'morphToMany', 
        component: () => import('@relations/MorphToMany.vue'), 
        meta: { name: 'Morph To Many' } 
      },
      { 
        path: '/morphedByMany', 
        name: 'morphedByMany', 
        component: () => import('@relations/MorphedByMany.vue'), 
        meta: { name: 'Morphed By Many' } 
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
