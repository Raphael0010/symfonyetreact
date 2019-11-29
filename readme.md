# Installation

On configure le fichier .env de syfmony ( symfony -> .env)   
( J'ai laissé un .env.local pour exemple)

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


## Information supplémentaire

C'est un CRD pas CRUD je n'ai pas eu le temps de faire la modification d'un client.  
Les relations de notre base de données ont données du fil à retordre sur la gestion du front-end.
( L'IHM ne peut pas attribuer plusieurs formations à un élève)

## License
[MIT](https://choosealicense.com/licenses/mit/)
