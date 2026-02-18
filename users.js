// --- CONFIGURATION CLOUD ---
// 🔴 COLLEZ VOTRE LIEN SCRIPT GOOGLE ICI :
const CLOUD_API_URL = "https://script.google.com/macros/s/AKfycbwgafAjdP97KC60fsc8DpNBUYgCbDlNY4T5rs5tQ28nwqkdGJ_ELdefEnSQ-g9DXmLw1g/exec"; 

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
    if (foundUser) { localStorage.setItem('SIMPACT_USER', JSON.stringify(foundUser)); return foundUser; }
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

function saveOrder(orderData) {
    // 1. Sauvegarde Locale Rapide
    let orders = getOrders();
    orders = orders.filter(o => o.ref !== orderData.ref); // Évite les doublons
    orders.unshift(orderData);
    if(orders.length > 100) orders.pop();
    localStorage.setItem('SIMPACT_ORDERS', JSON.stringify(orders));

    // 2. Envoi au Drive avec les NOMS EXACTS de votre tableau
    if(CLOUD_API_URL && CLOUD_API_URL.startsWith("http")) {
        const formData = new FormData();
        formData.append("Date", orderData.date);
        formData.append("Ref", orderData.ref);
        formData.append("Client", orderData.client);
        formData.append("Produit", orderData.prod);
        formData.append("Quantité", orderData.qty);
        formData.append("Prix HT", orderData.price);
        formData.append("Détails", orderData.desc); // <- Répare les caractéristiques
        formData.append("Commercial", orderData.user);
        
        // Donnée invisible pour que le Commercial puisse télécharger
        formData.append("JSON_FULL", JSON.stringify(orderData));

        fetch(CLOUD_API_URL, { method: 'POST', body: formData }).catch(e => console.log("Erreur silencieuse"));
    }
}

function updateOrderStatus(ref, newStatus, type) {
    let orders = getOrders();
    let order = orders.find(o => o.ref === ref);
    if(order) {
        if(type === 'prod') order.statusProd = newStatus;
        if(type === 'compta') order.statusCompta = newStatus;
        saveOrder(order); // Relance la sauvegarde
    }
}

async function syncWithCloud() {
    if(!CLOUD_API_URL || !CLOUD_API_URL.startsWith("http")) return;
    try {
        const response = await fetch(CLOUD_API_URL);
        const cloudData = await response.json();
        
        if(Array.isArray(cloudData) && cloudData.length > 0) {
            localStorage.setItem('SIMPACT_ORDERS', JSON.stringify(cloudData));
            if(typeof renderOrders === 'function') renderOrders();
            if(typeof loadStats === 'function') loadStats();
            if(typeof loadWebOrders === 'function') loadWebOrders();
        }
    } catch(e) {}
}

setInterval(syncWithCloud, 6000);
syncWithCloud();
