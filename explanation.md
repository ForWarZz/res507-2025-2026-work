## Actuellement, avec la CI...

- Elle permet de vérifier la syntaxe de l'application JS faisant un premier test de qualité de code.
- Elle installe les dépendences, lance une base de données, et exécute les tests unitaires.
- Elle construit l'image Docker correspondante
- Elle teste si le container Docker avec l'image de l'app se lance correctement et check que le HEALTH passe

## Ce qu'elle ne fait pas...

- Ne fait aucun tests de performances
- Ne fait aucun tests de sécurité
- Ne garantit pas le fonctionnement en production (l'image Docker est construite.. mais la production peut avoir un environnement spéciale avec BDD etc)

## Diagnostique de FAIL CI

[Actions](https://github.com/ForWarZz/res507-2025-2026-work/actions/runs/38222788053/job/114722854903)

On constate bien un souci sur l'étape du check de la syntaxe Javascript
Des accolades et parenthèses étaient manquantes.

## Correction

Correction de la syntaxe en rajoutant les parenthèses et accolades nécessaires.
