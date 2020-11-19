# Metaorg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Create a SQL table either in MYSQL or postgres.
CREATE TABLE metaconfig(source VARCHAR ( 250 ) PRIMARY KEY, metadata JSON);

insert into metaconfig values('default','[{"template":"<div class=\\\"py-3 text-center\\\"><h4>Source Details</h4></div>"},{"template":"<hr/>"},{"key":"source","type":"input","templateOptions":{"label":"Source","placeholder":"Enter sourcename","required":true}},{"template":"<div class="py-3 text-center"><h4>Header Validations</h4></div>"},{"key":"file_validation","type":"select","templateOptions":{"label":"File Validation","required":true,"options":[{"label":"True","value":"true"},{"label":"False","value":"false"}]}},{"key":"file_type","type":"select","templateOptions":{"label":"File Type","required":true,"options":[{"label":"csv","value":"csv"},{"label":"json","value":"json"},{"label":"xml","value":"xml"},{"label":"fixed","value":"fixed"}]}},{"key":"com_header_value","type":"input","templateOptions":{"label":"Header Value","placeholder":"Enter starting length of header value","required":true}},{"key":"row_length","type":"input","templateOptions":{"label":"Row Length","placeholder":"Enter row length of each line ..250 etc","required":true}},{"template":"<hr/>"},{"template":"<div class=\\\"py-3 text-center\\\"><h4>CDC Queries</h4></div>"},{"key":"key_fields","type":"textarea","templateOptions":{"label":"Key Fields","placeholder":"Enter the key fields in comma seperated field values","required":true}},{"key":"com_bronze_query","type":"textarea","templateOptions":{"label":"Bronze layer Query","placeholder":"Enter your query here","description":"Select * from raw_table where x >y","required":true}},{"key":"com_silver_query","type":"textarea","templateOptions":{"label":"Silver layer Query","placeholder":"Enter your query here","description":"Select * from bronze_table where a >b","required":true}},{"template":"<hr/>"},{"template":"<div class=\\\"py-3 text-center\\\"><h4>Trailer Validations</h4></div>"},{"key":"com_trailer_validation","type":"select","templateOptions":{"label":"Trailer Validation","placeholder":"Select placeholder","required":true,"options":[{"label":"True","value":"true"},{"label":"False","value":"false"}]}},{"key":"com_trailer_position","type":"textarea","templateOptions":{"label":"Trailer Position","placeholder":"e.g 10","description":"Enter the trailer postiion as 10 (start pos,Endpos)","required":false}},{"key":"com_trailer_value","type":"textarea","templateOptions":{"label":"Trailer value","placeholder":"e.g 10","description":"Enter the trailer postiion as 10","required":false}}]');

insert into metaconfig values('prime','[{"template":"<div class=\\\"py-3 text-center\\\"><h4>Pre Processing</h4></div>"},{"key":"preprocessing_key","type":"input","templateOptions":{"label":"Preprocessing key","placeholder":"Enter a preprocesing key!","required":true}},{"key":"preprocessing_query","type":"input","templateOptions":{"label":"Preprocessing Query","placeholder":"Enter preprocessing query","required":true}}]');

