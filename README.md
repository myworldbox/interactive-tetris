## Interactive Tetris

HTML + CSS + JavaScript + Docker + Express.JS + Socket.io


## Quick start

```bash
# clone repo
git clone https://github.com/myworldbox/interactive-tetris.git

# download module
1. npm install
2. yarn
3. docker build . -t interactive-tetris

# start development
1. npm start
2. yarn start
3. docker run -d -p 8000:8000 interactive-tetris
```

## useful command

```bash
# quick github commit
1. npm commit
2. yarn commit

# sync latest change from GitHub
1. npm refresh
2. yarn refresh
```

## api

```bash
# function can be triggered by both POST request
# [ POST ] - req.body

# root
/

#  register function
/register

`{
  "username": "victor",
  "name": "Victor",
  "password": "password"
}`

Response:

1. Username is empty:
`{ status: "error", error: "username is empty" }`

2. Username contains special characters (using lab 5 regex):
`{ status: "error", error: "username should contains only underscores, letters or numbers" }`

3. Username already exists:
`{ status: "error", error: "username already exists" }`

4. Name is empty:
`{ status: "error", error: "name is empty" }`

5. Password is empty:
`{ status: "error", error: "password is empty" }`

6. Success:
`{ status: "success", message: "users has been created" }`

# sign in function

/signIn
`{
  "username": "victor",
  "password": "password"
}`

Response:

1. Username does not exists:
`{ status: "error", error: "user does not exists" }`

2. Password is incorrect:
`{ status: "error", error: "password is incorrect" }`

3. Success:
`{ status: "success", message: "successfully logged in", user: { name: "Victor", username: "victor"} }`
```

## vercel deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/myworldbox/interactive-tetris)