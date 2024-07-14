function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var users = JSON.parse(localStorage.getItem('users')) || [];
  
    var user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('login-message').style.display = 'block';
    }
  }
  
  window.onload = function() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([
        { username: 'root', password: 'root', role: 'admin' }
      ]));
    }
  }
  