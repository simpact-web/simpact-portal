# 📦 MODULE GESTION STOCK PAPIER - SIMPACT

## 🎯 Vue d'ensemble

Module professionnel de gestion de stock papier intégré au portail Simpact. Conçu spécifiquement pour les imprimeries numériques avec une approche métier optimisée.

---

## ✨ Fonctionnalités Principales

### 📊 **Dashboard Visuel**
- Vue en grille interactive de tous les types de papier
- Statistiques globales en temps réel :
  - Nombre de types de papier en stock
  - Quantité totale (toutes catégories)
  - Valeur financière du stock
  - Alertes de réapprovisionnement

### 🗂️ **Gestion Complète des Papiers**

**Types de papier supportés :**
- **Papiers Couchés** : Brillant, Mat, Satiné
- **Papiers Offset** : Blanc, Ivoire
- **Papiers Création** : Bristol, Vergé, Texturé, Kraft, Calque
- **Papiers Techniques** : Autocopiant, Adhésif, Synthétique
- **Cartons** : Plat, Ondulé, Contrecollé
- **Papiers Spéciaux** : Métallisé, Translucide, Recyclé, Sécurisé

**Grammages disponibles :**
60g, 70g, 80g, 90g, 100g, 115g, 120g, 130g, 135g, 150g, 170g, 200g, 250g, 300g, 350g, 400g

**Formats gérés :**
- Standards : A4, A3, A5, A6
- SRA (avec fonds perdus) : SRA3, SRA4
- Formats Machine : 50x70cm, 70x100cm, 72x102cm
- Formats US : Letter, Legal, Tabloid
- Formats personnalisés

### 📈 **Système d'Alertes Intelligent**
- 🟢 **Stock OK** : Quantité > 150% du seuil
- 🟠 **Stock Moyen** : Quantité entre 100-150% du seuil
- 🔴 **Réappro Urgent** : Quantité < 100% du seuil

### 💰 **Tracking Financier**
- Prix unitaire par type de papier
- Calcul automatique de la valeur du stock
- Valorisation par catégorie
- Rapport PDF avec détail financier

### 📝 **Gestion des Mouvements**
**Entrées :**
- Achat fournisseur
- Retour client
- Correction inventaire

**Sorties :**
- Production commande
- Perte/Casse
- Échantillon client
- Test qualité

**Historique complet** :
- Date et heure précise
- Type de mouvement
- Quantité
- Motif et référence
- Opérateur
- Recherche et filtrage

### 🎛️ **Unités Multiples**
- **Feuilles** : Pour comptage précis
- **Ramettes** : Par lot de 500 feuilles
- **Palettes** : Pour gros volumes

### 🔍 **Recherche et Filtrage**
- Recherche en temps réel (type, grammage, format, fournisseur)
- Filtres par statut de stock
- Tri intelligent

### 📄 **Export PDF Professionnel**
- Rapport d'inventaire complet
- Statistiques détaillées
- Tableau par type de papier
- Valorisation totale
- Format A4 paysage optimisé pour impression

---

## 🚀 Installation

### 1. **Fichiers à intégrer**

```
simpact-portal/
├── stock.html          # Interface principale du module
├── users.js            # Version mise à jour avec fonctions stock
└── admin.html          # Version avec bouton d'accès au stock
```

### 2. **Déploiement**

**Sur GitHub Pages :**
1. Remplacer `users.js` par la nouvelle version
2. Ajouter `stock.html` au repository
3. Mettre à jour `admin.html` avec le bouton d'accès
4. Push les changements

**Accès direct :**
```
https://votre-repo.github.io/simpact-portal/stock.html
```

---

## 👥 Droits d'Accès

Le module est accessible aux rôles suivants :
- ✅ **Admin** (accès complet)
- ✅ **Production** (gestion opérationnelle)

Pour ajouter un utilisateur "magasinier" dédié, modifier `users.js` :

```javascript
{ 
  id: 'magasin01', 
  pass: 'stock123', 
  role: 'production', 
  name: 'Chef Magasin', 
  redirect: 'stock.html' 
}
```

---

## 📖 Guide d'Utilisation

### **Initialisation**

Au premier lancement, le stock est vide. Pour tester avec des données de démonstration :

1. Ouvrir la console navigateur (F12)
2. Taper : `initDemoStock()`
3. Recharger la page

Cela créera 5 papiers types pour démarrer.

### **Ajouter un Type de Papier**

1. Cliquer sur **"➕ Ajouter Type de Papier"**
2. Sélectionner le type (ex: Couché Brillant)
3. Choisir le grammage (ex: 135 g/m²)
4. Choisir le format (ex: A3)
5. Indiquer la quantité actuelle
6. Définir le seuil d'alerte
7. (Optionnel) Ajouter le prix unitaire
8. (Optionnel) Indiquer le fournisseur
9. Enregistrer

### **Mouvements de Stock**

**Entrée (réception) :**
1. Cliquer sur **"➕ Entrée"** sur la carte du papier
2. Indiquer la quantité reçue
3. Sélectionner le motif (Achat fournisseur, etc.)
4. Ajouter une référence (Bon de livraison)
5. Valider

