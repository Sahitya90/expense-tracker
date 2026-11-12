import React from 'react';
import '../assets/css/ExpenseFilter.css';


// this component receives search and category filter states and also categories list as props
const ExpenseFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
    return (
        <div className="expense-filter-container">
            {/* this input updates the search state in real time, everytime a key is pressed. */}
            <input
                type="text"
                placeholder="Search by expense name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-search"
            />
            
            {/* this provides a dropdown menu, this updates the selected category state when a new option is chosen */}
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
            >
                <option value="">All Categories</option>
                {/* this helps render the options for each unique category available */}
                {categories.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ExpenseFilter;