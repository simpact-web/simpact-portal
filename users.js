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

// ============================================
// GESTION DU STOCK PAPIER
// ============================================

/**
 * Récupère la liste complète du stock papier
 * @returns {Array} Liste des papiers en stock
 */
function getStock() {
    const stock = localStorage.getItem('SIMPACT_STOCK');
    return stock ? JSON.parse(stock) : [];
}

/**
 * Sauvegarde le stock papier complet
 * @param {Array} stockData - Données du stock à sauvegarder
 */
function saveStock(stockData) {
    localStorage.setItem('SIMPACT_STOCK', JSON.stringify(stockData));
}

/**
 * Ajoute ou met à jour un type de papier dans le stock
 * @param {Object} paperData - Données du papier
 * @returns {Boolean} Succès de l'opération
 */
function savePaper(paperData) {
    let stock = getStock();
    const existingIndex = stock.findIndex(p => p.id === paperData.id);
    
    if(existingIndex >= 0) {
        stock[existingIndex] = paperData;
    } else {
        stock.push(paperData);
    }
    
    saveStock(stock);
    return true;
}

/**
 * Supprime un type de papier du stock
 * @param {String} paperId - ID du papier à supprimer
 * @returns {Boolean} Succès de l'opération
 */
function deletePaper(paperId) {
    let stock = getStock();
    stock = stock.filter(p => p.id !== paperId);
    saveStock(stock);
    return true;
}

/**
 * Récupère un papier spécifique par son ID
 * @param {String} paperId - ID du papier
 * @returns {Object|null} Données du papier ou null
 */
function getPaperById(paperId) {
    const stock = getStock();
    return stock.find(p => p.id === paperId) || null;
}

/**
 * Met à jour la quantité d'un papier
 * @param {String} paperId - ID du papier
 * @param {Number} newQty - Nouvelle quantité
 * @returns {Boolean} Succès de l'opération
 */
function updatePaperQty(paperId, newQty) {
    let stock = getStock();
    const paper = stock.find(p => p.id === paperId);
    
    if(paper) {
        paper.qty = newQty;
        saveStock(stock);
        return true;
    }
    
    return false;
}

/**
 * Récupère l'historique des mouvements de stock
 * @returns {Array} Liste des mouvements
 */
function getStockMovements() {
    const movements = localStorage.getItem('SIMPACT_STOCK_MOVEMENTS');
    return movements ? JSON.parse(movements) : [];
}

/**
 * Enregistre un mouvement de stock (entrée ou sortie)
 * @param {Object} movementData - Données du mouvement
 * @returns {Boolean} Succès de l'opération
 */
function saveStockMovement(movementData) {
    const movements = getStockMovements();
    movements.unshift(movementData); // Ajoute en début de liste
    
    // Limite à 200 mouvements pour ne pas surcharger
    if(movements.length > 200) movements.pop();
    
    localStorage.setItem('SIMPACT_STOCK_MOVEMENTS', JSON.stringify(movements));
    return true;
}

/**
 * Effectue un mouvement de stock (entrée ou sortie) et met à jour la quantité
 * @param {String} paperId - ID du papier
 * @param {String} type - Type de mouvement ('in' ou 'out')
 * @param {Number} qty - Quantité du mouvement
 * @param {Object} details - Détails du mouvement (raison, référence, etc.)
 * @returns {Boolean} Succès de l'opération
 */
function executeStockMovement(paperId, type, qty, details) {
    let stock = getStock();
    const paper = stock.find(p => p.id === paperId);
    
    if(!paper) return false;
    
    // Mise à jour de la quantité
    if(type === 'in') {
        paper.qty += qty;
    } else if(type === 'out') {
        paper.qty -= qty;
        if(paper.qty < 0) paper.qty = 0; // Évite les quantités négatives
    }
    
    saveStock(stock);
    
    // Enregistrement du mouvement
    const movement = {
        id: 'MOV-' + Date.now(),
        paperId: paperId,
        paperName: `${paper.category} ${paper.weight}g ${paper.format}`,
        type: type,
        qty: qty,
        reason: details.reason || '',
        ref: details.ref || '',
        comment: details.comment || '',
        date: new Date().toLocaleString('fr-FR'),
        user: details.user || 'Système'
    };
    
    saveStockMovement(movement);
    
    return true;
}

