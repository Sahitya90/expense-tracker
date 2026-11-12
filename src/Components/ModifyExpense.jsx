import React, { useState } from 'react';
import '../assets/css/ModifyExpense.css';

//expense, onUpdateSuccess, onCanccel are three props passed to the Modify Expense component
const ModifyExpense = ({ expense, onUpdateSuccess, onCancel }) => {


  //Using useState we set the value for each field as either null or their previous value
  //for expenseName it will be either the name entered already or just a empty string
  const [expenseName, setExpenseName] = useState(expense.expenseName || '');
  //for  amount it will the exisiting one or just empty
  const [expenseAmount, setExpenseAmount] = useState(expense.expenseAmount || '');
  //just like name and amount, description and date all will remain same
  const [description, setDescription] = useState(expense.description || '');
  const [date, setDate] = useState(expense.date || '');
  const [category, setCategory] = useState(expense.category || '');

  const handleSubmit = (e) => {
    //to prevent the default rendering of the website when the form is submit 
    e.preventDefault();

    // this is to send the data to your backend for performing the operation of modification
   const obj = {
        expenseName,
        expenseAmount: parseFloat(expenseAmount),
        description,
        date,
        category,
    };

    console.log("FRONTEND PAYLOAD BEING SENT:", obj);

    //sends the data entered by the user to the server and updates the state based on the response received
    fetch(`http://localhost:5000/modifyExpense/${expense.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    })
    
      .then((res) => res.json())
      .then((updatedExpense) => {
        // this updates the main array in the homepage component, and makes the setExpenses to null, so that the modification window closes
        onUpdateSuccess(updatedExpense);
      })
      .catch((err) => console.error("Error modifying expense:", err));
  };

  return (
    <div className="modify-expense-container">
      <h3>Modify Expense</h3>
      <form onSubmit={handleSubmit} className='form-group'>
        
        <div>
          <label >Expense Name:</label>
          <input 
            type="text" 
            value={expenseName} 
            onChange={(e) => setExpenseName(e.target.value)} 
            required
          />
        </div>

        <div>
          <label >Amount (₹):</label>
          <input 
            type="number" 
            value={expenseAmount} 
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label >Description:</label>
          <input 
            type="text"
            /* this data from this values are then send to the server through the post request */
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Date:</label>
          <input 
            type="text" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>

         <div>
          <label>Category:</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
          />
        </div>

        <div className='btn'>
          <div>
          <button className='btn-submit' type="submit" >
            Save Changes
          </button>
          </div>
          <div>
          {/* this triggers the onCancel function which has been passed here as a prop */}
          <button className='btn-cancel' type="button" onClick={onCancel} >
            Cancel
          </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default ModifyExpense;