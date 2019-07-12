# Installation

On configure le fichier .env de syfmony ( symfony -> .env)   
( J'ai laisser un .env.local pour exemple)

## On récupère les dépendances symfony et react 

On se met dans le dossier symfony et on lance : 

```
composer install
```

On se met dans le dossier reactproject et on lance : 

```
yarn
```
## Création de la base de données

Pour créer la base de données :
```
./bin/console doctrine:database:create
./bin/console doctrine:schema:update --force
```

## Utilisation
### - On démarre le serveur react
Attention il faut se placer dans le dossier "reactproject" !
```
yarn start
```

### - On démarre le serveur symfony
Attention il faut se placer dans le dossier "symfony" !
```
php bin/console server:run
```


Please make sure to update tests as appropriate.

## Information supplémentaire

C'est un CRD pas CRUD j'ai pas eu le temps de faire la modification d'un client.  
Les relations de notre base de données ont donné du fil à retorde à la gestion du front-end.
( sur le front on ne peut pas attribuer plusieurs formation à un élèves)

## License
[MIT](https://choosealicense.com/licenses/mit/)