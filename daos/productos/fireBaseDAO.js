const admin = require("firebase-admin");

const serviceAccount = require("../../db/e-commerce-bd44f-firebase-adminsdk-ne2hx-7766db1f1c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://e-commerce.firebaseio.com"
});

console.log('Firebase Initialized');

const db = admin.firestore();

const query = db.collection("products")

class fireBaseDAO {

    //CREATE PRODUCT
    async newProduct(product) {
        try {
            let doc = query.doc(`${Math.random()}`);
            await doc.create(product);
        } catch (err) {
            console.log(err);
        }
    }

    //READ ALL PRODUCTS
    async getAllProducts() {
        try {
            const querySnapshot = await query.get();
            let docs = querySnapshot.docs;
            const response = docs.map((doc) => {
                return doc.data();
            });
            return response;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    //READ PRODUCT BY ID
    async getProductById(id) {
        try {
            const doc = query.doc(id);
            const item = await doc.get();
            const response = item.data();
            return response;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    //UPDATE PRODUCT
    async updateProduct(product) {
        try {
            let id = product.id;
            const doc = query.doc(id);
            await doc.update(product);
            console.log('Product updated');
        } catch (err) {
            console.log(err);
        }
    }

    //DELETE PRODUCT
    async deleteProduct(id) {
        try {
            const doc = query.doc(id);
            await doc.delete();
            console.log('Product deleted');
        } catch (err) {
            console.log(err);
        }
    }
}


module.exports = fireBaseDAO;






