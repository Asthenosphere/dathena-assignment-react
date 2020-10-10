# Dathena Assignment React

This is a User Manager built with React and TypeScript. The UI framework used is Ionic 5, a cutting-edge framework to build fast and repsonsive Progressive Web Application (PWA) that runs on all platforms. The system administrator can perform the basic create, read, update and delete (CRUD) operations via the app.

This app accompanies a simple [API server](https://github.com/Asthenosphere/dathena-assignment-api) built with express and JavaScript.

This app is live on production at [dathena-assignment-react](https://dathena-assignment-react.herokuapp.com).

## Getting Started

### Installing the Pre-requisites

Ensure that you have Node.js v14.10.1 and npm installed.

If you do not have Node.js installed on your machine currently, it is highly recommended to install Node.js from their site [here](https://nodejs.org/en/). This will not only install the latest version of Node.js but also npm as well.

## Development

### Getting the app

#### Clone from GitHub

`git clone git@github.com:Asthenosphere/dathena-assignment-react.git`

#### Download the archive

URL: [.zip](https://github.com/Asthenosphere/dathena-assignment-react/archive/v0.0.1.zip)

### Install dependencies

`npm install`

### Start app in development

`npm start`

### To run the test cases

`npm run test`

## User Guide

### Viewing all users

By default, the app displays a list of all users currently existing in the database for you.

### Viewing a particular user

Click on one item in the users list will bring up a modal to display the details of the user.

### Updating / deleting the user

Once inside the user details modal, you may click on the `pencil` icon below the avatar to toggle between view mode and edit mode. The rationale behind this 'extra step' is to prevent accidental modification of the details of the user displayed.

Upon entering the edit mode, you may directly change the user's details. The `Save User` button at the bottom of the page will save the updated details. Note, however, that this button will be disabled unless there are actual changes to the user's details. This is to prevent unnecessary API calls that may affect the performance of the app.

At the bottom right, a `Delete User` button can be found. Upon clicking, the app will prompt you whether you are sure that you would like to delete this user. This step is also to prevent any accidental deletion of users.

However, due to the uncertain speed of making an API call to the [API server](https://github.com/Asthenosphere/dathena-assignment-api), it is possible that the users list is not immediately updated, please refresh the page if you encounter such issues (This applies to creating new user as well).

### Creating new user

When in users list page, there is a round button at the bottom right of the window with a plus sign on it. Upon clicking, a new user form will appear and you may use this form to fill in the credentials of a new user. Note that the email field cannot be duplicated (i.e. the email of the new user cannot be the same as any existing user). Also, all fields in this form are compulsory. There is also checks against the validity of email.

Upon successful submission, the new user will be saved to the database and it should appear on the users list.

### Searching for users

When in users list page, you may type keywords into the search bar to search for users. The search is based on matching of entered keywords with the first name and last name of all the users.
