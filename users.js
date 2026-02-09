/* FICHIER DE CONFIGURATION - UTILISATEURS & DONNÉES
   Ce fichier centralise la sécurité et la base de données locale.
*/

const SIMPACT_USERS = [
    // --- MASTER COMPTE (Youssef) ---
    // Le rôle 'admin' donne accès à TOUT : Commercial, Prod, Compta, Admin Prix.
    { login: "Youssef", pass: "ni3Shaey", role: "admin", name: "Youssef (PDG)" },
    
    // --- COMPTES SPÉCIFIQUES (Accès restreint) ---
    { login: "commercial", pass: "simpact2026", role: "commercial", name: "Commercial Simpact" },
    { login: "prod", pass: "atelier", role: "production", name: "Chef d'Atelier" },
    { login: "compta", pass: "argent", role: "compta", name: "Service Compta" },
    { login: "client", pass: "client", role: "client", name: "Client Visiteur" }
];

// --- 1. SYSTÈME DE CONNEXION ---

function loginUser(user, pass) {
    const foundUser = SIMPACT_USERS.find(u => u.login === user && u.pass === pass);
    if (foundUser) {
        localStorage.setItem('simpactUser', JSON.stringify(foundUser));
        return foundUser;
    }
    return null;
}

// C'est ici que la magie du "Master Compte" opère
function checkAuth(allowedRoles) {
    const user = JSON.parse(localStorage.getItem('simpactUser'));
    if (!user) { window.location.href = 'index.html'; return false; }
    
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    // SI l'utilisateur est 'admin', il passe TOUJOURS (return user).
    // SINON, on vérifie s'il a le bon rôle spécifique.
    if (user.role !== 'admin' && !roles.includes(user.role)) {
        alert("⛔ Accès réservé pour votre profil.");
        window.location.href = 'index.html';
        return false;
    }
    return user;
}

function logout() {
    localStorage.removeItem('simpactUser');
    window.location.href = 'index.html';
}

// --- 2. BASE DE DONNÉES LOCALE (Commandes) ---

function getOrders() {
    return JSON.parse(localStorage.getItem('SIMPACT_ORDERS') || '[]');
}

function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order); 
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
