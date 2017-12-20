const logger = (message, type = "success") => type === "error" ? console.error(message) : console.log(message);

module.exports = {
  logger
};