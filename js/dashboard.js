function createUser() {
    var username = document.getElementById('new-username').value;
    var password = document.getElementById('new-password').value;
    var permissions = document.getElementById('permissions').value;
  
    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password, role: permissions });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário criado com sucesso!');
  }
  
  function saveSettings() {
    var storeName = document.getElementById('store-name').value;
    var storeCNPJ = document.getElementById('store-cnpj').value;
  
    localStorage.setItem('storeName', storeName);
    localStorage.setItem('storeCNPJ', storeCNPJ);
    alert('Configurações salvas com sucesso!');
  }
  
  window.onload = function() {
    document.getElementById('store-name').value = localStorage.getItem('storeName') || 'Drogaria do Vicente';
    document.getElementById('store-cnpj').value = localStorage.getItem('storeCNPJ') || '00.000.000/0000-00';
  }
  