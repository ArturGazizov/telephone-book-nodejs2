const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitLab!
const url = 'mongodb+srv://missismama:U7y6u7Y6@cluster0-wcm2d.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url)

const Teleph = mongoose.model('Telephone', {
  number: String,
  name: String
})


module.exports = Teleph