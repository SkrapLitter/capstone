import io from 'socket.io-client';

const SOCKET_IO_URL = 'https://skraplitter.herokuapp.com/';
const socket = io(SOCKET_IO_URL);

export default socket;
