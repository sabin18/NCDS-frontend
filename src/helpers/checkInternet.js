import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const online = navigator.onLine;

const isOnline = () => {
  if (online === false) {
    toast.error('You are offline check your Internet connection!', { autoClose: 8000 });
  }
};

export default isOnline;
