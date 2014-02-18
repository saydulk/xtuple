/*jshint trailing:true, white:true, indent:2, strict:true, curly:true,
  immed:true, eqeqeq:true, forin:true, latedef:true,
  newcap:true, noarg:true, undef:true */
/*global XT:true, describe:true, it:true, require:true, __dirname:true, after:true */

var assert = require('chai').assert,
  datasource = require('../../node-datasource/lib/ext/datasource').dataSource,
  path = require('path');

(function () {
  "use strict";
  describe('The database', function () {
    this.timeout(100 * 60 * 1000);

    var loginData = require(path.join(__dirname, "../lib/login_data.js")).data,
      datasource = require('../../../xtuple/node-datasource/lib/ext/datasource').dataSource,
      config = require(path.join(__dirname, "../../node-datasource/config.js")),
      creds = config.databaseServer,
      databaseName = loginData.org;

    it('must not have any overriden tables or views', function (done) {
      var sql = "select pub.relname " +
        "from pg_class pub " +
        "inner join pg_namespace pubns on pub.relnamespace = pubns.oid and pubns.nspname = 'public' " +
        "inner join pg_class xt on pub.relname = xt.relname " +
        "inner join pg_namespace xtns on xt.relnamespace = xtns.oid and xtns.nspname = 'xt' " +
        "where pub.relkind NOT IN ('i') " +
        "and pub.relkind NOT IN ('i')";

      creds.database = databaseName;
      datasource.query(sql, creds, function (err, res) {
        assert.isNull(err);
        assert.equal(0, res.rowCount, JSON.stringify(res.rows));
        done();
      });
    });
  });
}());


