/* FICHIER DE CONFIGURATION DES UTILISATEURS
   Pour ajouter un utilisateur, copiez une ligne et changez :
   - l'identifiant (login)
   - le mot de passe (password)
   - le rôle (admin, commercial, ou client)
   - le nom complet (name)
*/

const SIMPACT_USERS = [
    // ADMINISTRATEURS (Accès total)
    { login: "admin", pass: "simpact2026", role: "admin", name: "Administrateur" },
    
    // COMMERCIAUX (Accès calculs + PDF)
    { login: "ichraf", pass: "com2026", role: "commercial", name: "Ichraf Mestiri" },
    { login: "commercial", pass: "test", role: "commercial", name: "Commercial Test" },

    // CLIENTS (Accès devis simple)
    { login: "client", pass: "client", role: "client", name: "Client Visiteur" }
];

function loginUser(user, pass) {
    const foundUser = SIMPACT_USERS.find(u => u.login === user && u.pass === pass);
    if (foundUser) {
        // On sauvegarde la session dans le navigateur
        localStorage.setItem('simpactUser', JSON.stringify(foundUser));
        return foundUser;
    }
    return null;
}

function checkAuth(requiredRole) {
    const user = JSON.parse(localStorage.getItem('simpactUser'));
    if (!user) {
        window.location.href = 'index.html';
        return false;
    }
    if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
        alert("Accès non autorisé pour votre profil.");
        window.location.href = 'index.html';
        return false;
    }
    return user;
}

function logout() {
    localStorage.removeItem('simpactUser');
    window.location.href = 'index.html';
}
