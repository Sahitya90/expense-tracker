import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {
    getAllExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
} from './ExpenseService.js'

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/expenses', (req, res) => {
    res.json(getAllExpenses());
});

app.get("/expenses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const expense = getExpenseById(id);

    if(!expense){
        return res.status(404).json({error: "The Expense is not present"});
    }

    res.json(expense);
});

app.post("/addExpense", async(req, res) => {
    try{
        const newExpense = addExpense(req.body);
        res.status(201).json(newExpense);
    }catch(error){
        console.error(error);
        res.status(500).json({error: " Internal Server Error"});
    }
})

//the post request that takes the id from the user's interaction and then,   
app.post("/modifyExpense/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        //passing the id to the updateExpense function and the new data that the user wants to be modified
        const modifiedExpense = updateExpense(id, req.body);

        if (!modifiedExpense) {
            return res.status(404).json({ error: "Expense not found for modification" });
        }

        //then we pass this modified expense ot the react 
        res.json(modifiedExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE expense
app.delete("/delete/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        //just passing the id to the function to delete the expense
        const deletedItem = deleteExpense(id);

        if (!deletedItem) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({
            message: "Post deleted successfully",
            deletedItems: deletedItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});


