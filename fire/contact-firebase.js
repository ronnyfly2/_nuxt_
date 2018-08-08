import * as firebase from 'firebase';

let config = {
	apiKey: "AIzaSyAF3Iyp6LbDHuZZ2t5gbe9jKNmus-L1dPU",
	authDomain: "delicores-1508107535565.firebaseapp.com",
	databaseURL: "https://delicores-1508107535565.firebaseio.com",
	projectId: "delicores-1508107535565",
	storageBucket: "delicores-1508107535565.appspot.com",
	messagingSenderId: "337621724388"
};

let appSet = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
let db = appSet.database();
// create a database references
const ListContacts = db.ref('contacts/');
//-const pagesRef = db.ref('pages');
//-const postsRef = db.ref('posts');
//-const usersRef = db.ref('users');
//-const mediaRef = db.ref('media');

export { ListContacts };
