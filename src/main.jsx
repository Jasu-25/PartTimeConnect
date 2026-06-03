import { createContext, StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

export const Requireddata = createContext({ seekerData: null, refreshSeeker: () => { }, setSeekerData: () => { } });
export const Providerddata = createContext({ providerData: null, refreshProvider: () => { }, setProviderData: () => { } });

function SeekerProvider({ children }) {

  const [seekerData, setSeekerData] = useState(null);

  const fetchSeeker = async () => {
    try {
      const response = await axios.get('/backend/get_seeker.php', {
        withCredentials: true
      });

      if (response.data.status === 'success') {
        setSeekerData(response.data.user);
      } else {
        setSeekerData(null);
      }

    } catch (err) {
      console.error(err);
      setSeekerData(null);
    }
  };

  useEffect(() => {
    fetchSeeker();
  }, []);

  return (
    <Requireddata.Provider value={{ seekerData, refreshSeeker: fetchSeeker, setSeekerData }}>
      {children}
    </Requireddata.Provider>
  );
}

function FetchProviderdata({ children }) {
  const [providerData, setProviderData] = useState(null);
  const fetchProvider = async () => {
    try {
      const response = await axios.get('/backend/get_provider.php', {
        withCredentials: true
      });

      if (response.data.status === 'success') {
        setProviderData(response.data.user);
      } else {
        setProviderData(null);
      }

    } catch (err) {
      console.error(err);
      setProviderData(null);
    }
  };

  useEffect(() => {
    fetchProvider();
  }, []);

  return (
    <Providerddata.Provider value={{ providerData, refreshProvider: fetchProvider, setProviderData }}>
      {children}
    </Providerddata.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SeekerProvider>
        <FetchProviderdata>
          <App />
        </FetchProviderdata>
      </SeekerProvider>
    </BrowserRouter>
  </StrictMode>
);
