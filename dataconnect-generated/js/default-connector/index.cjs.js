const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'smart_cafeteria_system',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

