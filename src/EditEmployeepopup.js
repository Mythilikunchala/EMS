import React, { useState, useEffect } from 'react';

function EditEmployeePopup({ employeeId, show, handleClose }) {
  const [employee, setEmployee] = useState({});
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editGender, setEditGender] = useState('');
  const [editAddress, setEditAddress] = useState('');

  useEffect(() => {
    if (show && employeeId) {
      // Replace with your API call to get employee data
      fetch(`https://localhost:7113/api/Employee/${employeeId}`)
        .then((response) => response.json())
        .then((data) => {
          // Set employee data in state
          setEmployee(data);
          setEditId(data.id);
          setEditName(data.name);
          setEditPhone(data.phone);
          setEditGender(data.gender);
          setEditAddress(data.address);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [show, employeeId]);

  return (
    <div className={`popup ${show ? 'active' : ''}`}>
      <div className="popup-inner">
        {/* Edit form */}
        <form>
          <div className="form-group">
            <label>ID:</label>
            <input type="text" value={editId} onChange={(e) => setEditId(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <input type="text" value={editGender} onChange={(e) => setEditGender(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} />
          </div>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployeePopup;
