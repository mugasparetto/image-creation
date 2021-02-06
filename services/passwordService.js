const verifyPassword = async (req, res, next) => {
  const { password } = req.body;
  const { PASSWORD } = process.env;
  res.send(password === PASSWORD);
};

export default { verifyPassword };