**Sortie (consommation) :**
1. Cliquer sur **"➖ Sortie"** sur la carte du papier
2. Indiquer la quantité consommée
3. Sélectionner le motif (Production commande, etc.)
4. Référencer la commande si applicable
5. Valider

### **Modifier un Papier**

1. Cliquer sur **"✏️"** sur la carte
2. Modifier les informations
3. Enregistrer

### **Consulter l'Historique**

1. Cliquer sur **"📜 Historique Complet"**
2. Rechercher par papier, motif, référence, ou opérateur
3. Voir tous les mouvements chronologiques

### **Générer un Rapport PDF**

1. Cliquer sur **"📊 Rapport PDF Inventaire"**
2. Le PDF se télécharge automatiquement
3. Contient :
   - Date et heure du rapport
   - Statistiques globales
   - Tableau détaillé par papier
   - Valorisation totale

---

## 💡 Best Practices Métier

### **Organisation du Stock**

**Papiers Haute Rotation :**
- Couché Brillant 135g A3
- Couché Mat 170g A3/SRA3
- Offset 80g A4
- Bristol 250g A4

**Seuils Recommandés :**
- Papiers courants : 5000-10000 feuilles
- Papiers spéciaux : 2000-3000 feuilles
- Gros formats : 500-1000 feuilles

### **Valorisation**

**Prix Indicatifs (Tunisie, 2026) :**
- Couché 135g : ~0.025 DT/feuille
- Couché 170g : ~0.032 DT/feuille
- Offset 80g : ~0.015 DT/feuille
- Bristol 250g : ~0.045 DT/feuille
- Carton 300g : ~0.180 DT/feuille

### **Suivi Qualité**

Utiliser les notes pour préciser :
- Contraintes d'usage ("Réservé photos")
- Date de réception
- Numéro de lot fournisseur
- Observations qualité

---

## 🔧 Personnalisation

### **Ajouter un Format Personnalisé**

Modifier le `<select id="paper-format">` dans `stock.html` :

```html
<option value="35x50">35x50 cm</option>
```

### **Ajouter un Type de Papier**

Modifier le `<select id="paper-category">` :

```html
<option value="Translucide Premium">Translucide Premium</option>
```

### **Modifier les Couleurs**

Variables CSS dans `stock.html` :

```css
:root { 
    --accent: #8b5cf6;  /* Couleur principale */
    --success: #10b981; /* Vert validation */
    --warning: #f59e0b; /* Orange alerte */
    --danger: #ef4444;  /* Rouge urgent */
}
```

---

## 📊 Données Techniques

### **Stockage**

Toutes les données sont en **LocalStorage** navigateur :
- `SIMPACT_STOCK` : Liste des papiers
- `SIMPACT_STOCK_MOVEMENTS` : Historique (max 200)

### **Format des Données**

**Papier :**
```json
{
  "id": "PAPER-1234567890",
  "category": "Couché Brillant",
  "weight": 135,
  "format": "A3",
  "qty": 15000,
  "unit": "feuilles",
  "threshold": 5000,
  "price": 0.025,
  "supplier": "Papeterie du Nord",
  "notes": "Premium photo",
  "createdAt": "2026-02-13T10:30:00.000Z"
}
```

**Mouvement :**
```json
{
  "id": "MOV-1234567890",
  "paperId": "PAPER-1234567890",
  "paperName": "Couché Brillant 135g A3",
  "type": "in",
  "qty": 5000,
  "reason": "Achat fournisseur",
  "ref": "BL-45678",
  "comment": "Livraison palette complète",
  "date": "13/02/2026 10:35:22",
  "user": "Youssef (PDG)"
}
```

---

## 🔐 Sécurité

- Authentification obligatoire (admin/production)
- Pas d'accès externe (LocalStorage isolé par domaine)
- Historique immuable avec horodatage
- Traçabilité complète des opérateurs

---

## 🚧 Évolutions Futures

### **Phase 2 - Intégration Production**
- Déduction automatique du stock lors de la production
- Lien commandes ↔ consommation papier
- Calcul du coût matière par commande

### **Phase 3 - Analytics**
- Graphiques de consommation
- Prévisions de réapprovisionnement
- Analyse des coûts

### **Phase 4 - Multi-sites**
- Gestion de plusieurs magasins
- Transferts inter-sites
- Centralisation des stocks

---

## 📞 Support

**Intégration :** Ce module s'intègre parfaitement à votre portail Simpact existant sans modifier les calculs ni le design global.

**Compatibilité :** Testé sur Chrome, Firefox, Safari, Edge (dernières versions).

**Performance :** Optimisé pour gérer jusqu'à 100 types de papier sans ralentissement.

---

## 📜 License

Développé pour **Simpact** - Imprimerie Numérique Professionnelle
© 2026 - Module propriétaire

---

**Version :** 1.0.0  
**Date :** Février 2026  
**Auteur :** Développement professionnel métier print
