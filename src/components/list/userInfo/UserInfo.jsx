import './UserInfo.css'
import { useUserStore } from "../../../lib/userStore"

const UserInfo = () => {

  const { currentUser } = useUserStore();

  return (
    <div className='userInfo'>
        <div className="user">
            <img src={currentUser.avatar || "/avatar.png"} alt="avatar" />
            <h2>{currentUser.username}</h2>
        </div>
        <div className="icons">
            <img src="/more.png" alt="more icon" />
            <img src="/video.png" alt="video icon" />
            <img src="/edit.png" alt="edit icon" />
        </div>
    </div>
  )
}

export default UserInfo