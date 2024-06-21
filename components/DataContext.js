import React, { createContext, useState } from 'react';

// Context oluştur
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};
