import Firebase from 'firebase'
import {config} from '../firebaseConfig.js'

var firebaseApp = Firebase.initializeApp(config)
// // var db = firebaseApp.database()
var bucket = firebaseApp.storage()
export const storage = bucket.ref()
