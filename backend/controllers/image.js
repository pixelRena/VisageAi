const Clarifai = require('clarifai');

const handleApiCall = (req,res, secret_api) => {
	const app = new Clarifai.App({
    apiKey: secret_api
  	});
	app.models
    .predict(
      {
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
      }, req.body.input)
    .then(data => { 
		res.json(data); 
	})
    .catch(err => {
		err.status === 500 ?
			res.status(500).json('Clarifai server is down') :
			res.status(400).json('Uh Oh. Something went wrong. Ensure that the url contains a image type extension');
	})
}

const handleEntries = (req, res, db) => {
	const { id } = req.body;

	db('users')
	.where({'id':id})
	.increment('entries', 1)
	.returning('entries')
	.then(entries => res.json(entries[0].entries))
	.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleEntries,
	handleApiCall
}