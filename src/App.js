import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from './components/authentication/Authentication';
import Main from './components/Main';
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const notifyInfo = (msg) => toast.info(msg);

  return (
    <div className='w-full min-h-screen bg-purple-400'>
      <ToastContainer />
      {isLoggedIn ? 
        <Main 
          currentUsername={currentUsername}
          setIsLoggedIn={isLoggedIn} 
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          notifyInfo={notifyInfo}
        /> 
        :
        <Authentication 
          setCurrentUsername={setCurrentUsername}
          setIsLoggedIn={setIsLoggedIn} 
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          notifyInfo={notifyInfo}
        />}
    </div>
  );
}

export default App;
