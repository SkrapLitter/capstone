import io from 'socket.io-client';

// const SOCKET_IO_URL = 'http://localhost:3000';
const SOCKET_IO_URL = 'http://skraplitter.herokuapp.com';
const socket = io(SOCKET_IO_URL);

export default socket;
