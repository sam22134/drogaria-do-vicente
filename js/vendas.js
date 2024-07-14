function calculateTotal() {
    var productValues = document.getElementsByClassName('product-value');
    var total = 0;
    for (var i = 0; i < productValues.length; i++) {
      total += parseFloat(productValues[i].value) || 0;
    }
    document.getElementById('total').value = total.toFixed(2);
  }
  
  function addProductField() {
    var productList = document.getElementById('product-list');
    var productField = `
      <input type="text" class="product-name" placeholder="Nome do Produto" required>
      <input type="number" class="product-value" placeholder="Valor do Produto" oninput="calculateTotal()">
    `;
    productList.insertAdjacentHTML('beforeend', productField);
  }
  
  function saveSale() {
    var salesperson = document.getElementById('salesperson').value;
    var clientName = document.getElementById('client-name').value;
    var address = document.getElementById('address').value;
    var referencePoint = document.getElementById('reference-point').value;
    var observation = document.getElementById('observation').value;
    var paymentMethod = document.getElementById('payment-method').value;
  
    var products = [];
    var productNames = document.getElementsByClassName('product-name');
    var productValues = document.getElementsByClassName('product-value');
    for (var i = 0; i < productNames.length; i++) {
      products.push({
        name: productNames[i].value,
        value: parseFloat(productValues[i].value) || 0
      });
    }
  
    var total = parseFloat(document.getElementById('total').value);
  
    var sales = JSON.parse(localStorage.getItem('sales')) || [];
    sales.push({
      salesperson,
      clientName,
      address,
      referencePoint,
      observation,
      products,
      total,
      paymentMethod,
      date: new Date()
    });
    localStorage.setItem('sales', JSON.stringify(sales));
    document.getElementById('sale-message').style.display = 'block';
    setTimeout(function() {
      document.getElementById('sale-message').style.display = 'none';
    }, 3000);
  }
  
  function loadSales() {
    var sales = JSON.parse(localStorage.getItem('sales')) || [];
    var salesList = document.getElementById('sale-details');
    salesList.innerHTML = '';
  
    sales.forEach(function(sale, index) {
      var saleElement = document.createElement('div');
      saleElement.classList.add('box');
      saleElement.innerHTML = `
        <p>Cliente: ${sale.clientName}</p>
        <p>Atendente: ${sale.salesperson}</p>
        <p>Endereço: ${sale.address}</p>
        <p>Ponto de Referência: ${sale.referencePoint}</p>
        <p>Observação: ${sale.observation}</p>
        <p>Produtos: ${sale.products.map(p => p.name + ' (' + p.value.toFixed(2) + ')').join(', ')}</p>
        <p>Total: ${sale.total.toFixed(2)}</p>
        <p>Forma de Pagamento: ${sale.paymentMethod}</p>
        <p>Data e Hora: ${new Date(sale.date).toLocaleString()}</p>
        <button onclick="faturar(${index})">Faturar</button>
      `;
      salesList.appendChild(saleElement);
    });
  }
  
  function faturar(index) {
    var sales = JSON.parse(localStorage.getItem('sales')) || [];
    var sale = sales[index];
  
    document.getElementById('total-faturar').innerText = 'Total: ' + sale.total.toFixed(2);
    document.getElementById('faturar').style.display = 'block';
  
    document.getElementById('finalize-sale').onclick = function() {
      finalizeSale(index);
    };
  }
  
  function finalizeSale(index) {
    var sales = JSON.parse(localStorage.getItem('sales')) || [];
    var sale = sales[index];
  
    var paid = parseFloat(document.getElementById('paid').value);
    var change = paid - sale.total;
  
    sale.cashier = document.getElementById('cashier').value;
    sale.paid = paid;
    sale.change = change;
    sale.completed = true;
  
    sales[index] = sale;
    localStorage.setItem('sales', JSON.stringify(sales));
  
    document.getElementById('finalize-message').style.display = 'block';
    setTimeout(function() {
      document.getElementById('finalize-message').style.display = 'none';
      document.getElementById('faturar').style.display = 'none';
      loadSales();
    }, 3000);
  }
  
  window.onload = function() {
    loadSales();
  }
  