## Ever wondered how to setup Vue in your laravel project.
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rmtm25h4rb9sgsw3505z.png)
## Laravel
Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation — freeing you to create without sweating the small things.
Here is a link to their Documentation.
### [Laravel](https://laravel.com/docs/8.x)

## Vue
Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.
Here is the link to their documentation.
### [Vue js](https://vuejs.org/)
## Requirements:
```
mysql 8.*
php 7.4.*
nginx
```
## Installation

### composer
```
# test
composer update

```

### .env
```
# change DB_DATABASE, DB_USERNAME, DB_PASSWORD
# set APP_URL - domain of any company (с http://)
php artisan key:generate
php artisan passport:key
```

### storage
```
php artisan storage:link
```

### frontend
```
npm install
npm run watch
```

## Update to actual state (!!only for test)
```
composer install
php artisan migrate:fresh --seed
php artisan optimize:clear
php artisan passport:install
```

## Test user in database
```json
{
    "email": "testuser@maketmarket.test",
    "name": "test",
    "phone": "79999999999",
    "password": "secret",
    "region": "moscow"
}
```
