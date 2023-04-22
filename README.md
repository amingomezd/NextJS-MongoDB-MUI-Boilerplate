This project was based in hoangvvo [Next.js MongoDB](https://github.com/hoangvvo/nextjs-mongodb-app) boilerplate

<h1 align="center">Next.js MongoDB Material UI Starter Boilerplate.</h1>

<div align="center">
  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Famingomezd%2FNextJS-MongoDB-MUI-Boilerplate&env=MONGODB_URI,NODEMAILER_CONFIG,WEB_URI,CLOUDINARY_URL&envDescription=MONGODB_URI%20and%20NODEMAILER_CONFIG%20are%20mandatory)

An [**Next.js**](https://github.com/zeit/next.js/) and [**MongoDB**](https://www.mongodb.com/) web application with Material UI as the design system, designed as an starting point of any web application. All pages and components has stories with storybook v7.

:rocket: [Check out the demo](https://next-js-mongo-db-mui-boilerplate.vercel.app/) :rocket:

</div>

<h2 align="center">Features</h2>

<div align="center">

Clean Material UI v5 implementation

Next.js 13 and React.js 18

Storybook v7

✨ Full [API Routes](https://nextjs.org/blog/next-9#api-routes) implementation and 👻 Serverless ready

🤠 Middleware pattern, compatible with Express ecosystem, powered by [next-connect](https://github.com/hoangvvo/next-connect)

📙 Can be adapted to any databases besides MongoDB (Just update [api-lib/db](api-lib/db))

</div>

<h3 align="center">Authentication and Account</h3>

<div align="center">

- [x] Session-based authentication ([Passport.js](https://github.com/jaredhanson/passport))
- [x] Sign up/Log in/Sign out API
- [x] Authentication via email/password
- [x] Email verification
- [x] Password change
- [x] Password reset via email

</div>

<h3 align="center">Profile</h3>

<div align="center">

- [x] Profile picture, username, name, bio, email
- [x] Update user profile

</div>

<div align="center">
  
<sup>Have any features that interest you, [make an issue](https://github.com/amingomezd/NextJS-MongoDB-MUI-Boilerplate/issues). Would like to work on a feature, [make a PR](https://github.com/amingomezd/NextJS-MongoDB-MUI-Boilerplate/pulls).<sup>
  
</div>

<h3 align="center">Environmental variables</h3>

Environmental variables in this project include:

- `MONGODB_URI` (Mandatory) The MongoDB Connection String (with credentials and database name)
- `WEB_URI` The _URL_ of your web app.
- `CLOUDINARY_URL` (optional, Cloudinary **only**) Cloudinary environment variable for configuration. See [this](https://cloudinary.com/documentation/node_integration#configuration).
- `NODEMAILER_CONFIG` (Mandatory) JSON stringified nodemailer config. eg. `{"service":"Gmail","auth":{"user":"hoangvvo.02@gmail.com","pass":"aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ=="}}`

<h3 align="center">Development</h3>

- Start the development server by running `yarn dev` or `npm run dev`. Getting started by create a `.env.local` file with the above variables. See [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables).
- Start Storybook with `yarn storybook`

<h2 align="center">Deployment</h2>

This project can be deployed [anywhere Next.js can be deployed](https://nextjs.org/docs/deployment). Make sure to set the environment variables using the options provided by your cloud/hosting providers.

After building using `yarn build`, simply start the server using `npm run start`.

You can also deploy this with serverless providers given the correct setup.

<h2 align="center">Contributing</h2>

<div align="center">
  
You can create pull request to this project and be a contributor.

</div>

<h2 align="center">
  License
</h2>

<div align="center">
  
  [MIT](LICENSE)
  
</div>
