module.exports = function(app) {
    var api = '/api';
    var data = '/../../data/';
    var jsonfileservice = require('./utils/jsonfileservice')();

    app.get(api + '/customer/:id', getCustomer);
    app.get(api + '/customers', getCustomers);
    app.get(api + '/beerstyle/:id', getBeerStyle);
    app.get(api + '/beerstyles', getBeerStyles);

    function getCustomer(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'customers.json');
        var customer = json.filter(function(c) {
            return c.id === parseInt(req.params.id);
        });
        res.send(customer[0]);
    }

    function getCustomers(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'customers.json');
        res.send(json);
    }

    function getBeerStyles(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'beerstyles.json');
        res.send(json.data);
    }

    function getBeerStyle(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'beerstyles.json');
        var style = json.data.filter(function(c) {
            return c.id === parseInt(req.params.id);
        });
        res.send(style[0]);
    }
};
