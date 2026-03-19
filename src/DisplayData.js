import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// DisplayData.tsx
import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
const DisplayData = () => {
    const [users, setUsers] = useState([]);
    const [newAddress, setNewAddress] = useState("");
    const [newName, setNewName] = useState("");
    // updateUser Function
    const updateUser = async (userId, updatedData) => {
        const userDoc = doc(db, "users", userId);
        await updateDoc(userDoc, updatedData);
    };
    // deleteUser Function
    const deleteUser = async (userId) => {
        await deleteDoc(doc(db, "users", userId));
    };
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            const dataArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(dataArray);
        };
        fetchData();
    }, []);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Users List" }), users.map((user) => (_jsxs("div", { style: { border: "2px solid black", margin: "10px" }, children: [_jsxs("div", { children: [_jsxs("p", { children: ["Name: ", user.name] }), _jsxs("p", { children: ["Address: ", user.address] })] }, user.id), _jsx("input", { onChange: (e) => setNewName(e.target.value), type: "string", placeholder: "Enter new name:" }), _jsx("button", { onClick: () => user.id && updateUser(user.id, { name: newName }), children: "Update Name" }), _jsx("input", { onChange: (e) => setNewAddress(e.target.value), type: "string", placeholder: "Enter new address:" }), _jsx("button", { onClick: () => user.id && updateUser(user.id, { address: newAddress }), children: "Update Address" }), _jsx("button", { style: { backgroundColor: "crimson" }, onClick: () => user.id && deleteUser(user.id), children: "Delete User" })] }, user.id)))] }));
};
;
;
export default DisplayData;
