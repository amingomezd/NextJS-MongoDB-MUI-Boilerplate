export const responseHelper = (handler) => async (req, res) => {
  try {
    const result = await handler(req, res);
    const status = result && result.status ? result.status : 200;

    if (result) {
      res.status(status).json(result);
    } else {
      res.status(status).end();
    }
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};
