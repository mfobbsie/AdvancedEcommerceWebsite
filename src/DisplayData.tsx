// DisplayData.tsx
import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

interface User {
  id?: string; // id is optional, as it will only be available after data is fetched
  name: string;
  address: string;
}

const DisplayData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newAddress, setNewAddress] = useState<string>("");
  const [newName, setNewName] = useState<string>("");

  // updateUser Function
  const updateUser = async (userId: string, updatedData: Partial<User>) => {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, updatedData);
  };

  // deleteUser Function
  const deleteUser = async (userId: string) => {
    await deleteDoc(doc(db, "users", userId));
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(dataArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      {users.map((user) => (
        <div
          key={user.id}
          style={{ border: "2px solid black", margin: "10px" }}
        >
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Address: {user.address}</p>
          </div>
          <input
            onChange={(e) => setNewName(e.target.value)}
            type="string"
            placeholder="Enter new name:"
          />
          <button
            onClick={() => user.id && updateUser(user.id, { name: newName })}
          >
            Update Name
          </button>
          <input
            onChange={(e) => setNewAddress(e.target.value)}
            type="string"
            placeholder="Enter new address:"
          />
          <button
            onClick={() =>
              user.id && updateUser(user.id, { address: newAddress })
            }
          >
            Update Address
          </button>
          <button
            style={{ backgroundColor: "crimson" }}
            onClick={() => user.id && deleteUser(user.id)}
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
};;;

export default DisplayData;
