import admin from "firebase-admin";

const serviceAccount = {
    "type": "service_account",
    "project_id": "e-commerce-bd44f",
    "private_key_id": "7766db1f1c23a72031ec662c6a1ee924ac2afc5e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDOzPMx0fJnd8vz\nfALxJEc0WhXNiWO2ET8b0fj3azFP+U6Di4WQZ/v67nEomH7bGZeDpsfHIf3np8SV\nynTL2NUcavN40PKndV0emJocH7BrOrdgvSNuzISpfcheRxRDgyFUYMDHtKmuIebf\nz4VdhVkD7XSwtDnXrSW+PUXUmMtXkQGkRChppuoqrOxjlS+3pyu4qnxe3KYbhRnR\ng0pKgbIz+O0ir88tfUTkkklp3iZhMOLO55FpCMlmA1mb6veITSCTmuTHBXuwDfzn\nCpNX9tZIJANH71Nkekr6QNEG8K1RUvdZskh6f58o12r8QoO5bTFTnN5D2KJGCWtv\nj5e6UvQzAgMBAAECggEAK5/eeZcBXMRPuNhjQn1Vq/yI9ufRqfmvZ23+6Cqrp2Q/\nJM7M6S6WYFPmeRraP9wBM1t+b0qDZlfkx3iC9PGT2z/Qhp8FYUAH2cl1URN6QtSL\nFJQxolDwd1S6bPDvnGJQKJ2UbUx2Mu6h5nq/doAHzCVOZWxPe2jiOmRwk617z8e8\n9TVsZApUWygdO1jOx2nN94fNgJc8//ssuFhqCXcTZWAXJMvuruUD4pUEa57yISEe\nTR5dQ4deO/wfsHGpcwPXU7uxUO4v7xy5oe2MkjZmtZ7+WxP8LBC9yCY8vColxDlp\n/tVqabY+C87Eerspuf+2iXbzCbpZHWZO8Yy2H2uAoQKBgQDwtUeRn2bBbE2iTpVW\noxmm+KMuL1j20TuvBqurGqBgBJpG5EW46nAli8+SjTPVgHTI1UioeW6MxpbQax00\nb5yfmMF4E8qQmz/tn/MH/xYhUO6r49HDftFEsj1jaJR8QPgaxFkHnfKzXBqFdg96\nryrOmcQntzVVpQjpoUVVxJdlQwKBgQDb8Dhjbu3Xy8nZOtRLEWTig9Cfoqi1SSKv\nS9lWO0jfJeFCjKXoNoCQB/2P1Z86kDLvzpyNF7xshSj0SJLEseUtykKG9uavp3Li\nxNH8DBGq8owrOe1R+YfhsYFiWksLyCvvX62hr3xtQJ8wkKsOIRnz5bkmh1p0pjKN\neWno2lDOUQKBgHz+pduI2uM2SlouVH5Y08lQ8+vXymrg3A1XeW2wtfcmbLbDczFD\nDFly8Kc5i+Eig4KGvuQ9qpqPxWEVPmUsUDjQKicgn9/Xvqq2lI1ieStzy3yXISZT\nhHgX1qj4daLQWgYMT+8UpiNdgKgtVnxu2dvPHX1CNf/zY11u0YJoQ/XhAoGBANP7\nPn4n5rn9QzlKiF8qDrB8F9Ik9rJ0ISgP1RRV47CgU/LOmQGttlAcQ3okjWnmnhGg\ndCdRX1zBI23/nOZUB+4QafqnckSPAh4rUbC6+TRovkzTcjd2aE9RxMDFAlwCvMXk\n0/doqmaqyEQIy7W8lcUL/15xSu/vV/4frcKu2P9hAoGAD61hT4aYwS3K+kOZFyCt\nvIU/G5CFcwrefNgfivwVGF+5JNjBS7dflPndFJ3iBsnIkOuWkhR9WUM6Ky9P2TmC\nBBBDZtgr24PIfSMnvkgUddqUU05Qel0RfJsal14OVrIwCP3Mgc4BkGfyf8xIUD2s\nwE2EQyNsi/2TyLqJi9ZsZuA=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ne2hx@e-commerce-bd44f.iam.gserviceaccount.com",
    "client_id": "107509609526028509123",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ne2hx%40e-commerce-bd44f.iam.gserviceaccount.com"
} 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://e-commerce.firebaseio.com"
});

console.log('Firebase Initialized');

const db = admin.firestore();


class ContenedorFirebase {
    constructor(collection){
    this.collection = db.collection(collection)
    }
    //CREATE 
    async newOne(object) {
        try {
            /*
            no puedo crear un documento con el id que tiene adentro el producto o carrito
            */
            const newOne = this.collection.doc(object.id)
            await newOne.create(object);
            return this.collection
        } catch (err) {
            console.log(err);
        }
    }

    //READ ALL
    async getAll() {
            try {
                const docs = (await this.collection.get()).docs;
                const response = docs.map(doc => doc.data())
                return response;
            } catch (err) {
                console.log(err);
                return [];
            }
        }

    //READ BY ID
    async getById(id) {
        try {
            let docs = await this.getAll();
            let doc = docs.find(doc => doc.id == id);
            if (!doc) {
                throw new Error(`Error al listar por id: no se encontró`)
            } else {
            return doc;
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }


    /*
    no se como hacer para buscar dentro de una coleccion sin tener el ID de fuera del producto
    */
    //UPDATE 
    async update(object) {
        try {
            const doc = await this.collection.doc(object.id).set(object)
            return null;
        } catch (err) {
            console.log(err);
        }
    }

    //DELETE 
    async delete(id) {
        try {
            const doc = this.collection.doc(id);
            await doc.delete();
            console.log('Element deleted with ID :', id );
            return null;
        } catch (err) {
            console.log(err);
        }
    }
}


export default ContenedorFirebase;






