import { UserPlus, X } from "lucide-react";
import { useGroupStore } from "../store/useGroupStore";
import InviteUsers from "./InviteUsers";

function GroupChatHeader(){
  const { currentGroup, setCurrentGroup } = useGroupStore();
  // const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {/* <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={currentGroup.title} />
            </div>
          </div> */}

          {/* User info */}
         
          <div>
            <h3 className="font-medium">{currentGroup.title}</h3>
            {/* <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p> */}
          </div>
        </div>

        {/* Close button */}
        <div className="flex">
           <button onClick={()=>document.getElementById('invite-users').showModal()} className='btn'>
          <UserPlus/>
        </button>
          <button onClick={() => setCurrentGroup(null)}>
          <X />
        </button>
        <InviteUsers/>
        </div>
      
      </div>
    </div>
  );
};
export default GroupChatHeader;