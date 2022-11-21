import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard', auth: true }
    },
    {
      path: 'personalCenter',
      name: 'personalCenter',
      hidden: true,
      component: () => import('@/views/dashboard/personalCenter/index'),
      meta: { title: '个人中心', icon: 'dashboard', auth: true }
    }
    ]
  },

  {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'banner',
        component: () => import('@/views/banner/index'),
        meta: { title: '首页标语', icon: 'el-icon-s-home', auth: true }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/table',
    name: 'Article',
    meta: { title: '文章管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/article/table/index'),
        meta: { title: '文章列表', icon: 'el-icon-document-copy', auth: true }
      },
      {
        path: 'classify',
        name: 'Classify',
        component: () => import('@/views/article/classify/index'),
        meta: { title: '文章分类', icon: 'el-icon-menu', auth: true }
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/article/add/index'),
        meta: { title: '添加文章', icon: 'el-icon-document-add', auth: true }
      },
      {
        path: '/edit/:id',
        name: 'editBlog',
        hidden: true,
        component: () => import('@/views/article/edit/index'),
        meta: { title: '编辑文章', icon: 'el-icon-document-add', auth: true }
      },
    ]
  },

  {
    path: '/project',
    component: Layout,
    redirect: '/project/table',
    name: 'Project',
    meta: { title: '项目管理', icon: 'el-icon-suitcase' },
    children: [
      {
        path: 'table',
        name: 'project-table',
        component: () => import('@/views/project/table/index'),
        meta: { title: '项目列表', icon: 'el-icon-notebook-1', auth: true }
      },
      {
        path: 'addPro',
        name: 'project-addPro',
        component: () => import('@/views/project/addPro/index'),
        meta: { title: '添加项目', icon: 'el-icon-link', auth: true }
      }
    ]
  },

  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Comment',
        component: () => import('@/views/comment/index'),
        meta: { title: '评论管理', icon: 'el-icon-chat-line-round', auth: true }
      }
    ]
  },

  {
    path: '/msg-board',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Msg-board',
        component: () => import('@/views/msg-board/index'),
        meta: { title: '留言板', icon: 'el-icon-copy-document', auth: true }
      }
    ]
  },

  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'About',
        component: () => import('@/views/about/index'),
        meta: { title: '关于我', icon: 'el-icon-user', auth: true }
      }
    ]
  },

  {
    path: '/set',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'set',
        component: () => import('@/views/set/index'),
        meta: { title: '设置', icon: 'el-icon-setting', auth: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
