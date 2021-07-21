const messages = {
  notAuthorized: {
    message: "User not authorized",
    success: false,
  },
  invalidEmail: {
    message: "Invalid email address",
    success: false,
  },
  // posts
  postCreated: {
    message: "Post has been created",
    success: true,
  },
  postUpdated: {
    message: "Post updated successfully",
    success: true,
  },
  postDeleted: {
    message: "Post deleted",
    success: true,
  },
  postNotCreated: {
    message: "Post not created, fill in post title and post text",
    success: false,
  },
  postNotFound: {
    message: "Post(s) not found",
    success: false,
  },
  // users
  userNotFound: {
    message: "User(s) not found",
    success: false,
  },
  userNotAuthorized: {
    message: "You are not authorised. Not an admin",
    success: false,
  },
  userDeleted: {
    message: "User deleted",
    success: true,
  },
  // comments
  commentNotFound: {
    message: "Comment(s) not found",
    success: false,
  },
  commentDeleted: {
    message: "Comment deleted",
    succes: true,
  },
  commentCreated: {
    success: true,
    message: "Comment created",
  },
  commentNotCreated: {
    success: false,
    message: "Comment not created",
  },
  commentUpdated: {
    success: true,
    message: "Comment updated",
  },
  // others
  errorOccured: {
    message: "An error occured. Try again",
    success: false,
  },
};

export default messages;
