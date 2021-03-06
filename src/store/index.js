import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import moduleStore from './module-store'
// import * as registerStore from "@/store/module-store.js"
// import * as registerStore from './store/store.js'

// import Vue from 'vue';
// import Vuex from 'vuex';
// Vue.use(Vuex)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // store,
      namespaced: true,
      moduleStore
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })
  return Store
})


// export default function (/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       store,
//       namespaced: true,
//       moduleStore
//     },
//     // enable strict mode (adds overhead!)
//     // for dev mode and --debug builds only
//     strict: process.env.DEBUGGING
//   })
//   return Store
// }

