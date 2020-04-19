export default {

  signup: (req, res) => {
    const { name, email, password } = req.body;
    const signupFields = { name, email, password };
    res.json({ user: signupFields });
  },
  
}
