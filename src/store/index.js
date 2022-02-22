import { createStore } from 'vuex'
// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
    }
  },
  mutations: {
    clearOut(state) {
      delete state.imageUrl1
      delete state.imageUrl2
      delete state.imageUrl3
      delete state.imageUrl4
      delete state.imageUrl5
      delete state.imageUrl6
      delete state.authType
      delete state.trademarkName
    }
  },
  actions: {
    clearOut (context) {
      context.commit('clearOut')
    }
  }
})

export default store