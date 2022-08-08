import Vue from 'vue'

function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(date).toLocaleDateString('en-US', options).replaceAll('/', '-')
}


Vue.prototype.$formatDate = string => formatDate(string)
