import { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('addresses');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "John Doe",
        phone: "9876543210",
        street: "123 Main Street, Apt 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        isDefault: true
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (address) => {
    const newAddress = {
      ...address,
      id: Date.now(),
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, newAddress]);
  };

  const updateAddress = (id, updatedAddress) => {
    setAddresses(addresses.map(addr =>
      addr.id === id ? { ...updatedAddress, id, isDefault: addr.isDefault } : addr
    ));
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <AddressContext.Provider value={{
      addresses,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress
    }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}