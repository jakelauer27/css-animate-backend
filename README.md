# CSS-Animate (Backend)

This is the backend for the [CSS-Animate app](https://github.com/jakelauer27/css-animate-frontend)

## API - Endpoints


###### Users

* ##### Sign In `/api/users`
  (POST) To sign in you will need to pass in *email* and *password* to the *body*.
  Emails should be sent in all lowercase. - ex: `{..., body: {email: 'tim@aol.com', password: 'password'} }`

* ##### Create Account - `/api/users/new`
  (POST) Creating an account must have all input fields filled in (name, email, password)
  Send all three into the body. Passwords are case sensitive.
  Response only gives the new user ID.

* ##### Get Prebuilt Animations `/api/users/animations`
  (GET) Retrieves an array of prebuilt animations
  
* ##### Get All My Animations `/api/users/:user_id/animations`
  (GET) Retrieves an array of all personal animations.
  
* ##### Add Animation `/api/users/:user_id/animations`
  (POST) Adds personal animation to account. Pass (user_id, ani_name, keyframes, properties) to the body.
  
* ##### Edit Animation `/users/:user_id/animations/:animation_id`
  (PUT) Edits a personal animation. Pass (animation_id, user_id, ani_name, keyframes, properties) to the body.
  
* ##### Delete Animation `/users/:user_id/animations/:animation_id`
  (DELETE) Deletes a personal animation. Pass (animation_id, user_id) to the body.
  


## Tech Used

*Node.js
*express
*sql

