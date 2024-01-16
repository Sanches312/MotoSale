import React, { createContext, useContext, useState } from 'react';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [selectedMotorcycles, setSelectedMotorcycles] = useState([]);

  const addMotorcycleToComparison = (motorcycle) => {
    setSelectedMotorcycles((prevMotorcycles) => [...prevMotorcycles, motorcycle]);
  };

  const removeMotorcycleFromComparison = (motorcycleId) => {
    setSelectedMotorcycles((prevMotorcycles) =>
      prevMotorcycles.filter((motorcycle) => motorcycle.id !== motorcycleId)
    );
  };

  const clearComparisonList = () => {
    setSelectedMotorcycles([]);
  };

  const isMotorcycleInComparison = (motorcycleId) => {
    return selectedMotorcycles.some((motorcycle) => motorcycle.id === motorcycleId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedMotorcycles,
        addMotorcycleToComparison,
        removeMotorcycleFromComparison,
        clearComparisonList,
        isMotorcycleInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  return useContext(ComparisonContext);
};
