function loadSalesReport() {
    var sales = JSON.parse(localStorage.getItem('sales')) || [];
    var reportTable = document.getElementById('sales-report');
    reportTable.innerHTML = '';
  
    sales.forEach(function(sale) {
      if (sale.completed) {
        var row = document.createElement('tr');
        row.innerHTML = `
          <td>${sale.clientName}</td>
          <td>${sale.salesperson}</td>
          <td>${sale.address}</td>
          <td>${sale.referencePoint}</td>
          <td>${sale.observation}</td>
          <td>${sale.products.map(p => p.name + ' (' + p.value.toFixed(2) + ')').join(', ')}</td>
          <td>${sale.total.toFixed(2)}</td>
          <td>${sale.paymentMethod}</td>
          <td>${new Date(sale.date).toLocaleString()}</td>
        `;
        reportTable.appendChild(row);
      }
    });
  }
  
  window.onload = function() {
    loadSalesReport();
  }
  