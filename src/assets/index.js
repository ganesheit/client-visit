const getAgenda = require('./agendas.json');
const getArrangements = require('./arrangements.json');
const getParticipants = require('./participants.json');
const getUser = require ('./client_visit.json');
const getAllClientRequests = require('./all-client-requests.json');
const createClientRequest = require('./create-client-request.json');
const updateClientRequest = require('./update-client-request.json');

module.exports = {
    getAllClientRequests: getAllClientRequests,
    createClientRequest: createClientRequest,
    updateClientRequest: updateClientRequest,
    getAgenda : getAgenda,
    getArrangements: getArrangements,
    getParticipants: getParticipants,
    getUser: getUser
}