Pour ce Projet nous avons crée une Api  à l'aide de laravel donc voilà les commandes à suivre pour pouvoir avoir une application fonctionnelle :
tous d'abord après avoir clone le repository il vous faudra faire :
-   un composer install /composer update pour pouvoir avoir le dossier vendor. 
-   vous devrez cree un fichier .env en vous servant du template .envexample avec le bon nom de votre base de donnée utilisé comme mysql, mariaDB ou autre , le tout que vous auriez bien crée en amont.

-   une fois ceci fait vous allez faire un php artisan serve 
-   puis un php artisan migrate --seed pour pouvoir envoyer vos migrations avec des seeders a l'interieur de votre base de donnée (seeders = donnée fictive pour pouvoir realiser des test.)
Vous pouvez testez les routes sur Postman en important la collection disponible dans ce dossier.

- Pour executer l'application il faut impérativement l'executer sur un émulateur et lancé l'API (avec php artisan serve) 


Ensuite faire un "npm install react-native-radio-buttons-group react native elements @react-navigation/native" dans le dossier  InsideReact

Installer ngork et ensuite lancer la commande ngork http avec le port utiliser dans notre cas c'etait le  port 8000
et copier l'addresse URL donnée dans les fichiers ou l'ont fait les appels api. 

Pour finir faire un expo start et scaner le qr code a l'aide de son telephone.
