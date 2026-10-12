# 🎮 Pong

**[▶️ Jouer en ligne](https://starkiou.github.io/pong/)**

Un Pong en solo, façon squash, développé en HTML5, CSS et JavaScript vanilla : une raquette, trois murs, et une balle qui accélère à chaque rebond. Le score est le temps tenu avant de la laisser passer.

## ✨ Fonctionnalités

- 🎯 Gameplay fluide et réactif avec animation en temps réel
- ⌨️ Contrôles au clavier (flèches gauche/droite)
- 📱 Contrôles tactiles (boutons on-screen)
- 📊 Système de score en temps réel
- 🏆 Sauvegarde du meilleur score avec localStorage
- 📈 Accélération progressive de la balle

## 🎮 Comment Jouer

1. Ouvrez `index.html` dans votre navigateur
2. Cliquez sur **"commencer la partie"** pour démarrer
3. Déplacez la raquette pour maintenir la balle en jeu
4. La balle s'accélère à chaque rebond
5. Si la balle passe sous la raquette, vous perdez !

## 🕹️ Contrôles

### Clavier
- **Flèche Gauche** : Déplacer la raquette à gauche
- **Flèche Droite** : Déplacer la raquette à droite

### Tactile/Souris
- **Bouton ⬅️** : Déplacer la raquette à gauche
- **Bouton ➡️** : Déplacer la raquette à droite

*Vous pouvez rester appuyé pour un mouvement continu*

## 📂 Structure du Projet

```
pong/
├── index.html          # Page HTML principale
├── css/
│   └── style.css      # Styles CSS
├── js/
│   └── scripts.js     # Logique du jeu
└── README.md          # Ce fichier
```

## 🚀 Installation

Aucune installation requise ! Il suffit de :

1. Cloner le repository ou télécharger les fichiers
2. Ouvrir `index.html` dans un navigateur web
3. C'est prêt à jouer ! 🎉

## 🛠️ Technologie

- **HTML5** : Structure et canvas pour le rendu du jeu
- **CSS3** : Design responsive et moderne
- **JavaScript Vanilla** : Logique du jeu sans dépendances

## 🧠 Ce que j'ai appris

- **Delta time** : les vitesses sont exprimées en pixels par seconde et multipliées par le temps écoulé entre deux frames, pour que le jeu aille à la même vitesse sur un écran 60 Hz ou 144 Hz.
- **Boucle de jeu** : une seule boucle `requestAnimationFrame` met à jour, dessine et compte le score, et elle s'arrête réellement au game over.
- **Entrées** : l'état des touches est gardé dans une table lue à chaque frame, plutôt que de dépendre de la répétition automatique du clavier.
- **Collisions** : un rebond ne compte que si la balle se dirige vers l'obstacle, ce qui évite les doubles rebonds sur la raquette.

## 💾 Sauvegarde

Le meilleur score est automatiquement sauvegardé dans le localStorage de votre navigateur.

## 🎨 Personnalisation

Vous pouvez personnaliser le jeu en modifiant :
- Les couleurs dans `style.css`
- Les vitesses dans `scripts.js`
- La taille du canvas dans `index.html`

**Bon jeu ! 🎮**
