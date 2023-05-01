class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

export const httpError = (status, message) => {
  return Object.assign(new HttpError(), { status, message });
};
