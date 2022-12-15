import { useState, createContext } from 'react';

export const CarsData = createContext({});

function CarData({ children }) {
    const [cars, setCars] = useState({});

    function carsContext(vehicle, price, entrancePrice, installments) {

        setCars({
            vehicle: vehicle,
            price: price,
            entrancePrice: entrancePrice,
            installments: installments.toFixed(2)
        });

        return;
    }

    return (
        <CarsData.Provider value={{ carsContext, cars }}>
            {children}
        </CarsData.Provider>
    )
}

export default CarData;