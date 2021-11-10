import {auth, db} from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import {
    collection,
    setDoc,
    getDoc,
    getDocs,
    doc,
    query,
    where,
    updateDoc,
    deleteDoc
} from 'firebase/firestore/lite';
import {PRODUCTS_DB} from "../constants/dbCollection";


const addNewProduct = async ({courseName, description, imageUrl, price, sellerID}) => {
    const productID = uuidv4();
    try{
        const docRef = doc(db, PRODUCTS_DB, productID);
        await setDoc(
            docRef,
            {
                courseName,
                description,
                imageUrl,
                price,
                sellerID
            },
            {merge: true}
        );
        /*const docRef = doc(db, 'colors', 'id')
        await setDoc(docRef, {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        });*/


    }catch (e) {
        throw new Error('Unable to add product');
    }
}

const getAllProductsInfo = async () => {
    let allProducts = [];

    try{
        const products = await getDocs(collection(db, PRODUCTS_DB));
        products.forEach((elem) => {
            allProducts.push({
                productID: elem.id,
                data:elem.data()
            });
        });

        return allProducts;
    }catch (e) {
        throw new Error('Cant get all products data from database.');
    }
}

const getProductsForActiveUser = async () => {
    let productsById = [];

    const currentUser = auth.currentUser;

    try{
        const q = query(collection(db, PRODUCTS_DB), where("sellerID", "==", String(currentUser.uid)));

        const products = await getDocs(q);
        products.forEach((elem) => {
            productsById.push({
                productID: elem.id,
                data:elem.data()
            });
        });

        return productsById;
    }catch (e) {
        throw new Error('Cant get user`s products data from database.');
    }
}

const getProductById = async (id) => {
    let product = {};
    try{
        const docRef = doc(db, PRODUCTS_DB, id);
        const docSnap = await getDoc(docRef);

        if(!docSnap.exists()){
            throw new Error();
        }

        product = docSnap.data();
        return product;
    }catch (e) {
        throw new Error('Error while reading course data.');
    }
}

const updateProductById = async (id, {courseName, description, imageUrl, price}) => {
    courseName = courseName.trim();
    description = description.trim();
    imageUrl = imageUrl.trim();
    price = price.trim();

    const docRef = doc(db, PRODUCTS_DB, id);

    try{
        await updateDoc(docRef, {
            courseName,
            description,
            imageUrl,
            price
        });
    }catch (e) {
        throw new Error("Cant update product information.");
    }
}

const deleteProductById = async (id) => {
    try{
        await deleteDoc(doc(db, PRODUCTS_DB, id));
    }catch (e) {
        throw new Error('Can`t delete course.');
    }
}


export {
    addNewProduct,
    getAllProductsInfo,
    getProductsForActiveUser,
    deleteProductById,
    getProductById,
    updateProductById
};