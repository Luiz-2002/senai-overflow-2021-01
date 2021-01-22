var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});