// BASE DE DONNÉES UTILISATEURS
const USERS = [
    { id: 'admin01', pass: 'simpact2026', role: 'admin', name: 'Youssef (PDG)', redirect: 'admin.html' },
    { id: 'prod01', pass: 'atelier', role: 'production', name: 'Chef Atelier', redirect: 'production.html' },
    { id: 'compta01', pass: 'facture', role: 'compta', name: 'Service Compta', redirect: 'compta.html' },
    { id: 'comm01', pass: 'vente', role: 'commercial', name: 'Commercial 1', redirect: 'commercial.html' },
    { id: 'client01', pass: 'client123', role: 'client', name: 'Agence Pub', redirect: 'client.html' },
    { id: 'client02', pass: '1234', role: 'client', name: 'Restaurant Le Chef', redirect: 'client.html' }
];

// FONCTION DE LOGIN
function login(user, pass) {
    if(!user || !pass) return null;
    
    // Recherche insensible à la casse pour l'identifiant
    const foundUser = USERS.find(u => u.id.toLowerCase() === user.toLowerCase() && u.pass === pass);
    
    if (foundUser) {
        localStorage.setItem('SIMPACT_USER', JSON.stringify(foundUser));
        return foundUser;
    }
    return null;
}

// FONCTION DE VÉRIFICATION
function checkAuth(allowedRoles) {
    const session = localStorage.getItem('SIMPACT_USER');
    if (!session) {
        window.location.href = 'index.html';
        return null;
    }
    
    try {
        const user = JSON.parse(session);
        
        if (!allowedRoles) return user;

        if (Array.isArray(allowedRoles) && !allowedRoles.includes(user.role)) {
            alert("⛔ Accès interdit à cette zone !");
            window.location.href = user.redirect;
            return null;
        } else if (typeof allowedRoles === 'string' && allowedRoles !== user.role) {
            alert("⛔ Accès interdit !");
            window.location.href = user.redirect;
            return null;
        }
        return user;
    } catch(e) {
        // En cas d'erreur de lecture, on déconnecte
        logout();
        return null;
    }
}

// DÉCONNEXION
function logout() {
    localStorage.removeItem('SIMPACT_USER');
    window.location.href = 'index.html';
}

// GESTION DES COMMANDES (Sécurisée)
function getOrders() {
    try {
        const orders = localStorage.getItem('SIMPACT_ORDERS');
        return orders ? JSON.parse(orders) : [];
    } catch(e) {
        console.error("Erreur lecture commandes", e);
        return [];
    }
}

function saveOrder(orderData) {
    try {
        const orders = getOrders();
        orders.unshift(orderData);
        if(orders.length > 50) orders.pop();
        localStorage.setItem('SIMPACT_ORDERS', JSON.stringify(orders));
    } catch(e) {
        alert("Erreur de sauvegarde locale (Mémoire pleine ?)");
    }
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
