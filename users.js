// BASE DE DONNÉES UTILISATEURS (Simulée)
const USERS = [
    { id: 'admin01', pass: 'simpact2026', role: 'admin', name: 'Youssef (PDG)', redirect: 'admin.html' },
    { id: 'prod01', pass: 'atelier', role: 'production', name: 'Chef Atelier', redirect: 'production.html' },
    { id: 'compta01', pass: 'facture', role: 'compta', name: 'Service Compta', redirect: 'compta.html' },
    { id: 'comm01', pass: 'vente', role: 'commercial', name: 'Commercial 1', redirect: 'commercial.html' },
    // CLIENTS
    { id: 'client01', pass: 'client123', role: 'client', name: 'Agence Pub', redirect: 'client.html' },
    { id: 'client02', pass: '1234', role: 'client', name: 'Restaurant Le Chef', redirect: 'client.html' }
];

// FONCTION DE LOGIN
function login(user, pass) {
    const foundUser = USERS.find(u => u.id === user && u.pass === pass);
    if (foundUser) {
        // On enregistre la session
        localStorage.setItem('SIMPACT_USER', JSON.stringify(foundUser));
        return foundUser;
    }
    return null;
}

// FONCTION DE VÉRIFICATION (À mettre en haut de chaque page)
function checkAuth(allowedRoles) {
    const session = localStorage.getItem('SIMPACT_USER');
    if (!session) {
        window.location.href = 'index.html'; // Renvoie au login si pas connecté
        return null;
    }
    
    const user = JSON.parse(session);
    
    // Si 'allowedRoles' est vide, on accepte tout le monde connecté
    if (!allowedRoles) return user;

    // Si le rôle n'est pas autorisé
    if (Array.isArray(allowedRoles) && !allowedRoles.includes(user.role)) {
        alert("⛔ Accès interdit à cette zone !");
        window.location.href = user.redirect; // Renvoie vers sa page légitime
        return null;
    } else if (typeof allowedRoles === 'string' && allowedRoles !== user.role) {
        alert("⛔ Accès interdit !");
        window.location.href = user.redirect;
        return null;
    }

    return user;
}

// DÉCONNEXION
function logout() {
    localStorage.removeItem('SIMPACT_USER');
    window.location.href = 'index.html';
}

// GESTION DES COMMANDES (LocalStorage - Base de données locale navigateur)
function getOrders() {
    const orders = localStorage.getItem('SIMPACT_ORDERS');
    return orders ? JSON.parse(orders) : [];
}

function saveOrder(orderData) {
    const orders = getOrders();
    // Ajout en haut de la liste
    orders.unshift(orderData);
    // Limite à 50 dernières commandes pour ne pas surcharger
    if(orders.length > 50) orders.pop();
    localStorage.setItem('SIMPACT_ORDERS', JSON.stringify(orders));
}

function updateOrderStatus(ref, newStatus, type) {
    let orders = getOrders();
    let order = orders.find(o => o.ref === ref);
    if(order) {
        if(type === 'prod') order.statusProd = newStatus;
        if(type === 'compta') order.statusCompta = newStatus;
        localStorage.setItem('SIMPACT_ORDERS', JSON.stringify(orders));
    }
}
