export const ncOpts = {
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).send('Page is not found');
  }
};
