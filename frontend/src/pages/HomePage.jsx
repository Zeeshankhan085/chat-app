import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';
import { useGroupStore } from '../store/useGroupStore';
import GroupChat from '../components/GroupChat';

function HomePage(props) {
  const {isUsersLoading, getUsers, users, selectedUser} = useChatStore();
  const {currentGroup} = useGroupStore()
  // const {fetchGroups}
  // useEffect(() => {

  // }, [])
  
  return (
    <div className='h-screen bg-base-200'>
      <div className="flex items-center justify-center pt-20 px-4">
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>
            {currentGroup ? <GroupChat/> : selectedUser ? <ChatContainer/> : <NoChatSelected/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;