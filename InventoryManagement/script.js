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

function getId(id) {
  return document.getElementById(id);
}

const submitButton = getId('submit');
submitButton.addEventListener('click', addNewProduct);

function clearProductForm() {
  getId('productId').value = '';
  getId('productName').value = '';
  getId('productQuantity').value = '';
  getId('productPrice').value = '';
  getId('productVendor').value = '';
  getId('productCategory').value = '';
}

function addNewProduct(e) {
  e.preventDefault();

  const name = getId('productName').value;
  const quantity = getId('productQuantity').value;
  const price = getId('productPrice').value;
  const vendor = getId('productVendor').value;
  const category = getId('productCategory').value;
  const productId = getId('productId').value;
  if (!checkValidity()) {
    return;
  };

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

function removeProduct(index) {
  const confirmDelete = confirm('Are you sure you want to delete this product?');
  if (confirmDelete) {
    initialProducts.splice(index, 1);
    renderProducts(initialProducts);
  }
}


function editProduct(index) {
  const product = initialProducts[index];
  getId('productId').value = index;
  getId('productName').value = product.name;
  getId('productQuantity').value = product.quantity;
  getId('productPrice').value = product.price;
  getId('productVendor').value = product.vendor;
  getId('productCategory').value = product.category;
}

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


// Initial render
renderProducts(initialProducts);