/**
 * Calcule les statistiques globales du stock
 * @returns {Object} Statistiques (types, total, valeur, alertes)
 */
function getStockStats() {
    const stock = getStock();
    
    const stats = {
        totalTypes: stock.length,
        totalQty: 0,
        totalValue: 0,
        alerts: 0,
        byCategory: {}
    };
    
    stock.forEach(paper => {
        // Total quantité
        stats.totalQty += paper.qty;
        
        // Total valeur
        stats.totalValue += (paper.qty * (paper.price || 0));
        
        // Alertes (stock bas)
        const percentage = (paper.qty / paper.threshold) * 100;
        if(percentage <= 100) stats.alerts++;
        
        // Par catégorie
        if(!stats.byCategory[paper.category]) {
            stats.byCategory[paper.category] = { qty: 0, value: 0, count: 0 };
        }
        stats.byCategory[paper.category].qty += paper.qty;
        stats.byCategory[paper.category].value += (paper.qty * (paper.price || 0));
        stats.byCategory[paper.category].count += 1;
    });
    
    return stats;
}

/**
 * Recherche des papiers selon des critères
 * @param {Object} criteria - Critères de recherche (category, weight, format, etc.)
 * @returns {Array} Liste des papiers correspondants
 */
function searchStock(criteria) {
    const stock = getStock();
    
    return stock.filter(paper => {
        let match = true;
        
        if(criteria.category) {
            match = match && paper.category.toLowerCase().includes(criteria.category.toLowerCase());
        }
        
        if(criteria.weight) {
            match = match && paper.weight === parseInt(criteria.weight);
        }
        
        if(criteria.format) {
            match = match && paper.format.toLowerCase().includes(criteria.format.toLowerCase());
        }
        
        if(criteria.supplier) {
            match = match && paper.supplier && paper.supplier.toLowerCase().includes(criteria.supplier.toLowerCase());
        }
        
        if(criteria.lowStock === true) {
            const percentage = (paper.qty / paper.threshold) * 100;
            match = match && percentage <= 100;
        }
        
        return match;
    });
}

/**
 * Initialise des papiers de démo (pour tests)
 * À utiliser uniquement en développement
 */
function initDemoStock() {
    const demoStock = [
        {
            id: 'PAPER-DEMO-001',
            category: 'Couché Brillant',
            weight: 135,
            format: 'A3',
            qty: 15000,
            unit: 'feuilles',
            threshold: 5000,
            price: 0.025,
            supplier: 'Papeterie du Nord',
            notes: 'Pour flyers et brochures premium',
            createdAt: new Date().toISOString()
        },
        {
            id: 'PAPER-DEMO-002',
            category: 'Couché Mat',
            weight: 170,
            format: 'SRA3',
            qty: 8000,
            unit: 'feuilles',
            threshold: 3000,
            price: 0.032,
            supplier: 'Papeterie du Nord',
            notes: 'Catalogues et dépliants',
            createdAt: new Date().toISOString()
        },
        {
            id: 'PAPER-DEMO-003',
            category: 'Offset Blanc',
            weight: 80,
            format: 'A4',
            qty: 2500,
            unit: 'feuilles',
            threshold: 5000,
            price: 0.015,
            supplier: 'Distributeur Central',
            notes: 'Stock bas - Réappro urgent',
            createdAt: new Date().toISOString()
        },
        {
            id: 'PAPER-DEMO-004',
            category: 'Bristol',
            weight: 250,
            format: 'A4',
            qty: 4000,
            unit: 'feuilles',
            threshold: 2000,
            price: 0.045,
            supplier: 'Papeterie du Nord',
            notes: 'Cartes de visite premium',
            createdAt: new Date().toISOString()
        },
        {
            id: 'PAPER-DEMO-005',
            category: 'Carton Plat',
            weight: 300,
            format: '70x100',
            qty: 500,
            unit: 'feuilles',
            threshold: 1000,
            price: 0.180,
            supplier: 'Import Direct',
            notes: 'Affiches et PLV',
            createdAt: new Date().toISOString()
        }
    ];
    
    saveStock(demoStock);
    console.log('✅ Stock de démo initialisé avec ' + demoStock.length + ' types de papier');
    return true;
}
