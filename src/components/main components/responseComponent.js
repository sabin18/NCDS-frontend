import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const ErrorResponse = (Error) => {
  toast.error(
    Array.isArray(Error)
      ? Error[0] : Error, { autoClose: 8000 },
  );
};

const SuccessResponse = (response) => {
  toast.success(response.message);
};

export default { ErrorResponse, SuccessResponse };
