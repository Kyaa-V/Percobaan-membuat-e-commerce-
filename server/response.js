const dbResponse = (statusCode, result, message, res) => {
  const isError = statusCode >= 400;

  res.status(statusCode).json({
    succes: !isError,
    datas: isError ? null : result,
    error : isError ? result :null,
    message: message,
  });
};
module.exports = dbResponse;
