// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { child, get, getDatabase, ref, set } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBkqP49g2biUw9fl30MBRa8B2DXpgMZSqc',
  authDomain: 'tinhtienchuyendi.firebaseapp.com',
  databaseURL: 'https://tinhtienchuyendi-default-rtdb.firebaseio.com',
  projectId: 'tinhtienchuyendi',
  storageBucket: 'tinhtienchuyendi.appspot.com',
  messagingSenderId: '798228229791',
  appId: '1:798228229791:web:33477f775ae5ee7d29fcaa',
  measurementId: 'G-7JVBGV0XDG'
}

const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)
export const database = getDatabase(app)
export const dbRef = ref(database)

export const getData = (path: string) => {
  return get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        return snapshot.val()
      } else {
        console.log('No data available')
        return null
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export const setData = (path: string, data: any) => {
  return new Promise((resolve, reject) => {
    set(child(dbRef, path), data)
      .then(() => {
        resolve(true)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}
