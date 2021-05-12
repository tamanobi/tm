import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// ref: https://firebase.google.com/docs/web/setup?hl=ja#add-sdks-initialize

export default class Firebase {
  constructor() {
    firebase.initializeApp({
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      databaseURL: process.env.DATABASEURL,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID,
    })

    this._instance = firebase
    this._db = firebase.firestore()
    this._auth = firebase.auth()
  }

  get instance() {
    if (!this._instance) {
      this._instance = new Firebase()
    }
    return this._instance
  }

  get db() {
    if (!this._db) {
      this._db = firebase.firestore()
    }
    return this._db
  }

  get auth() {
    if (!this._auth) {
      this._auth = firebase.auth()
    }
    return this._auth
  }

  get todos() {
    return this.db.collection('todos')
  }
}
