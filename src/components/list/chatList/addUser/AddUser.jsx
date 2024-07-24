import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "./AddUser.css";
import { db } from "../../../../lib/firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUserStore } from "../../../../lib/userStore"

const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    if (!username) {
      toast.error("Username is required");
      return;
    }

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      } else {
        toast.error("Username not found. Please start with uppercase letter😂");
        setUser(null);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });



      console.log(newChatRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='addUser'>
      <form onSubmit={handleSearch}>
        <input type='text' placeholder='Username' name='username' />
        <button type='submit'>Search</button>
      </form>
      {user && (
        <div className='user'>
          <div className='detail'>
            <img src={user.avatar || "./avatar.png"} alt='' />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
