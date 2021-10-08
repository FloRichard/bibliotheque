# bibliotheque
Projet de gestion d'une bibliothèque crée par Julien Monteil et Florian RICHARD.

## Prérequis
Pour pouvoir utiliser notre application vous devez disposer des logiciels suivants:

 - Docker
 - Make
 - Un navigateur web
 - Un client Git
 
 Pour récupérer le projet il faut cloner le dépôt sur votre machine.
 Cliquez [ici](https://github.com/FloRichard/bibliotheque) pour accèder au dépôt.
 ## Architecture
 Notre application est composé de 4 services :
 - **librarymanager** : service gérant la partie métier de la bibliothèque
 - **usermanager** :  service d'authentification et de gestion des utilisateurs
 - **librarygateway** : c'est le front de notre application, ce service rend les pages web au navigateur
 - **authproxy** : reverse proxy qui gère les requêtes entrantes depuis librarymanager vers usermanager ou librarymanager. Il gère aussi les autorisations selon les routes
 
 ![enter image description here](archi_web_service.png)
 
 
## Deployer les services
Aller à la racine du projet `/bibliotheque`
Ouvrir un terminal de commande et lancer la commande `make deploy`