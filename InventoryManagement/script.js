const initialProducts = [{
    name: 'Laptop',
    quantity: 10,
    price: 800,
    vendor: 'Dell',
    category: 'Electronics',
  },
  {
    name: 'Phone',
    quantity: 25,
    price: 500,
    vendor: 'Samsung',
    category: 'Electronics',
  },
  {
    name: 'Desk Chair',
    quantity: 15,
    price: 150,
    vendor: 'Ikea',
    category: 'Furniture',
  },
];

//to keep track of expense
let expense;

const submitButton = getId('submit');
submitButton.addEventListener('click', addNewProduct);

//to get all the element ids
function getId(id) {
  return document.getElementById(id);
}

//this function is to clear the input form
function clearProductForm() {
  getId('productId').value = '';
  getId('productName').value = '';
  getId('productQuantity').value = '';
  getId('productPrice').value = '';
  getId('productVendor').value = '';
  getId('productCategory').value = '';
}

//function for adding new products
function addNewProduct(e) {
  //to prevent the page from refreshing 
  e.preventDefault();

  const name = getId('productName').value;
  const quantity = getId('productQuantity').value;
  const price = getId('productPrice').value;
  const vendor = getId('productVendor').value;
  const category = getId('productCategory').value;
  const productId = getId('productId').value;

  //checks if all the input boxes are filled or not
  if (!checkValidity()) {
    return;
  };

  //decides whether to edit or push by examining id
  if (productId === '') {
    initialProducts.push({
      name,
      quantity,
      price,
      vendor,
      category
    });
  } else {
    const index = parseInt(productId);
    initialProducts[index] = {
      name,
      quantity,
      price,
      vendor,
      category
    };
  }

  //clears the form everytime before rendering
  clearProductForm();
  renderProducts(initialProducts);
  //expense being updated after every product added
  expense = calculateExpense();
  renderExpense(expense);
}

//this will show the products in the table
function renderProducts(products) {
  const tbody = getId('productTableBody');
  tbody.innerHTML = ''; // Clear existing rows

  products.forEach((product, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
    <td class="py-2 px-4 border-b text-center">${product.name}</td>
    <td class="py-2 px-4 border-b text-center">${product.quantity}</td>
    <td class="py-2 px-4 border-b text-center">$${product.price}</td>
    <td class="py-2 px-4 border-b text-center">${product.vendor}</td>
    <td class="py-2 px-4 border-b text-center">${product.category}</td>
    <td class="py-2 px-4 border-b text-center">
    <button class="bg-green-400 hover:bg-green-500 text-white font-semibold py-1 px-2 rounded" onclick="editProduct(${index})">Edit</button>
      <button class="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded" onclick="removeProduct(${index})">Remove</button>
    </td>
  `;

    tbody.appendChild(row);
  });
}

//function to remove products with a confirmation option
function removeProduct(index) {
  const confirmDelete = confirm('Are you sure you want to delete this product?');
  if (confirmDelete) {
    initialProducts.splice(index, 1);
    renderProducts(initialProducts);
  }
}

//function to fill the input boxes with values i want to edit
function editProduct(index) {
  const product = initialProducts[index];
  getId('productId').value = index;
  getId('productName').value = product.name;
  getId('productQuantity').value = product.quantity;
  getId('productPrice').value = product.price;
  getId('productVendor').value = product.vendor;
  getId('productCategory').value = product.category;
}

//this function checks if all the input boxes are filled or not
function checkValidity() {
  const fields = ['productName', 'productQuantity', 'productPrice', 'productVendor', 'productCategory'];
  for (const field of fields) {
    if (getId(field).value.trim() === '') {
      alert('Boxes Not filled');
      return false;
    }
  }
  return true;
}

//function to calculate total expense
function calculateExpense() {
  let totalSum = 0;
  initialProducts.forEach((product) => {
    totalSum += product.price * product.quantity;

  });
  return totalSum;

}

function renderExpense(expense) {
  const expenseElement = getId('totalExpense');
  expenseElement.innerText = `Total Expense is $${expense}`;
}

// Initial render
renderProducts(initialProducts);
expense = calculateExpense();
renderExpense(expense);