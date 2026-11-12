import React, {useState} from 'react';
import '../assets/css/NewExpense.css';


const NewExpense = ({onAdd, onCancel}) => {

    //this state capture the inputs done by the user
    const[expenseName, setExpenseName] = useState("");
    const[expenseAmount, setExpenseAmount] = useState("");
    const[description, setDescription] = useState("");
    const[date, setDate] = useState("");
    const[category, setCategory] = useState("");

    //handles the submissionn of the new expense form
    const handleSubmit = (e) =>{

        // stops the default reload 
        e.preventDefault();

        //packaging the entered data into a object
        onAdd({
            expenseName,
            // here we are converting the amount string in to a float number
            expenseAmount: parseFloat(expenseAmount),
            description,
            date,
            category,
        })
    }

    return(
    <div className='main-container'>
        <form  
        onSubmit={handleSubmit}
        className="form-contain">

            <h3>Add your New Expenses :</h3>
            <div>
                <label>Expense Name:</label>
                <input type="text" placeholder='Enter your expenses' onChange={(e)=>setExpenseName(e.target.value)} required />
            </div>
            <div>
                <label>Expense Amount:</label>
                {/* 'required' ensures the form is not submitted if this field is left empty */}
                <input type="number" placeholder='Enter the Amount' onChange = {(e) => setExpenseAmount(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" placeholder='Description of the Expense' onChange = {(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Date:</label>
                <input type="text" placeholder='Date' onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div>
                <label>Expense Category:</label>
                <input type="text" placeholder='Which category do you want to put this expense in ?' 
                onChange={(e) => setCategory(e.target.value)}/>
            </div>
            <div className="btn">
                <div>
                    <button className='btn-add' type='submit'>Add</button>
                </div>
                <div>
                    <button className='btn-cancel' onClick = {onCancel}>Cancel</button>
                </div>
            </div>
        </form>

    </div>);
}

export default NewExpense;