Tuto Install

1 -> On configure le fichier .env de syfmony ( symfony -> env) ( J'ai laisser un .env.local pour exemple)
1.1 -> On récupère les dépendances symfony et react :
    -> On se met dans le dossier symfony et on lance : composer install
    -> On se met dans le dossier reactproject et on lance : yarn 

2 -> On lance cette comande pour créer la base de données : 
./bin/console doctrine:database:create && ./bin/console doctrine:schema:update --force

3 -> On démarre le serveur symfony : on se place dans le dossier symfony !! ( php bin/console server:run )
4 -> On démarre le serveur react : on se place dans le dossier reactproject !! ( yarn start )

C'est un CRD pas CRUD j'ai pas eu le temps de faire la modification d'un client.
Les relations de notre base de données ont donné du fil à retorde à la gestion du front-end.
( sur le front on ne peut pas attribuer plusieurs formation à un élèves)
