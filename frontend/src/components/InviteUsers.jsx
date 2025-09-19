import React, { useState } from 'react';
import { useGroupStore } from '../store/useGroupStore';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

function InviteUsers(props) {
  const { currentGroup, addUsersToGroup } = useGroupStore()
  const { users } = useChatStore()
  const [selectedUsers, setSelectedUsers] = useState([])
  // const [tableUsers = users.map(user => ({...user, selected: false}))
  const addUsers = async () => {
    await addUsersToGroup(currentGroup._id, selectedUsers);
    const modal = document.getElementById('invite-users');
    modal.close();
  }
  // const [selectedUsers, setSelectedUsers]
  const handleCheckboxClick = (checked, id) => {
    console.log(checked, id);
    let filteredUsers = []
    if (checked) {
      filteredUsers = [...selectedUsers, id]
    } else {
      console.log();

      filteredUsers = selectedUsers.filter(s => s !== id)
    }
    setSelectedUsers(filteredUsers)

  }
  return (
    <div>
      <dialog id="invite-users" className="modal">
        <div className="modal-box w-6/12 max-w-5xl">
          <h3 className="font-bold text-lg">Add Users to ''{currentGroup.title}''</h3>
          <div className="overflow-x-auto">
            <table className="table table-xl">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    {/* <label>
            <input type="checkbox" className="checkbox" />
          </label> */}
                  </th>
                  {/* <th>Name</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users.map(user => (
                  <tr key={user._id}>
                    <th>
                      <label>
                        <input type="checkbox" checked={selectedUsers.includes(user._id)} onChange={(e) => handleCheckboxClick(e.target.checked, user._id)} className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={user.profile || '/avatar.png'} alt="user.fullName"
                              className='size-12 object-cover rounded-full' />
                          </div>
                        </div>
                        <div>
                          <div className="text-[14px] font-semibold">{user.fullName}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}


              </tbody>
            </table>
          </div>
          <div className="modal-action">
            {/* <form method="dialog"> */}
            {/* if there is a button in form, it will close the modal */}
            <button onClick={addUsers} className="btn btn-primary text-white">Add</button>
            {/* </form> */}
          </div>
        </div>
      </dialog>

    </div>
  );
}

export default InviteUsers;