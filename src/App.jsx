import '@fontsource/roboto-condensed/400.css'
import '@fontsource/roboto/400.css';

import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme';

import CarData from './contexts/carsData';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

 
import RegisterCars from './pages/RegisterCars';
import RegisteredCars from './pages/RegisteredCars';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <CarData>
        <Router>
          <Routes>
            <Route path="/" element={<RegisterCars />} />
            <Route path="/registeredCars" element={<RegisteredCars />} />
            <Route path="/registerCars" element={<RegisterCars />} />
          </Routes>
        </Router>
      </CarData>
    </ChakraProvider>
  )
}

export default App
