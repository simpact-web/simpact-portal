/* FICHIER DE CONFIGURATION DES UTILISATEURS
   Gère les accès au portail Simpact.
*/

const SIMPACT_USERS = [
    // --- ADMINISTRATEURS ---
    // Votre nouveau compte :
    { login: "Youssef", pass: "ni3Shaey", role: "admin", name: "Youssef" },
    
    // Compte de secours (vous pouvez le supprimer si vous voulez) :
    { login: "admin", pass: "simpact2026", role: "admin", name: "Administrateur" },
    
    // --- COMMERCIAUX ---
    { login: "slim", pass: "slim2026", role: "commercial", name: "Slim Bouraoui" },
    { login: "commercial", pass: "test", role: "commercial", name: "Commercial Test" },

    // --- CLIENTS ---
    { login: "client", pass: "client", role: "client", name: "Client Visiteur" }
];

// --- LOGIQUE DE CONNEXION (NE PAS TOUCHER) ---

function loginUser(user, pass) {
    // Recherche de l'utilisateur correspondant (sensible à la casse)
    const foundUser = SIMPACT_USERS.find(u => u.login === user && u.pass === pass);
    
    if (foundUser) {
        // On sauvegarde la session dans le navigateur
        localStorage.setItem('simpactUser', JSON.stringify(foundUser));
        return foundUser;
    }
    return null;
}

function checkAuth(requiredRole) {
    const userStr = localStorage.getItem('simpactUser');
    
    if (!userStr) {
        window.location.href = 'index.html';
        return false;
    }

    const user = JSON.parse(userStr);

    // Si on demande un rôle spécifique
    if (requiredRole) {
        // L'admin a accès à tout
        if (user.role === 'admin') return user;

        // Sinon, on vérifie si le rôle correspond exactement
        if (user.role !== requiredRole) {
            alert("⛔ Accès non autorisé pour votre profil.");
            window.location.href = 'index.html';
            return false;
        }
    }
    
    return user;
}

function logout() {
    localStorage.removeItem('simpactUser');
    window.location.href = 'index.html';
}
