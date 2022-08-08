export default function ({store, app: { $axios, $cookies }, redirect}) {
    // { $axios, redirect }
  
    $axios.setBaseURL(store.state.apiUrl)
    $axios.onRequest((config) => {
      if (store.state.token !== undefined && store.state.token !== null) {
        config.headers.common.Accept = 'application/json'
        config.headers.common.Authorization = `Bearer ${store.state.token}`
        config.withCredentials = false
      }
    })
  
  
    $axios.onResponse((response) => {
      if (parseInt(response.status) === 401) {
       
        $cookies.remove('token')
        store.commit('setToken',null)
        redirect('/login')
      }
  
    })
  
    $axios.onError(error => {
      const errorCode = parseInt(error.response.status)
      if (errorCode === 401) {
        $cookies.remove('token')
        store.commit('setToken',null)
        redirect('/login')
      }
    })
  }
  
  