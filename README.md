## Phorum

#

## FEATURES

- User can create an account and have a profile
- User can log in
- User can change password
- User can reset password
- User & guest can read posts
- User can create posts
- User can comment on posts
- User can update own comment
- User can delete own comment
- User can update own posts
- User can delete own posts
- User can bookmark posts
- Extras: JWT Authorization

#

## Technologies used

- Nextjs
- Mongodb
- JWT
- SCSS

#

### API ENDPOINTS

#

#### Authentication

| URI                                    | HTTP Method | Description           | Status |
| -------------------------------------- | ----------- | --------------------- | ------ |
| <code>/api/auth/signup</code>          | `POST`      | Create an account.    | Done   |
| <code>/api/auth/login</code>           | `POST`      | Log in to an account. | Done   |
| <code>/api/auth/forgot-password</code> | `POST`      | Forgot password       | Done   |
| <code>/api/auth/reset-password</code>  | `PATCH`     | Reset password.       | Done   |
| <code>/api/auth/change-password</code> | `PATCH`     | Change user password. | Done   |

#

#### POSTS API Routes

| URI                                                | HTTP Method | Description               | Status |
| -------------------------------------------------- | ----------- | ------------------------- | ------ |
| <code>/api/posts?q=query&page=1&per_page=10</code> | `GET`       | List all posts available. | Done   |
| <code>/api/posts/create</code>                     | `POST`      | Create a post             | Done   |
| <code>/api/posts/:id</code>                        | `GET`       | Get a post by id          | Done   |
| <code>/api/posts/:id/remove</code>                 | `DELETE`    | Delete a post.            | Done   |
| <code>/api/posts/:id/update</code>                 | `PATCH`     | Update a post.            | Done   |

#

#### COMMENTS API Routes

| URI                                   | HTTP Method | Description             | Status |
| ------------------------------------- | ----------- | ----------------------- | ------ |
| <code>/api/comments/:id</code>        | `GET`       | Get comments by post id | Done   |
| <code>/api/comments/:id/create</code> | `POST`      | Create a comment.       | Done   |
| <code>/api/comments/:id/remove</code> | `DELETE`    | Delete comment by id.   | Done   |
| <code>/api/comments/:id/update</code> | `PATCH`     | update a comment by id. | Done   |

#

#### LIKES API Routes

| URI                                | HTTP Method | Description                           | Status |
| ---------------------------------- | ----------- | ------------------------------------- | ------ |
| <code>/api/likes/:id/count</code>  | `GET`       | Number of likes by comment or post Id | Done   |
| <code>/api/likes/:id/like</code>   | `POST`      | Like a comment / post by id           | Done   |
| <code>/api/likes/:id/unlike</code> | `POST`      | unlike a comment / post by id         | Done   |

#

#### USERS API Routes

| URI                                                | HTTP Method | Description                   | Status |
| -------------------------------------------------- | ----------- | ----------------------------- | ------ |
| <code>/api/users?q=query&page=1&per_page=10</code> | `GET`       | Get all users                 | Done   |
| <code>/api/users/:id</code>                        | `GET`       | Get a user by id              | Done   |
| <code>/api/users/:id/posts</code>                  | `GET`       | Get all posts by a user.      | Done   |
| <code>/api/users/:id/followers</code>              | `GET`       | Get all followers by a user.  | Done   |
| <code>/api/users/:id/following</code>              | `GET`       | Get all followings of a user. | Done   |
| <code>/api/users/:id/follow</code>                 | `POST`      | follow a user                 | Done   |
| <code>/api/users/:id/unfollow</code>               | `POST`      | Unfollow a user               | Done   |
| <code>/api/users/:id/remove</code>                 | `DELETE`    | remove a user by id.          | Done   |
| <code>/api/users/:id/update</code>                 | `PATCH`     | update a user by id.          | To do  |
