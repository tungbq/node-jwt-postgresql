exports.allAccess = (req, res) => {
	res.status(200).send({ message: 'Public content!' });
};

exports.userBoard = (req, res) => {
	res.status(200).send({ message: 'User content!' });
};

exports.adminBoard = (req, res) => {
	res.status(200).send({ message: 'Admin content!' });
};

exports.moderatorBoard = (req, res) => {
	res.status(200).send({ message: 'Moderator content!' });
};
