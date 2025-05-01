# Ad Attribution System Frontend

### Description

Frontend for Ad Attribution system

### Project Setup

1. Install Node.js
2. Install dependencies using `yarn install`
3. Run project using `yarn dev`

### Coding Standards

#### File Structure

- Separate components, styles, and utility functions into their respective directories.
- Follow a consistent naming convention for files and directories.

#### Naming Conventions

- Use descriptive names for variables, functions, and components.
- Follow camelCase for variable and function names.
- Use PascalCase for component names.

#### Formatting

- Use Prettier to format the code

#### Linting

- Use ESLint for linting

### Deployment

#### Manual Deployment

1. Clone the project
2. Install dependencies using `yarn install`
3. Set environment variables in `.env` file
4. Build the project using `yarn build`
5. Copy files in `/dist` folder to the respective service

#### Automatic Deployment to EC2

We use GitHub Actions for CI/CD pipeline.

##### Environments

- Staging (from develop branch)
- Production (from master branch)

##### Environment variables

- Set `EC2_HOST`, `EC2_USER`, and `EC2_SSH_KEY` secrets in repository settings.
  Curious where to get them? Refer to this [link](https://superuser.com/questions/448211/how-to-obtain-public-ssh-key-in-amazon-ec2-server)
- Set `VITE_SERVER_ENDPOINT` with the respective API url
