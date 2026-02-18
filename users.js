// --- CONFIGURATION CLOUD ---
// 🔴 COLLEZ VOTRE LIEN SCRIPT GOOGLE ICI (ENTRE LES GUILLEMETS) :
const CLOUD_API_URL = "https://script.google.com/macros/s/AKfycbwgafAjdP97KC60fsc8DpNBUYgCbDlNY4T5rs5tQ28nwqkdGJ_ELdefEnSQ-g9DXmLw1g/exec"; 

// BASE DE DONNÉES UTILISATEURS
const USERS = [
    { id: 'youssef', pass: 'youssef123', role: 'superadmin', name: 'Youssef (PDG)', redirect: 'hub.html' },
    { id: 'admin01', pass: 'simpact2026', role: 'admin', name: 'Admin Simpact', redirect: 'admin.html' },
    { id: 'prod01', pass: 'atelier', role: 'production', name: 'Chef Atelier', redirect: 'production.html' },
    { id: 'compta01', pass: 'facture', role: 'compta', name: 'Service Compta', redirect: 'compta.html' },
    { id: 'comm01', pass: 'vente', role: 'commercial', name: 'Commercial 1', redirect: 'commercial.html' },
    { id: 'client01', pass: 'client123', role: 'client', name: 'Agence Pub', redirect: 'client.html' },
    { id: 'client02', pass: '1234', role: 'client', name: 'Restaurant Le Chef', redirect: 'client.html' }
];

function login(user, pass) {
    if(!user || !pass) return null;
    const foundUser = USERS.find(u => u.id.toLowerCase() === user.toLowerCase() && u.pass === pass);
    if (foundUser) {
        localStorage.setItem('SIMPACT_USER', JSON.stringify(foundUser));
        return foundUser;
    }
    return null;
}

function checkAuth(allowedRoles) {
    const session = localStorage.getItem('SIMPACT_USER');
    if (!session) { window.location.href = 'index.html'; return null; }
    try {
        const user = JSON.parse(session);
        if (user.role === 'superadmin') return user; 
        if (!allowedRoles) return user;
        if (Array.isArray(allowedRoles) && !allowedRoles.includes(user.role)) {
            alert("⛔ Accès interdit !"); window.location.href = user.redirect; return null;
        }
        return user;
    } catch(e) { logout(); return null; }
}

function logout() { localStorage.removeItem('SIMPACT_USER'); window.location.href = 'index.html'; }

function getOrders() {
    try { return JSON.parse(localStorage.getItem('SIMPACT_ORDERS')) || []; } 
    catch(e) { return []; }
}

// ⚙️ MOTEUR D'ENVOI CENTRALISÉ ET SÉCURISÉ
function saveOrder(orderData) {
    // 1. Sauvegarde locale (Garantie de ne rien perdre sur ce PC)
    let orders = getOrders();
    orders.unshift(orderData);
    if(orders.length > 100) orders.pop();
    localStorage.setItem('SIMPACT_ORDERS', JSON.stringify(orders));

    // 2. Envoi au Google Sheet (Format strict en minuscules)
    if(CLOUD_API_URL && CLOUD_API_URL.startsWith("http")) {
        const formData = new FormData();
        formData.append("ref", orderData.ref);
        formData.append("client", orderData.client);
        formData.append("prod", orderData.prod);
        formData.append("qty", orderData.qty);
        formData.append("price", orderData.price);
        formData.append("desc", orderData.desc);
        formData.append("user", orderData.user);
        formData.append("statusProd", orderData.statusProd);
        formData.append("statusCompta", orderData.statusCompta);
        formData.append("jsonFull", JSON.stringify(orderData));

        // Le "mode: no-cors" est vital pour empêcher le navigateur de bloquer le Drive
        fetch(CLOUD_API_URL, { method: 'POST', body: formData, mode: 'no-cors' })
        .catch(e => console.error("Erreur Drive", e));
    }
}

function updateOrderStatus(ref, newStatus, type) {
    let orders = getOrders();
    let order = orders.find(o => o.ref === ref);
    if(order) {
        if(type === 'prod') order.statusProd = newStatus;
        if(type === 'compta') order.statusCompta = newStatus;
        localStorage.setItem('SIMPACT_ORDERS', JSON.stringify(orders));
        saveOrder(order); // Renvoie la mise à jour au Drive
    }
}

// 🔄 SYNCHRONISATION BLINDÉE
async function syncWithCloud() {
    if(!CLOUD_API_URL || !CLOUD_API_URL.startsWith("http")) return;
    try {
        const response = await fetch(CLOUD_API_URL);
        const cloudData = await response.json();
        
        // Sécurité : On ne remplace les données que si le Drive n'est pas "vide à cause d'une erreur"
        if(Array.isArray(cloudData) && cloudData.length > 0) {
            localStorage.setItem('SIMPACT_ORDERS', JSON.stringify(cloudData));
            
            // Rafraîchissement des écrans en direct
            if(typeof renderOrders === 'function') renderOrders();
            if(typeof loadStats === 'function') loadStats();
            if(typeof loadWebOrders === 'function') loadWebOrders();
        }
    } catch(e) {}
}

setInterval(syncWithCloud, 6000); // Scanne le Drive toutes les 6 secondes
syncWithCloud();
