How to run the application.
#### In Development:
1. Nodemon and ts-node are used together to run the uncompiled typescript files in development. This means you don't have to recompile every time you make changes. 
2. To run locally run ```npm run start:dev``` this will automatically kick off the ts-node process and will also watch for changes.
3. Changes to the development will need to be made in the ```nodemon.json``` file located in the ```spec``` directory.









1. Make sure you have node installed. You can find the proper download file here https://nodejs.org/en/download/
2. Open up the app in your command line. 
3. Run ```npm install ``` to install the dependencies
4. To run app in development mode (nodemon will automatically recompile the Typescript files every time you save) run 
```npm run dev ``` 
5. To build for production run ```npm run build ``` build files will be output in the ```dist ``` folder.

The main entry point for the app is ```index.ts ```


Notes about my development patterns: 
* I like to build my web backends as  Typescript Express Rest Apis. They allow you to easily write other apps that consume the same data. Do you want to write an android app that does some of the same things that your website does? Easy just make a RestApi call to the same Express server.
* You can mimic the Typescript types in most other languages, so you can communicate with these apis from almost any platform.
* You can talk to these apis from any modern frontend framework. My personal favorite is Typescript React. React isn't a big bulky framework. It is a small compact library that you can scale up to be only as big as you need it to be. 
* You could also hook up a frontend written in Vue.js, Angular, jQuery, ect. 
* I strongly suggest using strongly typed frontend implementations. These patterns keep maintenance costs down because they make it easy to identify bugs and other failure points.
* I prefer to use an ORM for small to medium scale projects. While they do have a small impact on performance I believe that having clean, maintainable, and easily scalable code is worth the small performance hit. For larger projects I can tailor specific  data retrieval solutions that make sense on a case by case basis.
* I used Typeorm in this project. I am not a huge fan of it but I wanted to gie it a shot. I think it requires you to write way too much boilerplate code to do things like check if a record exists before inserting it into the database. 
* I like to put my db credentials in the environment variables to keep the configuration lightweight.
* I will group configs for different modules together with comments to label them. I think class based credential modules are needlessly bulky.
* It also makes it easy to spot mistakes in credentials application wide.
  
   