
# Next.js, Mongo(Mongoose) and Material UI Starter Boilerplate

A Next.js and Mongoose web application with Material UI as the design system WITH MINIMUM CUSTOM CSS, just bare-bones MUI with default theme and colors palette, designed as a starting point of any web application. All pages and components has stories with storybook v7.


## Demo

https://next-js-mongo-db-mui-boilerplate.vercel.app/


## Acknowledgements
[This project was based in hoangvvo Next.js MongoDB boilerplate](https://stackedit.io/app#:~:text=based%20in%20hoangvvo-,Next.js%20MongoDB,-boilerplate)

## Features

- MVC Architecture
- Automatic dark/light mode
- Clean Material UI v5 implementation 💅
- Full API Routes implementation and Serverless ready
- Middleware pattern, compatible with Express ecosystem, powered by next-connect



## Tech Stack

**Client:** React 18, Next.js 13, Material UI 5

**Server:** Next.js 13, Node, Mongoose 7

**Development:** Storybook 7, Mongodb Memory Server, Jest, Prettier


### Authentication and Account
- Session-based authentication (Passport.js)
- Sign up/Log in/Sign out API
- Authentication via email/password
- Email verification
- Password change
- Password reset via email
- Profile
- Profile picture, username, name, bio, email
- Update user profile
### Profile
- Profile picture, username, name, bio, email
- Update user profile

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CLOUDINARY_URL` (optional, Cloudinary only) Cloudinary environment variable for configuration

`MONGODB_URI` (Required) The MongoDB Connection String (with credentials and database name)

`WEB_URI`(Required) The URL of your web app

`NODEMAILER_CONFIG` (Required) JSON stringified nodemailer config. eg: ```{"service":"Gmail","auth":{"user":"example@gmail.com","pass":"aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ=="}}```
## Development
- Start the development server by running yarn dev. Getting started by create a .env.local file with the above variables. See Environment Variables.
- Start Storybook with yarn storybook

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started. You can create pull request to this project and be a contributor.


## License

[MIT](https://choosealicense.com/licenses/mit/)

