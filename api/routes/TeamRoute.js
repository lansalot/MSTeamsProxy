'use strict';

module.exports = function(app) {
  const teamController = require('../controllers/TeamController');

    app.route('/Teams/:EndPoint')
    .post(teamController.PostToTeams);

    app.route('/TeamsPassThru/:EndPoint')
    .post(teamController.PostToTeamsPassThru);

};
