export default {

  time: (req, res) => {
    res.jsom({time: Date().toString() });
  },

}
