const admin = require("firebase-admin");

const serviceAccount = require("../config/firebase-key.json");

const BUCKET = "senai-overflow-2021-01-9e264.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadFirebase = (req, res, next) => {
    if(!req.file) return next();

    const image = req.file;

    const filename = Date.now() + "." + image.originalname.split(".").pop();

    const file = bucket.file(filename);

    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype,
        },
    });

    stream.on("error", (error) => {
        console.error(error);

        res.status(500).send({ error: "Erro ao subir para o Firebase" });
    });

    stream.on("finish", () => {
        //tornar o arquuivo público
        file.makePublic();

        //obter a url publica
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${filename}`;

        next();
    });

    stream.end(image.buffer)
};

module.exports = uploadFirebase;