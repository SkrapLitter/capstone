import io from 'socket.io-client';

// const SOCKET_IO_URL = process.env.NODE_ENV
//   ? 'http://skraplitter.herokuapp.com'
//   : 'http://localhost:3000';
const SOCKET_IO_URL = 'https://skraplitter.herokuapp.com';
const socket = io(SOCKET_IO_URL);

export default socket;
