import React, {useState, useEffect}  from 'react';
import '../assets/css/ExpenseList.css';

const ExpenseList = ({expenses, onDelete, onModify}) => {

    //to track which card is currently opened, null if no card is expanded 
    const [expandedId, setExpandedId] = useState(null);

    // this function helps with toggling of cards, based on their Id
    const toggleCard = (id) => {

        setExpandedId(expandedId === id ? null : id);
    };

    //fallback option, if the expenses list is  empty or undefined
    if (!expenses || expenses.length === 0) {
     return <p className="no-expenses">No expenses found.</p>;
  }

    return(
        <div className='expense-list-container'>
            <h3>Your Expenses</h3>

            <div className="expense-card-wrapper">
                {expenses.map((expense)=>{
                    const isExpanded = expandedId === expense.id;
                    
                    return(
                        <div
                        key ={expense.id}
                        className='expense-card'
                        onClick ={() => toggleCard(expense.id)}>
                            <div className="summary-row">
                                <span className='expense-name'>{expense.expenseName}</span>
                                <span className='amount'>:  {expense.expenseAmount}</span>
                            </div>
                            {/* this handles the feature of only showing details  like description, date, category and buttons like delete and add only if the card is expanded */}
                            {isExpanded && (
                            <div className="details-dropdown" onClick = {(e) => e.stopPropagation()}>
                                <p><strong>Description: </strong>{expense.description}</p>
                                <p><strong>Date: </strong>{expense.date}</p>
                                <p><strong>Category: </strong>{expense.category}</p>


                                <div className="card-actions">
                                    <button className='btn-modify' onClick ={() => {onModify(expense)}}>Modify</button>
                                    <button className='btn-delete' onClick = {() => onDelete(expense.id)}>Delete</button>
                                </div>
                            </div>
                            )}
                        </div>
                    )})}
            </div>
            

            
            
        </div>
    )
}
export default ExpenseList;