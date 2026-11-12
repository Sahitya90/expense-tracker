
//this is the array  that will hold all
//  the expenses, I am also entering some
//  expneses so that whenever you refresh you don't
//  need to enter expenses by your own to see how
//  the list is getting displayed and also accessing the expensecard
let expenses = [
    {
        id: 1,
        expenseName: "Monthly Mess Bill",
        description: "Advance payment for food and dining",
        date: "1/10/2026",
        category: "necessary",
        expenseAmount: 3500
    },
    {
        id: 2,
        expenseName: "Stationery & Notebooks",
        description: "Registers and black pens for coursework notes",
        date: "5/10/2026",
        category: "extra",
        expenseAmount: 250
    },
    {
        id: 3,
        expenseName: "Weekend Groceries",
        description: "Snacks, milk, and fruits bought from local market",
        date: "15/10/2026",
        category: "necessary",
        expenseAmount: 640
    },
   
];

let currentId = 4;

//this sends all the expenses from the array
export const getAllExpenses = () => expenses;

// this is used to implement the feature of opening a expenseCard whenever a particular is chosen from the list 
export const getExpenseById = (id) => {
    return expenses.find((expense) => expense.id === id);
};

//to add new expense with all the necessary details of the expense
export const addExpense = (expenseData) => {
    currentId++;
    const newExpense = {
        id: currentId,
        expenseName: expenseData.expenseName,
        description: expenseData.description,
        date: expenseData.date || new Date().toISOString(),
        category: expenseData.category,
        expenseAmount: expenseData.expenseAmount,
    };
    expenses.push(newExpense);
    return newExpense;
};

// if the user wants to modify the expense this will help him modify it
export const updateExpense = (id, expenseData) => {

    console.log("BACKEND RECEIVED EXPENSE DATA", expenseData);

    //first find the expense that the user wants to modify
    const targetIndex = expenses.findIndex((expense) => expense.id === id);
    if (targetIndex === -1) return null;

    //once got the index of the expense in the array that has to be modified then use it to get the hold of actual expense
    const targetExpense = expenses[targetIndex];

    //create a new object, then update the fields which user wants to be changed
    const updated = {
        id: id,
        //if a field has been left empty by the user in the update form then we keep the previous value of this field secure 
        expenseName: expenseData.expenseName || targetExpense.expenseName,
        description: expenseData.description || targetExpense.description,
        date: expenseData.date || targetExpense.date,
        expenseAmount: expenseData.expenseAmount !== undefined ? expenseData.expenseAmount : targetExpense.expenseAmount,
        category: (expenseData.category && expenseData.category.trim() !== "") 
            ? expenseData.category 
            : targetExpense.category,
    };

    //once updated then, uploaded this object at the exact index from where we choose the expense in the first place.
    expenses[targetIndex] = updated;
    return updated;
};


// when the user wants to delete a expense 
export const deleteExpense = (id) => {
    //first find the expense using the id passed
    const expenseIndex = expenses.findIndex((expense) => expense.id == id);
    if (expenseIndex === -1){ 
        return null;
    }else{

    //once the index of the expense to be deleted is found, then use .splice to delete it from the array

    expenses.splice(expenseIndex, 1);
    }
};