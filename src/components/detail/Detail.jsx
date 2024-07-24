import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import "./Detail.css";
import { useUserStore } from "../../lib/userStore";
import { toast } from "react-toastify";

const Detail = () => {
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) {
      toast.error("You are already blocked.");
      return;
    }
    try {
      const userDocRef = doc(db, "users", currentUser.id);
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='detail'>
      <div className='user'>
        <img src={user?.avatar || "./avatar.png"} alt='' />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className='option'>
        <div className='title'>
          <span>Shared Photos</span>
          <img src='./arrowDown.png' alt='image' />
        </div>
        <div className='photos'>
          
          <div className='photoItem'>
            <div className='photoDetail'>
              <img
                src='./avatar.png'
                alt='image'
              />
              <span>photo_2024_2.png</span>
            </div>
            <img src='./download.png' alt='image' className='icon' />
          </div>
        </div>
      </div>
      <div className='actions'>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button className='logout' onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
