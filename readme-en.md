# Template Project

[russian version](README.md)

### Before Install:

Check if you have node.js installed. Type in terminal:

```bash
node --version
```

If node.js is not installed:

- [install node.js](https://nodejs.org/ru/)

### How to use:

#### Create own repo from this template using "Use This Template" button.

More details [here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).
After creating your own repo from template, just clone it and use.

#### Or clone it manually

1. clone repo:

   ```bash
   git clone https://github.com/frontend05102019/GULP_TEMPLATE_PROJECT.git
   ```

2. open cloned folder in terminal (you can rename folder as you like)
3. replace remote repo in git config with your remote repo:

   ```bash
   git remote set-url origin <YOUR LINK TO YOUR REMOTE REPO>
   ```

4. replace user name and user email in git config with your name and email

### How to start project:

1. open project folder in terminal

2. install project dependencies:

   ```bash
   npm install
   ```

3. run project:
   - to run project with less compiler:
     ```bash
     npm run serve-less
     # or
     npm run serve
     ```
   - to run project with sass compiler:
     ```bash
     npm run serve-sass
     ```

##### Project will start on localhost:3000.

##### Project will auto reload on every files save.

##### TO EXIT, in terminal PRESS Ctrl+C.

#### How to change compilers:

To change compliers you need to stop project with Ctrl+C command, than change extension of main file in /src/styles folder and run project with appropriate command. Example of changing less compiler to sass compiler:

- stop project(if it was running) and replace main.less with main.sass or just add new file main.sass into /src/styles/ folder
- run project with 'npm run serve-sass' command

### How to write code:

1. You should work ONLY in /src folder
2. All html code should be in /src/index.html
3. All styles must be in /src/styles/main.less. If you want to add extra styles file, add it in src/styles folder and import it into main.less
4. All fonts should be placed into /src/fonts and imported into main.less from this folder, e.g.:

```bash
    # in /src/styles/main.less
    @font-face {
        font-family: "christmas";
        src: url("../fonts/christmaseve.ttf");
    }
```

5. All images(png, img, svg) should be placed into /src/images and imported from this folder, e.g:

```bash
    # in src/index.html
    <img src="./images/testImage.jpg" alt="test image" />
```
