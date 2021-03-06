var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Transaction', function() {

  describe('get transaction by id', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.transactionById('12345678', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/12345678');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

      done();
    });
  });

  describe('get transactions', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.transactions(function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

      done();
    });
  });

  describe('get transaction stats', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.transactionsStats(function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/stats');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

      done();
    });
  });

  describe('send transaction', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.send('1234', '812-111-1111', '10.00', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/send');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken, pin: '1234', destinationId: '812-111-1111', amount: '10.00'});

      done();
    });
  });

  describe('schedule transaction', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.schedule('1234', '812-111-1111', '10.00', '2015-09-09', 'abcdef', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken, pin: '1234', destinationId: '812-111-1111', amount: '10.00', scheduleDate: '2015-09-09', fundsSource: 'abcdef'});

      done();
    });
  });

  describe('get all scheduled transactions', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.scheduled(function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

      done();
    });
  });

  describe('get scheduled transaction by ID', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.scheduledById('1234', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled/1234');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

      done();
    });
  });

  describe('edit scheduled transaction by ID', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.editScheduled('abcd3434', '1234', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled/abcd3434');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken, pin: '1234'});

      done();
    });
  });  


  describe('delete scheduled transaction by ID', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.deleteScheduledById('abcd3434', '1234', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled/abcd3434');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken, pin: '1234'});

      done();
    });
  });

  describe('delete all scheduled transactions', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.deleteAllScheduled('1234', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken, pin: '1234'});

      done();
    });
  });

  describe('process a refund', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.refund('1234', '12345678', '987654321', '10.00', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/refund');
      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken, pin: '1234', transactionId: '12345678', fundsSource: '987654321', amount: '10.00'});

      done();
    });
  });

  describe('transactions by app', function() {
    it('Should make the correct request', function(done) {
      dwolla.transactionsByApp({limit: 10}, function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/');
      init.restlerMock.lastRequest.options.should.eql({client_id: init.fakeKeys.appKey, client_secret: init.fakeKeys.appSecret, limit: 10});
      
      done();
    });
  });
});