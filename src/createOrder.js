import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
export async function createOrder(userId, cartItems) {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = {
        userId,
        createdAt: Timestamp.now(),
        totalPrice,
        items: cartItems.map((item) => ({
            productId: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
        })),
    };
    const docRef = await addDoc(collection(db, "orders"), order);
    return docRef.id;
}
