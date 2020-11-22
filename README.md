# Metaorg
This is built on Angular <> NodeJS <> PostgresSql stack where whole UI would be rendered from DB tables.
Please refer dbinfo.txt for Angular formly related options

# Implemented Tech/Services
* Angular formly rendering from DB.
* HTTP Interceptors.
* Metaservices to hook REST APIs.
* Loaders.
* Persist data to DB.
* Dynamically List "View","Delete","Edit" & "Clone" Options.
* Retreve and load data to forms for edit.
* Implement multi-step forms.
* Display JSON as pretty in a model.

# Screenshots
![alt text](https://github.com/pradeepgithubrepo/metaorg/blob/main/src/screenshots/Screenshot%202020-11-19%20at%203.46.22%20PM.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build..

## Further help

Create a SQL table either in MYSQL or postgres.
CREATE TABLE metaconfig(source VARCHAR ( 250 ) PRIMARY KEY, metadata JSON);

Please refer dbinfo.txt for Angular formly related options

