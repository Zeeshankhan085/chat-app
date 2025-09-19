import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import {useGroupStore} from "../store/useGroupStore"

function Sidebar(props) {
  const { getUsers, selectedUser, users, isUsersLoading, setSelectedUser } = useChatStore()
  const [groupTitle, setGroupTitle] = useState('');
  const {onlineUsers} = useAuthStore()
  const {fetchGroups,createGroup, currentGroup, groups, setCurrentGroup} = useGroupStore()

  useEffect(() => {
    getUsers()
    fetchGroups()
  }, [])
  console.log(onlineUsers, "inline users", users);

  const createChatGroup = async () => {
if(!groupTitle.trim("")){
  return
}
  await createGroup({title: groupTitle})
  try {
    await createGroup({ title: groupTitle });
    const modal = document.getElementById('my_modal_1');
    modal.close();

    setGroupTitle("");
  } catch (err) {
    console.error(err);
  }
  }
  
  if (isUsersLoading) {
    return <SidebarSkeleton />
  }
  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center justify-between gap-2">
          {/* <Users className='size-6'/> */}
          <span className='font-medium hidden lg:block'>Contacts</span>
          <button className='btn' onClick={()=>document.getElementById('my_modal_1').showModal()}><Users className='size-6'/></button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-md">New Group</h3>
    <input type="text" value={groupTitle} onChange={(e) => {setGroupTitle(e.target.value)}} placeholder="Title" className="input w-full mt-2 input-neutral" />
    <div className="modal-action">
      {/* <form method="dialog"> */}
        {/* if there is a button in form, it will close the modal */}
        <button onClick={createChatGroup} className="btn btn-primary text-white">Create</button>
      {/* </form> */}
    </div>
  </div>
</dialog>

        </div>
        {/* {Online filter toggle} */}

      </div>
      <div className="overflow-y-auto w-full py-3">
        {groups.map((group) => (
          <button key={group._id} onClick={() => {setCurrentGroup(group); setSelectedUser(null)}}
          className={`w-full p-3 flex items-center gap-3 hover:bg-base-300
            transition-colors
            ${currentGroup?._id === group._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img src={'/avatar.png'} alt="user.fullName"
              className='size-12 object-cover rounded-full'/>
              {/* {onlineUsers.includes(user._id) && (
                <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900' />
              )} */}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{group.title}</div>
              {/* <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div> */}
            </div>
          </button>
        ))}
        {users.map((user) => (
          <button key={user._id} onClick={() => {setSelectedUser(user); setCurrentGroup(null)}}
          className={`w-full p-3 flex items-center gap-3 hover:bg-base-300
            transition-colors
            ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img src={user.profile || '/avatar.png'} alt="user.fullName"
              className='size-12 object-cover rounded-full'/>
              {onlineUsers.includes(user._id) && (
                <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900' />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
      
    </aside>
  );
}

export default Sidebar;