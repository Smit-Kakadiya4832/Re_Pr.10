import './App.css';
import { db } from './firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function App() {
  const tbl = collection(db, 'user');
  const [record, setRecord] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eidtid, setEidtid] = useState('');

  const getUser = async () => {
    const data = await getDocs(tbl);
    setRecord(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const onsubmit = async () => {
    if (eidtid) {
      const userDoc = doc(db, 'user', eidtid);
      const newFields = { name: name, phone: phone, email: email };
      await updateDoc(userDoc, newFields);
    } else {
      await addDoc(tbl, { name: name, email: email, phone: phone });
      alert('Record successfully inserted');
    }
    setName('');
    setEmail('');
    setPhone('');
    setEidtid('');
    getUser();
  };

  const ondelete = async (id) => {
    const userDoc = doc(db, 'user', id);
    await deleteDoc(userDoc);
    getUser();
  };

  const onedit = (id, email, phone, name) => {
    setName(name);
    setEmail(email);
    setPhone(phone);
    setEidtid(id);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <div className="form-container">
        <h2 style={{ color: 'royalblue' }}>User Record Management</h2>
        <div className="form-inputs">
          <div className="form-input">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="form-input">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-input">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
        </div>
        <div className="form-actions">
          {eidtid ? (
            <button style={{ backgroundColor: 'royalblue', color: 'white' }} onClick={onsubmit}>
              Edit
            </button>
          ) : (
            <button style={{ backgroundColor: 'royalblue', color: 'white' }} onClick={onsubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
      <Table bordered hover variant="dark" className="table-dark" border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {record.map((val) => {
            const { id, name, email, phone } = val;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>
                  <button
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => ondelete(id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={() => onedit(id, email, phone, name)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;