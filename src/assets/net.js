import config from './config.js'
import {decode as atob, encode as btoa} from 'base-64'
import AsyncStorage from '@react-native-community/async-storage'

const localStorage = AsyncStorage
const api_url = config.api.url

const net = {
  GetFromServer: async (uri = '') => {
    let token = null
    try {
      const res = JSON.parse(atob(await localStorage.getItem(config.storage.key_prefix + 'user')))
      token = res.token
    } catch(e) {
      console.log(e)
    }

    const headers = {}
    if (token) {
      headers['Authorization'] = 'Bearer ' + token
    }

    try {
      const res = await fetch(api_url + uri, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          ...headers
        }
      })
      if (typeof res !== 'undefined' && res) {
        const result = await res.json()
        return result
      } else {
        throw new Error('invalid response')
      }
      
    } catch(e) {
      throw new Error(e)
    }
  },
  PostToServer: async (uri = '', payload = {}) => {
    try {
      let token = null
      try {
        const res = JSON.parse(atob(await localStorage.getItem(config.storage.key_prefix + 'user')))
        token = res.token
      } catch(e) {
      }

      const headers = {}
      if (token) {
        headers['Authorization'] = 'Bearer ' + token
      }
      let res = await fetch(api_url + uri, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...headers
          },
          body: JSON.stringify(payload)
      })
      if (typeof res !== 'undefined' && res) {
        const result = await res.json()
        return result
      } else {
        throw new Error('invalid response')
      }
    } catch(e) {
      throw new Error(e)
    }
  },
  PutToServer: async (uri = '', payload = {}) => {
    try {
      let token = null
      try {
        const res = JSON.parse(atob(await localStorage.getItem(config.storage.key_prefix + 'user')))
        token = res.token
      } catch(e) {
      }

      const headers = {}
      if (token) {
        headers['Authorization'] = 'Bearer ' + token
      }
      let res = await fetch(api_url + uri, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...headers
          },
          body: JSON.stringify(payload)
      })
      if (typeof res !== 'undefined' && res) {
        const result = await res.json()
        return result
      } else {
        throw new Error('invalid response')
      }
    } catch(e) {
      throw new Error(e)
    }
  }
}

export default net