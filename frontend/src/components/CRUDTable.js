// src/components/CRUDTable.js
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const CRUDTable = () => {
  const [shoes, setShoes] = useState([]);
  
  // Disable the ESLint warning for the next line
  // eslint-disable-next-line no-unused-vars
  const [deletedShoes, setDeletedShoes] = useState([]);
  
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [selectedShoe, setSelectedShoe] = useState(null);

  const fetchShoes = async () => {
    const response = await fetch('http://localhost:3001/shoes');
    const data = await response.json();
    setShoes(data);
  };

  const fetchDeletedShoes = async () => {
    const response = await fetch('http://localhost:3001/deleted-shoes');
    const data = await response.json();
    setDeletedShoes(data);
  };

  useEffect(() => {
    fetchShoes();
    fetchDeletedShoes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`http://localhost:3001/shoes/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, size, brand, price, contact }),
        });
        toast.success('Shoe updated successfully!', { duration: 5000 });
      } else {
        await fetch('http://localhost:3001/shoes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, size, brand, price, contact }),
        });
        toast.success('Shoe added successfully!', { duration: 5000 });
      }
      setName('');
      setSize('');
      setBrand('');
      setPrice('');
      setContact('');
      setEditingId(null);
      fetchShoes();
    } catch (error) {
      toast.error('Failed to save shoe!', { duration: 5000 });
    }
  };

  const handleEdit = (shoe) => {
    setName(shoe.name);
    setSize(shoe.size);
    setBrand(shoe.brand);
    setPrice(shoe.price);
    setContact(shoe.contact);
    setEditingId(shoe.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you wanted to delete that Shoe Details?")) {
      try {
        // Fetch the shoe to be deleted
        const shoeToDelete = shoes.find(shoe => shoe.id === id);
        
        // Send the deleted shoe to the second database
        await fetch('http://localhost:3001/deleted-shoes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(shoeToDelete),
        });

        // Now delete the shoe from the main database
        await fetch(`http://localhost:3001/shoes/${id}`, { method: 'DELETE' });
        toast.success('Shoe deleted successfully!', { duration: 5000 });
        fetchShoes();
      } catch (error) {
        toast.error('Failed to delete shoe!', { duration: 5000 });
      }
    }
  };

  const handleRead = (shoe) => {
    setSelectedShoe(shoe);
  };

  const handleCloseDetails = () => {
    setSelectedShoe(null);
  };

  return (
    <div className="crud-table">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} required />
        <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Shoe</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shoes.map((shoe) => (
            <tr key={shoe.id}>
              <td>{shoe.name}</td>
              <td>{shoe.size}</td>
              <td>{shoe.brand}</td>
              <td>${parseFloat(shoe.price).toFixed(2)}</td>
              <td>{shoe.contact}</td>
              <td>
                <button onClick={() => handleRead(shoe)}>Read</button>
                <button onClick={() => handleEdit(shoe)}>Edit</button>
                <button onClick={() => handleDelete(shoe.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedShoe && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseDetails}>&times;</span>
            <h2>Shoe Details</h2>
            <p><strong>Name:</strong> {selectedShoe.name}</p>
            <p><strong>Size:</strong> {selectedShoe.size}</p>
            <p><strong>Brand:</strong> {selectedShoe.brand}</p>
            <p><strong>Price:</strong> ${parseFloat(selectedShoe.price).toFixed(2)}</p>
            <p><strong>Contact:</strong> {selectedShoe.contact}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRUDTable;