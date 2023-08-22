export const articleMessages = {
  error: {
    badRequest: "Invalid article data sent to server",
    notFound: "No article found with the provided id",
    forbidden: "User is not permitted to delete this article",
    validator: {
      url: {
        link: "Article link must be a valid URL",
        image: "Article image must be a valid URL",
      },
    },
  },
  response: {
    deleted: "Article deleted",
  },
};

export const userMessages = {
  error: {
    badRequest: "Invalid user data sent to server",
    notFound: "No user found",
    conflict: "Entered email address already exists",
    unauthorized: "Entered email and/or password is wrong",
    validator: {
      email: "Entered an invalid email",
    },
  },
};

export const authErrorMessage = "Authorization token is missing";

export const defaultErrorMessage = "An error occurred on the server";
