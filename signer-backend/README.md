# signer-backend

Signing Transactions for this system

### How to use Documentation Server 

### Day Two 
Engineers who have made it past day one, congratulations. On Day 2 start your workstation with this.

```bash
mdbook serve 
```

## How to use Fullstack App

demo landing page

```zsh
cd core
npm run dev
```

then go into browser and navigate to 

```
http://localhost:8080/form.html
```

### Steps Summarized in order

* For testing purposes compile the hot reload server `/typical/signer-backend/docs`
* For the domain connection please cd into `/etc/nginx` and check on conf.d
* Use `git pull origin staging` or some combination similar
* Lastly make sure nginx is running
* Verify it works by navigating in a browser and expect `<ip_addr>:<port>` is online
* Verify the domain works by going to the domain dot com directly with and without www

## How to get started 

### The directories

`core`

Backend business logic

`docs`

Documentation and spec

### Assume you have the following dependencies
- Rust `rustc` and `cargo`
- Cargo bin in path
- mdbook installed via cargo or from source

  

```bash
git clone
```

then

```bash
cd signer-backend
cd docs
```


### Typiaclly not needed


```bash
mdbook init
```

### To serve test server

```bash
mdbook serve 
```
  
In chrome go to <IP_ADDRESS>


## The init command

There is some minimal boilerplate that is the same for every new book. It's for this purpose that mdBook includes an init command.

The init command is used like this:

```bash
mdbook init
```

When using the init command for the first time, a couple of files will be set up for you:

```
book-test/
├── book
└── src
    ├── chapter_1.md
    ├── chapter_2.md
    ├── chapter_3.md
    ├── chapter_4.md
    └── SUMMARY.md
```

The src directory is were you write your book in markdown. It contains all the source files, configuration files, etc.

The book directory is where your book is rendered. All the output is ready to be uploaded to a server to be seen by your audience.

The SUMMARY.md file is the most important file, it's the skeleton of your book and is discussed in more detail in another chapter.


### Roles

This app is designed to be launched by others who come from a non-technical background. 

That person would like the ability to upload their own content. Based on current build, that would mean

* A way to upload form data such as images and other content 
* That means the user will need an app interface for it
* A preview feature 
* A way to send email as an alternative means to upload those forms


### Example


As an admin user

An admin will typically be interacting with remote developers. Mid-way through, they will need to communicate to remote team various company protocols. 

If a remote engineer is creating deliverables, those deliverables will have to be modular. 

For example: An email module is needed to help with a specific business logic for users to upload form data but rather as an email. 

