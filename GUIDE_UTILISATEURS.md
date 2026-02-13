# 👥 GUIDE GESTION DES UTILISATEURS - SIMPACT

## 🔐 SUPER ADMIN

### Identifiants du Super Admin

**Identifiant:** `youssef`  
**Mot de passe:** `ni3Shaey`  
**Accès:** TOUS LES MODULES (Admin, Stock, Production, Commercial, Compta, Client)

Le super admin est **protégé** :
- ✅ Impossible à supprimer
- ✅ Accès universel à toutes les pages
- ✅ Peut gérer tous les autres utilisateurs

---

## 🎯 ACCÈS AU MODULE DE GESTION

### Depuis la page Admin

1. Se connecter avec le compte super admin ou admin
2. Cliquer sur le bouton **"👥 Gestion Utilisateurs"** dans le header
3. Le panneau de gestion s'ouvre

---

## 👤 AJOUTER UN UTILISATEUR

### Étapes

1. Remplir le formulaire en bas du panneau :
   - **Identifiant de connexion** : ex: `comm02`, `prod02`, `client03`
   - **Mot de passe** : ex: `vente123` (visible pour l'admin)
   - **Nom d'affichage** : ex: `Commercial 2`, `Chef Atelier Nord`
   - **Rôle** : Choisir parmi les 6 rôles disponibles
   - **Page de redirection** : Page affichée après connexion

2. Cliquer sur **"💾 Enregistrer l'utilisateur"**

3. L'utilisateur apparaît dans le tableau

### Exemple Concret

```
Identifiant: comm02
Mot de passe: vente2026
Nom: Commercial Tunis
Rôle: 🟣 Commercial
Page: commercial.html
```

---

## 🎭 LES 6 RÔLES DISPONIBLES

### 🔴 Super Admin
- **Accès:** TOUT
- **Peut faire:** Gérer prix, stock, utilisateurs, voir toutes les pages
- **Recommandé pour:** PDG, Directeur Général

### 🟠 Admin
- **Accès:** Prix, Stock, Utilisateurs
- **Peut faire:** Configurer les tarifs, gérer le stock, créer des utilisateurs
- **Recommandé pour:** Directeur Administratif

### 🔵 Production
- **Accès:** Atelier, Stock
- **Peut faire:** Voir les commandes de production, gérer le stock papier
- **Recommandé pour:** Chef d'Atelier, Responsable Production

### 🟣 Commercial
- **Accès:** Commandes uniquement
- **Peut faire:** Créer des commandes, voir les devis
- **Recommandé pour:** Commerciaux, Agents de vente

### 🟢 Comptabilité
- **Accès:** Finances uniquement
- **Peut faire:** Voir le chiffre d'affaires, les factures
- **Recommandé pour:** Comptable, Service Financier

### ⚪ Client
- **Accès:** Commandes limitées
- **Peut faire:** Passer des commandes pour leur entreprise
- **Recommandé pour:** Clients réguliers avec accès direct

---

## ✏️ MODIFIER UN UTILISATEUR

### Méthode

1. Dans le tableau des utilisateurs, cliquer sur **"✏️ Modifier"** à droite
2. Le formulaire se remplit automatiquement
3. Modifier les champs souhaités
4. Cliquer sur **"💾 Enregistrer l'utilisateur"**

### Ce qu'on peut modifier

✅ Mot de passe  
✅ Nom d'affichage  
✅ Rôle  
✅ Page de redirection  
⚠️ Identifiant (attention, l'utilisateur devra utiliser le nouveau)

### Cas Spécial : Super Admin

Pour le super admin (`youssef`) :
- ✅ Mot de passe modifiable
- ✅ Nom modifiable
- ❌ Identifiant bloqué (toujours `youssef`)
- ❌ Rôle bloqué (toujours `superadmin`)

---

## 🗑️ SUPPRIMER UN UTILISATEUR

### Méthode

1. Cliquer sur **"🗑️"** à droite de l'utilisateur
2. Confirmer la suppression
3. L'utilisateur est supprimé définitivement

### Protection

⛔ Le super admin (`youssef`) **NE PEUT PAS** être supprimé

---

## 📋 PAGES DE REDIRECTION DISPONIBLES

| Page | Description | Pour qui ? |
|------|-------------|------------|
| `admin.html` | Configuration prix & users | Admin, Super Admin |
| `stock.html` | Gestion stock papier | Admin, Production |
| `production.html` | File de production atelier | Production |
| `commercial.html` | Créer des commandes | Commercial |
| `compta.html` | Tableau financier | Comptabilité |
| `client.html` | Interface client simple | Clients |

---

## 💡 BONNES PRATIQUES

### Sécurité

1. **Mots de passe forts** pour les admins
   - ✅ `Simpact2026!`
   - ❌ `1234`

2. **Rôles minimaux**
   - Donner uniquement les accès nécessaires
   - Un commercial n'a pas besoin d'accès stock

3. **Noms clairs**
   - ✅ `Commercial Tunis Nord`
   - ❌ `User1`

### Organisation

**Nomenclature suggérée pour les identifiants :**

```
comm01, comm02, comm03... → Commerciaux
prod01, prod02, prod03... → Production
compta01, compta02...     → Comptabilité
client01, client02...     → Clients
```

---

## 🔄 SAUVEGARDE DES DONNÉES

### Où sont stockés les utilisateurs ?

Les utilisateurs sont sauvegardés dans **LocalStorage** du navigateur :
- Clé : `SIMPACT_USERS`
- Format : JSON

### Initialisation

**Première connexion :** Les utilisateurs par défaut sont :
- `youssef` / `ni3Shaey` (super admin)
- `admin01` / `simpact2026` (admin)
- `prod01` / `atelier` (production)
- `compta01` / `facture` (compta)
- `comm01` / `vente` (commercial)
- `client01` / `client123` (client)
- `client02` / `1234` (client)

**Après modifications :** Tous les changements sont sauvegardés automatiquement

### Backup Manuel (si besoin)

```javascript
// Dans la console navigateur (F12)
console.log(localStorage.getItem('SIMPACT_USERS'));

// Copier le résultat pour backup
```

---

## 🆘 DÉPANNAGE

### Problème : "Utilisateur non trouvé"

**Solution :**
1. Vérifier l'orthographe de l'identifiant
2. Vérifier que l'utilisateur existe dans le panneau
3. Vérifier la casse (majuscules/minuscules)

### Problème : "Accès interdit"

**Solution :**
1. Vérifier le rôle de l'utilisateur
2. S'assurer que le rôle autorise cette page
3. Se reconnecter avec un compte ayant les bons droits

### Problème : "Impossible de se connecter"

**Solution :**
1. Vérifier le mot de passe
2. Essayer avec le super admin : `youssef` / `ni3Shaey`
3. Réinitialiser le navigateur (vider le cache)

### Problème : "Tous les utilisateurs ont disparu"

**Solution :**
```javascript
// Dans la console (F12), restaurer les utilisateurs par défaut :
localStorage.removeItem('SIMPACT_USERS');
// Puis recharger la page
```

---

## 📊 EXEMPLE D'ORGANISATION COMPLÈTE

### Entreprise avec 10 employés

```
DIRECTION
├── youssef (super admin) - Accès total
└── admin01 (admin) - Config & Stock

COMMERCIAL
├── comm01 (Tunis)
├── comm02 (Sfax)
└── comm03 (Sousse)

PRODUCTION
├── prod01 (Chef Atelier)
└── prod02 (Opérateur)

SUPPORT
├── compta01 (Comptable)
└── compta02 (Assistant)

CLIENTS VIP
├── client01 (Agence Pub)
└── client02 (Restaurant Le Chef)
```

---

## ✅ CHECKLIST CRÉATION UTILISATEUR

Avant de créer un utilisateur, vérifier :

- [ ] L'identifiant est unique
- [ ] Le mot de passe est noté quelque part
- [ ] Le rôle correspond aux besoins
- [ ] La page de redirection est correcte
- [ ] Le nom est clair et identifiable
- [ ] L'utilisateur sait comment se connecter

---

## 🎓 FORMATION RAPIDE

### Pour un nouvel utilisateur

1. **Donner les identifiants**
   - Identifiant : `comm02`
   - Mot de passe : `vente2026`

2. **Expliquer la connexion**
   - Aller sur : `https://votre-site.github.io/index.html`
   - Entrer identifiant et mot de passe
   - Cliquer "Se connecter"

3. **Préciser les limites**
   - "Vous êtes commercial, vous pouvez uniquement créer des commandes"
   - "Vous n'avez pas accès au stock ni à la compta"

---

## 🔐 SÉCURITÉ RENFORCÉE (Recommandations)

### À faire régulièrement

1. **Changer les mots de passe** tous les 3 mois
2. **Supprimer les comptes inactifs**
3. **Vérifier les accès** : qui a accès à quoi ?

### En cas de départ d'un employé

1. Supprimer immédiatement son compte
2. Changer le mot de passe admin si nécessaire
3. Vérifier qu'aucune session n'est active

---

## 📞 SUPPORT

**En cas de problème avec la gestion des utilisateurs :**

1. Vérifier ce guide
2. Tester avec le super admin
3. Vérifier la console navigateur (F12)
4. En dernier recours, réinitialiser les utilisateurs

---

**Développé pour SIMPACT - Imprimerie Numérique**  
**© 2026 - Module Gestion Utilisateurs**
