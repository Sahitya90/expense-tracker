import React, {useState, useEffect} from 'react';
import '../assets/css/HomePage.css'
import NavBar from '../Components/NavBar';
import ExpenseList from '../Components/ExpenseList';
import ModifyExpense from '../Components/ModifyExpense';
import NewExpense from '../Components/NewExpense';
import ExpenseSummary from '../Components/ExpenseSummary';
import ExpenseFilter from '../Components/ExpenseFIlter';

const HomePage =()=>{
    const [expenses, setExpenses] = useState([]);
    const[editingExpense, setEditingExpense] = useState(null);
    const[newExpense, setNewExpense] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");



    //here we use useEFfect hook to fetch all the expenses from the array stored in the backend
    useEffect(() => {
    fetch('http://localhost:5000/expenses')
      .then((res) => res.json())
      .then((data) => {
       
          setExpenses(data);
        
      })
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);




    //this handles the deletion of the expenses by sending the delete request to the server and 
    //then updating the local state
    const handleDelete = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        // Remove the deleted item from state so the UI updates instantly
        setExpenses((prevExpenses) => prevExpenses.filter((item) => item.id != id));
      })
      .catch((err) => console.error("Error deleting expense:", err));
  };

  //this mounts the expense that we want to edit to the editingExpense state, so that the modify form opens
  const handleStartEditing = ( expenses) => {
    console.log("Expense beign edited:", expenses);
    setEditingExpense(expenses);

  };

  //once the backend has successfully updated the expense 
  const handleUpdateSuccess = (updatedItem) => {
    setExpenses((prev) => 
    prev.map((item)=> item.id == updatedItem.id ? { ...updatedItem} : item
    )
  );
    setEditingExpense(null);   // this closes the modify form and returns to the list
  };

  //this sends a post request which contains the data that has been entered by the user in the new expense form
  const handleNewExpense = (expenseData) => {

    fetch(`http://localhost:5000/addExpense`,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(expenseData),
    })
    .then((res)=> res.json())
    .then((newlyCreatedExpense) =>{
      setExpenses(prevExpenses => [...prevExpenses, newlyCreatedExpense]);
      setNewExpense(false);
    } )
    .catch((err) => console.error("Error adding new expense :", err));
  };

  // this is generating the category list every time, so the dropdown menu always relfect whatever categories currently exist
  //first using .map we get hold of every expense and pull out just the category thing from it
  //then we use filter to remove any false values like undefined and null
  //then we pass all this in Set that automatically removes the duplicate values.
  // then again we use (...) spread operator to convert it again into a array. 
  const uniqueCategories = [...new Set(expenses.map(item => item.category).filter(Boolean))];

    // this has the logic that we use to filter the expenses based on what the user types
    // when we type a expense in the search or just select a category from the drop down, this logic helps the react decide what to show on the screen
    const filteredExpenses = expenses.filter(item => {
      
      //this is for expense name filter
      //this converts expense name into lowercase and then compares it with what you typed in the search bar which is also converted to lowercase, this helps us the keep the comparison valid
        const name = item.expenseName ?  item.expenseName.toLowerCase().trim() : "";
        const search = searchTerm.toLowerCase().trim();
        const matchesName = name.includes(search);
        //this helps with the dropdown menu
        //if selectedCategory is empty, means all categories is selected then we pass all the items and if not then we only pass the selectedCategory
        const itemCategory = item.category ?  item.category.trim() : "";
        const selected = selectedCategory ? selectedCategory.trim() : "";
        const matchesCategory = selected === "" || itemCategory === selected;
        //this is to dual check whether the expense you searched for has a category or not, or a catgory choosen has any expenses or not
        return matchesName && matchesCategory;
    });





    return(

        <div className="home-page">
            <NavBar/>

            <main className='dashboard-content'>
              
                <h2>Dashboard Overview</h2>

                {/* this opens the new expense button only when not currently adding or editing an expense/item*/}
                {!newExpense && !editingExpense && (
                  <button
                    onClick={() => setNewExpense(true)}
                    className='btn-new'>
                    + Add New Expense
                  </button>
                )}

                {/* this adds a conditional rendering, opens the newExpense component form if the newExpense state is not null*/}
                {newExpense ? (
                  <NewExpense
                    onAdd = {handleNewExpense}
                    onCancel ={() => setNewExpense(false)}
                    />
                ): editingExpense ? (

                  
                    <ModifyExpense 
                    
                        expense = {editingExpense}
                        onUpdateSuccess ={handleUpdateSuccess}
                        onCancel={() => setEditingExpense(null)}/>
            ) : (
            
              <>

                        {/* this opens the filter component */}             
                        <ExpenseFilter 
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            categories={uniqueCategories}
                        />
                        {/* this opens the expenseList component*/}
                        <ExpenseList 
                        expenses ={filteredExpenses}
                        onDelete ={handleDelete}
                        onModify = {handleStartEditing}
                        />

                        {/* this opens the expense summary component*/}
                        <ExpenseSummary expenses={expenses} />
                        </>
            )}
          
            </main>
        </div>
    );
}

export default HomePage;