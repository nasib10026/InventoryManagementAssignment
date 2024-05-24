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

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', addNewProduct);


function clearProductForm() {
  document.getElementById('productId').value = '';
  document.getElementById('productName').value = '';
  document.getElementById('productQuantity').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productVendor').value = '';
  document.getElementById('productCategory').value = '';
}

function addNewProduct(e) {
  e.preventDefault()

  const name = document.getElementById('productName').value;
  const quantity = document.getElementById('productQuantity').value;
  const price = document.getElementById('productPrice').value;
  const vendor = document.getElementById('productVendor').value;
  const category = document.getElementById('productCategory').value;
  const productId = document.getElementById('productId').value;

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

  clearProductForm();
  renderProducts(initialProducts);
}

function renderProducts(products) {
  const tbody = document.getElementById('productTableBody');
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
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onclick="editProduct(${index})">Edit</button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onclick="removeProduct(${index})">Remove</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function removeProduct(index) {
  initialProducts.splice(index, 1);
  renderProducts(initialProducts);
}

function editProduct(index) {
  const product = initialProducts[index];
  document.getElementById('productId').value = index;
  document.getElementById('productName').value = product.name;
  document.getElementById('productQuantity').value = product.quantity;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productVendor').value = product.vendor;
  document.getElementById('productCategory').value = product.category;
}

// Initial render
renderProducts(initialProducts);