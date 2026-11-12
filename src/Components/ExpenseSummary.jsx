import React from 'react';
import '../assets/css/ExpenseSummary.css';

//receives the expenses array as a prop,
const ExpenseSummary = ({ expenses = [] }) => {
    // 1. Calculate overall metrics
    //this helps in calculating the expenses
    //expense.reduce() - this loops through every item in your
    //expenses array to sum a final value
    //sum is variable defined within this function
    //Number helps in setting a fallback in the condition if a expense is returned as a string or is missing, it will be safely converted into a number 
    const totalAmount = expenses.reduce((sum, item) => sum + Number(item.expenseAmount || 0), 0);
    // to caluclate how many expneses are their in the array
    const totalCount = expenses.length;

    // here we calculate the total based on the category
    const categoryTotals = expenses.reduce((acc, item) => {
        //this is to assign category to a particular item/expense, if it  already doesn't have any category decalred, then we can just put it in Uncategorized
        const category = item.category && item.category.trim() !== "" ? item.category : "Uncategorized";
        //we check if the category we are viewing already exists in our object or not
        //if it exists then we the current expense amount into the sum till now for that particular category 
        acc[category] = (acc[category] || 0) + Number(item.expenseAmount || 0);
        //return the value in the accumulator object or variable
        return acc;
    }, {});

    return (
        <div className="expense-summary-container">
            <h3>Expense Summary</h3>
            
            {/* This generates a div card where we can display the summary. */}
            <div className="summary-cards-row">
                <div className="summary-card">
                    <span className="card-title">Total Spent</span>
                    <span className="card-value">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-card">
                    <span className="card-title">Total Transactions</span>
                    <span className="card-value">{totalCount}</span>
                </div>
            </div>

            {/* This generates a div card where we can display the category wise total.*/}
            <div className="category-breakdown">
                <h4>Total Per Category</h4>
                {/* this js operations is used here to check for empty data*/}
                {/* Object.keys is used here to convert the categoryTotals object's key back into array */}
                {Object.keys(categoryTotals).length === 0 ? (
                    <p className="no-data">No expenses recorded yet.</p>
                ) : (
                    <ul className="category-list">
                        {/* object cannot be looped directly through map, so this function convert our object 
                        into a array of arrays, where each array contains a key value pair of (categoryName, toatlAmount) */}
                        {Object.entries(categoryTotals).map(([category, amount]) => (
                            <li key={category} className="category-item">
                                <span className="cat-name">{category}</span>
                                {/* .toFixed(2) here makes sure that the decimal place returned is just 2 */}
                                <span className="cat-amount">₹{amount.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ExpenseSummary;