import { useState } from "react";
import "../style/address.css";
import { Link } from "react-router-dom";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([
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
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingId ? { ...formData, id: editingId, isDefault: addr.isDefault } : addr
      ));
      alert("Address updated successfully!");
      setEditingId(null);
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now(),
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, newAddress]);
      alert("Address added successfully!");
    }
    
    setFormData({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: ""
    });
    setShowForm(false);
  };

  const handleEdit = (address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    });
    setEditingId(address.id);
    setShowForm(true);
  };

  const deleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      alert("Address deleted successfully!");
    }
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    alert("Default address updated!");
  };

  return (
    <div className="address-container">
      <div className="address-header">
        <h2>Manage Addresses</h2>
        <Link to="/profile">
          <button className="back-btn">← Back to Profile</button>
        </Link>
      </div>

      <button 
        className="add-address-btn" 
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({
            name: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            pincode: ""
          });
        }}
      >
        {showForm ? "Cancel" : "+ Add New Address"}
      </button>

      {showForm && (
        <form className="address-form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Address" : "Add New Address"}</h3>
          
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          
          <input
            type="tel"
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
          
          <textarea
            placeholder="Street Address"
            value={formData.street}
            onChange={(e) => setFormData({...formData, street: e.target.value})}
            required
            rows="3"
          />
          
          <div className="form-row">
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              required
            />
            
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
              required
            />
          </div>
          
          <input
            type="text"
            placeholder="Pincode"
            pattern="[0-9]{6}"
            value={formData.pincode}
            onChange={(e) => setFormData({...formData, pincode: e.target.value})}
            required
          />
          
          <button type="submit" className="save-btn">
            {editingId ? "Update Address" : "Save Address"}
          </button>
        </form>
      )}

      <div className="address-list">
        {addresses.length === 0 ? (
          <p className="no-address">No addresses found. Add your first address!</p>
        ) : (
          addresses.map(address => (
            <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
              {address.isDefault && <span className="default-badge">Default</span>}
              
              <h3>{address.name}</h3>
              <p className="phone">{address.phone}</p>
              <p className="street">{address.street}</p>
              <p className="location">{address.city}, {address.state} - {address.pincode}</p>
              
              <div className="address-actions">
                <button onClick={() => handleEdit(address)} className="edit-btn">
                  Edit
                </button>
                
                {!address.isDefault && (
                  <button onClick={() => setDefaultAddress(address.id)} className="default-btn">
                    Set as Default
                  </button>
                )}
                
                <button onClick={() => deleteAddress(address.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}