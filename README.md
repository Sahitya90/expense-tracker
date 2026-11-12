# expense-tracker
It is a responsive, web application built with React.js and Node.js(Express)  designed to help users track their expenses.


Features: 
1) CRUD Operations: It offers all CRUD operations, one can add a expense, view details about a expense in form cards, update a existing expense, and
   delete a expense if one wants to.
2) Search & Filtering:  filter expenses by name and also sort by category using a dropdown menu.
3) Category-Wise Total & Summary: Automatically calculates the total spending, transaction counts, and breaks down expenditures per category that helps one to know how they spend for a particular cause/category.
4) Responsive UI: Built with component-level , and browser side validation.


Tech Stack : 
Frontend : React.js(v19.3.1), Vite, CSS3 
Backend : Node.js(v24.12.0), Express(v5.3.0), RESTful API architecture
Data Handling : The data about the expenses including all the details is stored in an array within the application memory.


API Endpoints : 

1) /expenses =>  Method : GET, Description : Fetch all the expense records.
2) /expenses/:id =>  Method : GET, Description : Fetch a particular expense using its ID, Parameter : id.
3) /modifyExpense/:id =>  Method : POST, Description : Modify a particular expense item, Paramter: {expenseName, expenseAmount, description, date, category}.
4) /addExpense =>  Method : POST, Description : Add a new expense item, Paramater : {expenseName, expenseAmount, description, date, category}.
5) /delete/:id =>  Method : DELETE, Description : Delete an expense by ID, Parameter: id.



Project Structure :

expense-tracker
  -src
    -assests
      -css
        -ExpenseFilter.css
        -ExpenseList.css
        -ExpenseSummary.css
        -HomePage.css
        -ModifyExpense.css
        -Navbar.css
        -NewExpense.css
    -Components
      -ExpenseFilter.jsx
      -ExpenseList.jsx
      -ExpenseSummary.jsx
      -ModifyExpense.jsx
      -NavBar.jsx
      -NewExpense.jsx
    -pages
      -HomePage.jsx
    -Services
      -Backend.js
      -ExpenseService.js
    -app.jsx
    -main.jsx
  -README.md


Installation Instructions : 

  Prerequisites: Node.js installed on your system.

  1) Clone the Repository:
       git clone https://github.com/Sahitya90/expense-tracker.git
       cd expense-tracker

  2) Start the Backend Server :
       First locate to the Services folder :
           1) cd expense-tracker     
           2) cd src
           3) cd Services
           4) npm i express
           5) node Backend.js

     (The Backend server runs on http://localhost:5000)

  4) Start the Frontend Development Server
        cd expense-tracker
        npm install
        npm run dev

     (The React applications runs on http://localhost:5173)


Usage Guide : 
   1) Dashboard Overview : View overall spending, total counts, and category breakdown.
   2) Add Expense : Click " + Add New Expense", fill in the details, and hit Add.
   3) Filter & Search : Type in the search bar or select a category dropdown option to filter instantly.
   4) Expand & Manage : Click any expense card to view its details such as description, data, and category, or to click Modify or Delete.
           

  
    
    
        
