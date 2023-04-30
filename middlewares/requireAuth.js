export const requireLoggedInUser = (req, res, next) => {
  if (!req.user) {
    req.status(401).send({ error: 'Authentication required. Please log in to continue.' });
    return;
  }

  next();
};
