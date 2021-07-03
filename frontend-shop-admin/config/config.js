// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
require('dotenv').config();
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  define: {
    BASE_URL: process.env.BASE_URL
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'login',
              component: './user/login',
            },
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/list/table-list',
            },
            {
              path: '/list',
              icon: 'table',
              name: 'Product',
              routes: [
                { 
                  path: '/',
                  redirect: '/list/table-list',
                },
                {
                  name: 'Profile',
                  icon: 'table',
                  path: '/list/profiles',
                  component: './list/profiles',
                },
                {
                  name: 'All Product',
                  icon: 'table',
                  path: '/list/products',
                  component: './list/products',
                },
                {
                  name: 'Create product',
                  icon: 'smile',
                  path: '/list/create-item',
                  component: './list/create-item',
                },
                {
                  name: 'Manage orders',
                  icon: 'table',
                  path: '/list/orders',
                  component: './list/orders',
                },
                {
                  name: 'Statistic',
                  icon: 'table',
                  path: '/list/statistic',
                  component: './list/statistic',
                },
                
              ],
            },
  
              
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
