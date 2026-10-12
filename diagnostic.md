## Diagnostique de FAIL CI

[Actions](https://github.com/ForWarZz/res507-2025-2026-work/actions/runs/38213248156/job/114691981000)

On constate que l'erreur apparait au moment de l'étape du smoke container.
=> "curl: (7) Failed to connect to localhost port 3000 after 0 ms: Couldn't connect to server"

Il y avait donc un problème de redirection de port avec le container Docker créé.
Le port externe 3001 redirigeait sur le port interne 3000.

### Mais le container faisait le health check sur le port 3000.
La correction était donc de reconfigurer la redirection de port sur le port 3000 comme au départ.
