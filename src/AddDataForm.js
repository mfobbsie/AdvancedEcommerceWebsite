import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// AddDataForm.tsx
import { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
const AddDataForm = () => {
    const [data, setData] = useState({ name: "", address: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "users"), data);
            alert("Data added!");
            setData({ name: "", address: "" }); // reset form
        }
        catch (error) {
            console.error("Error adding document: ", error);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { name: "name", value: data.name, onChange: handleChange, placeholder: "Name" }), _jsx("input", { name: "address", value: data.address, onChange: handleChange, placeholder: "Address" }), _jsx("button", { type: "submit", children: "Add User" })] }));
};
export default AddDataForm;
