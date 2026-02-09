# 🚀 Guide d'Installation - Système de Devis et Gestion de Production

## 📋 Table des matières
1. [Vue d'ensemble du système](#vue-densemble)
2. [Prérequis](#prérequis)
3. [Installation sur Hostinger](#installation-hostinger)
4. [Configuration](#configuration)
5. [Utilisation](#utilisation)
6. [Évolutions futures](#évolutions-futures)

---

## 🎯 Vue d'ensemble

Votre nouveau système comprend **4 composants** :

### 1. **Interface Administration** (`admin_prix.html`)
- 🎛️ Gestion centralisée des prix
- ✏️ Modification des tarifs en temps réel
- 📊 Gestion des paliers par quantité
- 💾 Export JSON des configurations

### 2. **Portail Client VIP** (`portail_client.html`)
- 💰 Calcul de devis instantané
- 🛒 Validation de commande en un clic
- 🎯 Sélection du niveau d'urgence
- 📝 Ajout de notes personnalisées

### 3. **Dashboard Production** (`dashboard_production.html`)
- 📦 File d'attente visuelle
- 🔄 Drag & drop pour réorganiser
- 📊 Statistiques en temps réel
- ⚙️ Gestion du statut des commandes

### 4. **Fichier de Prix** (`prix_config.json`)
- 🗂️ Base de données centralisée des tarifs
- 🔄 Synchronisation automatique
- 📱 Format JSON facile à modifier

---

## 🔧 Prérequis

### Ce dont vous avez besoin :
- ✅ Compte Hostinger (vous l'avez déjà)
- ✅ Accès cPanel ou File Manager
- ✅ Navigateur web moderne (Chrome, Firefox, Safari)

### Ce que vous N'AVEZ PAS besoin :
- ❌ N8n (pas nécessaire pour votre cas)
- ❌ Base de données MySQL (pour l'instant, version simple)
- ❌ PHP (version actuelle utilise JavaScript)
- ❌ Serveur Node.js

---

## 📤 Installation sur Hostinger

### Étape 1 : Préparer les fichiers

1. **Téléchargez les 4 fichiers** que je viens de créer :
   - `admin_prix.html`
   - `portail_client.html`
   - `dashboard_production.html`
   - `prix_config.json`

2. **Créez une structure de dossiers** :
```
public_html/
├── devis/
│   ├── index.html (= votre calculateur actuel)
│   ├── prix_config.json
│   └── admin/
│       └── admin_prix.html
├── client/
│   └── portail_client.html
└── production/
    └── dashboard_production.html
```

### Étape 2 : Upload via cPanel

1. **Connectez-vous à cPanel** sur Hostinger
2. **Ouvrez File Manager**
3. **Naviguez vers `public_html`**
4. **Créez les dossiers** : `devis`, `client`, `production`, `devis/admin`
5. **Uploadez les fichiers** dans leurs dossiers respectifs

### Étape 3 : Configurer les URLs

Vos URLs seront :
- **Admin** : `https://votresite.com/devis/admin/admin_prix.html`
- **Client** : `https://votresite.com/client/portail_client.html`
- **Production** : `https://votresite.com/production/dashboard_production.html`
- **Prix (JSON)** : `https://votresite.com/devis/prix_config.json`

### Étape 4 : Protéger l'accès admin

#### Méthode simple (fichier .htpasswd)

1. Dans cPanel, cherchez **"Directory Privacy"**
2. Sélectionnez le dossier `/devis/admin/`
3. Créez un mot de passe pour protéger l'accès
4. Ajoutez les utilisateurs autorisés (vous + commerciaux de confiance)

#### Fichier .htaccess à créer dans `/devis/admin/` :
```apache
AuthType Basic
AuthName "Zone Administration"
AuthUserFile /home/votrecompte/.htpasswd
Require valid-user
```

---

## ⚙️ Configuration

### Configuration initiale du fichier de prix

Le fichier `prix_config.json` contient déjà vos prix actuels. Pour le modifier :

**Option 1 - Via l'interface admin** (recommandé) :
1. Ouvrez `admin_prix.html`
2. Modifiez les prix dans les tableaux
3. Cliquez sur "💾 Enregistrer"
4. Téléchargez le nouveau JSON
5. Remplacez `prix_config.json` sur le serveur

**Option 2 - Édition directe** :
1. Téléchargez `prix_config.json` depuis le serveur
2. Modifiez avec un éditeur de texte
3. Uploadez la nouvelle version
4. Les changements sont instantanés

### Synchronisation automatique

Pour que les commerciaux et clients voient les prix mis à jour :

1. **Commerciaux** : Rechargent simplement la page (F5)
2. **Clients** : Idem, ou vous pouvez ajouter auto-refresh :

```javascript
// À ajouter dans portail_client.html
setInterval(async () => {
    await loadPrices(); // Recharge les prix toutes les 5 minutes
}, 300000);
```

---

## 📱 Utilisation

### Pour VOUS (Administrateur)

1. **Modifier les prix** :
   - Ouvrez l'interface admin
   - Changez les valeurs
   - Sauvegardez et uploadez le JSON
   - ✅ Mise à jour instantanée partout

2. **Suivre les commandes** :
   - Ouvrez le dashboard production
   - Visualisez la file d'attente
   - Réorganisez par drag & drop
   - Marquez comme "en production" ou "terminé"

### Pour vos COMMERCIAUX

1. Accèdent au calculateur de devis classique
2. Les prix sont toujours à jour
3. Pas besoin de vous contacter pour les tarifs

### Pour vos CLIENTS VIP

1. **Se connectent au portail client**
2. **Calculent leur devis** instantanément
3. **Valident la commande** en un clic
4. **Choisissent l'urgence** : Normal / Urgent / Express
5. **Ajoutent des notes** pour personnaliser

### Pour la PRODUCTION

1. **Consultent le dashboard**
2. **Voient les commandes classées** par urgence
3. **Réorganisent si besoin** (drag & drop)
4. **Changent le statut** : En attente → En production → Terminé

---

## 🔐 Système d'authentification (Version 2.0)

Pour l'instant, le système utilise localStorage (stockage local du navigateur).

### Pour passer à une vraie base de données :

#### Option A : MySQL + PHP (inclus avec Hostinger)

**Avantages** :
- ✅ Déjà inclus dans votre forfait
- ✅ Pas de coûts supplémentaires
- ✅ Facile à mettre en place

**Structure de base de données** :
```sql
-- Table clients
CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    statut ENUM('standard', 'vip', 'premium'),
    mot_de_passe_hash VARCHAR(255)
);

-- Table commandes
CREATE TABLE commandes (
    id VARCHAR(50) PRIMARY KEY,
    client_id INT,
    produit VARCHAR(100),
    quantite INT,
    prix_total DECIMAL(10,2),
    urgence INT,
    statut ENUM('en_attente', 'en_production', 'termine'),
    date_commande DATETIME,
    notes TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Table prix (historique)
CREATE TABLE prix_historique (
    id INT PRIMARY KEY AUTO_INCREMENT,
    version VARCHAR(20),
    data JSON,
    date_modification DATETIME
);
```

#### Option B : Solution cloud (pour plus tard)

Si vous voulez évoluer vers du temps réel avec notifications :
- **Firebase** : Gratuit jusqu'à 10k utilisateurs/jour
- **Supabase** : Alternative open-source à Firebase
- **Airtable** : Interface no-code pour gérer les données

---

## 🎨 Personnalisation

### Changer les couleurs

Dans chaque fichier HTML, modifiez les variables CSS :

```css
:root {
    --cyan: #00B8D4;        /* Couleur principale */
    --magenta: #E91E63;     /* Couleur secondaire */
    --yellow: #FFC107;      /* Accents */
}
```

### Ajouter votre logo

Dans `portail_client.html` :
```html
<header>
    <img src="logo.png" alt="Logo" style="height: 50px;">
    <h1>Portail Client VIP</h1>
</header>
```

### Modifier les niveaux d'urgence

Dans `portail_client.html`, section urgence :
```javascript
// Ajouter un 4ème niveau par exemple
<div class="urgency-btn" data-urgency="4" onclick="selectUrgency(4)">
    🟠 Super Urgent<br><small>48-72h</small>
</div>
```

---

## 📊 Évolutions futures recommandées

### Phase 2 : Base de données réelle
- Migration vers MySQL
- API REST en PHP
- Authentification sécurisée
- Historique des commandes

### Phase 3 : Notifications
- Email automatique à la validation
- SMS pour commandes urgentes
- Alertes production

### Phase 4 : Analytics
- Statistiques de vente
- Rapport mensuel automatique
- Prévisions de production

### Phase 5 : Intégration
- Export PDF des devis
- Synchronisation comptabilité
- CRM intégré

---

## 🆘 Support et dépannage

### Problèmes courants

**1. Les prix ne se mettent pas à jour**
- Vérifiez que `prix_config.json` est au bon endroit
- Videz le cache du navigateur (Ctrl + F5)
- Vérifiez les permissions du fichier (644)

**2. Les commandes ne s'enregistrent pas**
- Vérifiez la console JavaScript (F12)
- Assurez-vous que localStorage est activé
- Testez dans un autre navigateur

**3. Erreur 404 sur les fichiers**
- Vérifiez les chemins dans le code
- Assurez-vous que tous les fichiers sont uploadés
- Vérifiez les permissions des dossiers (755)

**4. Interface admin inaccessible**
- Vérifiez le fichier .htaccess
- Réinitialisez le mot de passe dans cPanel
- Contactez le support Hostinger si nécessaire

---

## 📞 Prochaines étapes

1. ✅ Uploadez les fichiers sur Hostinger
2. ✅ Testez l'interface admin
3. ✅ Créez un compte client test
4. ✅ Passez une commande test
5. ✅ Vérifiez le dashboard production
6. ✅ Formez vos commerciaux
7. ✅ Invitez vos clients VIP

---

## 💡 Conseil final

**Commencez petit** : 
- Testez d'abord avec 2-3 clients VIP
- Recueillez leurs retours
- Ajustez l'interface selon leurs besoins
- Puis déployez à plus grande échelle

**Version MVP (Minimum Viable Product)** :
- Semaine 1 : Installation et tests internes
- Semaine 2 : Beta test avec 3 clients fidèles
- Semaine 3 : Ajustements et améliorations
- Semaine 4 : Déploiement complet

---

## 🎁 Bonus : Script de migration

Si vous voulez migrer vers MySQL plus tard, voici le script PHP de base :

```php
<?php
// api.php - Point d'entrée API

header('Content-Type: application/json');

$servername = "localhost";
$username = "votre_user";
$password = "votre_password";
$dbname = "votre_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed']));
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'get_prices':
        $result = $conn->query("SELECT data FROM prix_historique ORDER BY date_modification DESC LIMIT 1");
        $row = $result->fetch_assoc();
        echo $row['data'];
        break;
        
    case 'save_order':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("INSERT INTO commandes (id, client_id, produit, quantite, prix_total, urgence, statut, date_commande, notes) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)");
        $stmt->bind_param("sissdiis", 
            $data['id'], 
            $data['client_id'], 
            $data['productName'], 
            $data['quantity'], 
            $data['totalPrice'], 
            $data['urgency'], 
            $data['statut'], 
            $data['notes']
        );
        $stmt->execute();
        echo json_encode(['success' => true, 'order_id' => $data['id']]);
        break;
}

$conn->close();
?>
```

---

**Vous avez maintenant un système complet et professionnel ! 🎉**

Pour toute question, n'hésitez pas à me demander des éclaircissements.
