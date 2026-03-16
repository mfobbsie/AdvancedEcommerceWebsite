// AddDataForm.tsx
import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

interface User {
  id?: string; // id is optional, as it will only be available after data is fetched
  name: string;
  address: string;
}

const AddDataForm = () => {
  const [data, setData] = useState<Omit<User, "id">>({ name: "", address: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "users"), data);
      alert("Data added!");
      setData({ name: "", address: "" }); // reset form
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="address"
        value={data.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddDataForm;
