const SIMPACT_USERS = [
    // ADMIN
    { login: "youssef", pass: "ni3Shaey", role: "admin", name: "Youssef (PDG)" },
    { login: "admin", pass: "simpact2026", role: "admin", name: "Admin Système" },
    
    // COMMERCIAL
    { login: "slim", pass: "slim2026", role: "commercial", name: "Slim Bouraoui" },
    { login: "emna", pass: "emna2026", role: "commercial", name: "Emna Ben Achour" },
   
    // PRODUCTION (ATELIER)
    { login: "prod", pass: "prod2026", role: "production", name: "Chef d'Atelier" },

    // COMPTABILITE
    { login: "compta", pass: "compta2026", role: "compta", name: "Service Compta" },

    // CLIENT
    { login: "client", pass: "client", role: "client", name: "Client Visiteur" }
];

function loginUser(user, pass) {
    const foundUser = SIMPACT_USERS.find(u => u.login === user && u.pass === pass);
    if (foundUser) {
        localStorage.setItem('simpactUser', JSON.stringify(foundUser));
        return foundUser;
    }
    return null;
}

function checkAuth(allowedRoles) {
    const user = JSON.parse(localStorage.getItem('simpactUser'));
    if (!user) { window.location.href = 'index.html'; return false; }
    
    // Si 'allowedRoles' est une chaine, on la met dans un tableau
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    // L'admin a accès à tout, sinon il faut avoir le bon rôle
    if (user.role !== 'admin' && !roles.includes(user.role)) {
        alert("⛔ Accès réservé aux : " + roles.join(", "));
        window.location.href = 'index.html';
        return false;
    }
    return user;
}

function logout() {
    localStorage.removeItem('simpactUser');
    window.location.href = 'index.html';
}

// GESTION DES COMMANDES (Base de données locale)
function getOrders() {
    return JSON.parse(localStorage.getItem('SIMPACT_ORDERS') || '[]');
}

function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order); // Ajoute au début
    localStorage.setItem('SIMPACT_ORDERS', JSON.stringify(orders));
}

function updateOrderStatus(ref, newStatus, type) {
    const orders = getOrders();
    const order = orders.find(o => o.ref === ref);
    if(order) {
        if(type === 'prod') order.statusProd = newStatus;
        if(type === 'compta') order.statusCompta = newStatus;
        localStorage.setItem('SIMPACT_ORDERS', JSON.stringify(orders));
    }
}
