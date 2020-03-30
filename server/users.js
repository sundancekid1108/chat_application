const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!name || !room) {
        return {
            error: 'Username and room are required!',
        }
    }

    const checkingUser = users.find((user) => {
        return user.room === room && user.name === name;
    })

    if(checkingUser) {
        return {
            error: 'Username is aready existed.'
        }
    }

    const user = {id, name, room}
    users.push(user);
    return {user}

}

const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  deleteUser,
  getUser,
  getUsersInRoom
}