// Get form, expense list, and total amount elements 
const expenseForm = document.getElementById("expense-form"); 
const expenseList = document.getElementById("expense-list"); 
const totalAmountElement = document.getElementById("total-amount"); 

// Initialize expenses array from localStorage 
let expenses = JSON.parse(localStorage.getItem("expenses")) || []; 

// Function to render expenses in tabular form 
function renderExpenses() { 
	// Clear expense list 
	expenseList.innerHTML = ""; 

	// Initialize total amount 
	let totalAmount = 0; 

	// Loop through expenses array and create table rows 
	for (let i = 0; i < expenses.length; i++) { 
		const expense = expenses[i]; 
		const expenseRow = document.createElement("tr"); 
		expenseRow.innerHTML = ` 
			<td>${expense.name}</td> 
			<td>$${expense.amount}</td> 
			<td class="edit-btn" data-id="${i}">Edit</td>
			<td class="delete-btn" data-id="${i}">Delete</td> 
		`; 
		expenseList.appendChild(expenseRow); 

		// Update total amount 
		totalAmount += expense.amount; 
	} 

	// Update total amount display 
	totalAmountElement.textContent = totalAmount.toFixed(2); 

	// Save expenses to localStorage 
	localStorage.setItem("expenses", JSON.stringify(expenses)); 
} 

// Function to add expense 
function addExpense(event) { 
	event.preventDefault(); 

	// Get expense name and amount from form 
	const expenseNameInput = document.getElementById("expense-name"); 
	const expenseAmountInput = document.getElementById("expense-amount"); 
	const expenseName = expenseNameInput.value; 
	const expenseAmount = parseFloat(expenseAmountInput.value); 

	// Clear form inputs 
	expenseNameInput.value = ""; 
	expenseAmountInput.value = ""; 

	// Validate inputs 
	if (expenseName === "" || isNaN(expenseAmount)) { 
		alert("Please enter valid expense details."); 
		return; 
	} 

	// Create new expense object 
	const expense = { 
		name: expenseName, 
		amount: expenseAmount, 
	}; 

	// Add expense to expenses array 
	expenses.push(expense); 

	// Render expenses 
	renderExpenses(); 
} 

// Function to delete expense 
function deleteExpense(event) { 
	if (event.target.classList.contains("delete-btn")) { 
		// Get expense index from data-id attribute 
		const expenseIndex = parseInt(event.target.getAttribute("data-id")); 

		// Remove expense from expenses array 
		expenses.splice(expenseIndex, 1); 

		// Render expenses 
		renderExpenses(); 
	} 
} 

// Function to handle editing of expense 
function editExpense(event) { 
	if (event.target.classList.contains("edit-btn")) { 
		// Get expense index from data-id attribute 
		const expenseIndex = parseInt(event.target.getAttribute("data-id")); 

		// Retrieve the expense object 
		const expense = expenses[expenseIndex];

		// Prompt user to enter new details
		const newExpenseName = prompt("Enter the new expense name:", expense.name);
		const newExpenseAmount = parseFloat(prompt("Enter the new amount:", expense.amount));

		// Update expense if inputs are valid
		if (newExpenseName !== null && newExpenseAmount !== null && !isNaN(newExpenseAmount)) {
			expense.name = newExpenseName;
			expense.amount = newExpenseAmount;

			// Render expenses 
			renderExpenses(); 
		}
	} 
}

// Add event listeners 
expenseForm.addEventListener("submit", addExpense); 
expenseList.addEventListener("click", deleteExpense); 
expenseList.addEventListener("click", editExpense); 

// Render initial expenses on page load 
renderExpenses();
