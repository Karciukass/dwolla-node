module.exports = function(exports) {
    // ************************
    // Transaction Methods
    // ************************
    var vars = exports.vars;

    /**
     * Retrieves a transaction by ID for the user for the authorized access token.
     * Transactions are returned in descending order by transaction date.
     * https://www.dwolla.com/developers/endpoints/transactions/details
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.transactionById = function(id, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!id) { throw new Error('Missing arg id'); }

      var params = { oauth_token: vars._token };
      exports._request('/transactions/' + id, params, fn);
    };

    /**
     * Retrieves transactions for the user for the authorized access token.
     * Transactions are returned in descending order by transaction date.
     * https://www.dwolla.com/developers/endpoints/transactions/list
     *
     * Optional params:
     *
     *   - sinceDate
     *   - types
     *   - limit
     *   - skip
     *
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.transactions = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      params = params || {};
      params.oauth_token = vars._token;
      exports._request('/transactions/', params, fn);
    };

    /**
     * Retrieves all transactions which have been facilitated by the
     * requesting application.
     *
     * https://www.dwolla.com/developers/endpoints/transactions/list
     *
     * Optional params:
     *
     *   - sinceDate
     *   - types
     *   - limit
     *   - skip
     *
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.transactionsByApp = function(params, fn) {
      if (!vars._client_id) { throw new Error('Missing arg client_id'); }
      if (!vars._client_secret) { throw new Error('Missing arg client_secret'); }

      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }

      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      params = params || {};
      params.client_id = vars._client_id;
      params.client_secret = vars._client_secret;
      exports._request('/transactions/', params, fn);
    };

    /**
     * Retrieves transactions stats for the user for the authorized access token.
     * https://www.dwolla.com/developers/endpoints/transactions/stats
     *
     * Optional params:
     *
     *   - types
     *   - startDate
     *   - endDate
     *
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.transactionsStats = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      params = params || {};
      params.oauth_token = vars._token;
      exports._request('/transactions/stats', params, fn);
    };


    /**
     * Send funds to a destination user for the user associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/transactions/send
     *
     * Optional params:
     *
     *   - destinationType
     *   - facilitatorAmount
     *   - assumeCosts
     *   - notes
     *
     * @param {Number}   pin
     * @param {String}   destinationId
     * @param {String}   amount
     * @param {Function} fn
     */
    exports.send = function(pin, destinationId, amount, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!destinationId) { throw new Error('Missing arg destinationId'); }
      if (!amount) { throw new Error('Missing arg amount'); }

      params = params || {};
      params.oauth_token = vars._token;
      params.pin = pin;
      params.destinationId = destinationId;
      params.amount = amount;

      exports._post('/transactions/send', params, fn);
    };

    /**
     * Use this method to (completely or partially) refund a payment that the user received. Only Commercial, Non-Profit, 
     * and Government type accounts may issue refunds. Refunds do not incur a transfer fee.
     * https://developers.dwolla.com/dev/docs/transactions/refund
     *
     * Optional params:
     *   - notes
     *
     * @param {Number}   pin
     * @param {String}   transactionId
     * @param {String}   fundsSource
     * @param {String}   amount
     * @param {Function} fn
     */
    exports.refund = function(pin, transactionId, fundsSource, amount, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!transactionId) { throw new Error('Missing arg transactionId'); }
      if (!fundsSource) { throw new Error('Missing arg fundsSource'); }
      if (!amount) { throw new Error('Missing arg amount'); }


      params = params || {};
      params.oauth_token = vars._token;
      params.pin = pin;
      params.transactionId = transactionId;
      params.fundsSource = fundsSource;
      params.amount = amount;
      exports._post('/transactions/refund', params, fn);
    };

   /**
     * Send funds to a destination user for the user associated with the authorized access token,
     * on a date in the future.
     * https://www.dwolla.com/developers/endpoints/transactions/send
     *
     * Optional params:
     *
     *   - destinationType
     *   - recurrence
     *   - assumeCosts
     *   - notes
     *
     * @param {Number}   pin
     * @param {String}   destinationId
     * @param {String}   amount
     * @param {Function} fn
     */
    exports.schedule = function(pin, destinationId, amount, scheduleDate, fundsSource, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }

      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!destinationId) { throw new Error('Missing arg destinationId'); }
      if (!amount) { throw new Error('Missing arg amount'); }
      if (!scheduleDate) { throw new Error('Missing arg scheduleDate'); }
      if (!fundsSource) { throw new Error('Missing arg fundsSource'); }

      params = params || {};
      params.oauth_token = vars._token;
      params.pin = pin;
      params.destinationId = destinationId;
      params.amount = amount;
      params.scheduleDate = scheduleDate;
      params.fundsSource = fundsSource;

      exports._post('/transactions/scheduled', params, fn);
    };


    /**
     * Retrieves scheduled transactions for the user for the authorized access token.
     *
     * Optional params:
     *
     *   - status
     *   - limit
     *   - skip
     *
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.scheduled = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      params = params || {};
      params.oauth_token = vars._token;
      exports._request('/transactions/scheduled', params, fn);
    };

   /**
     * Retrieves a scheduledtransaction by ID for the user for the authorized access token.
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.scheduledById = function(id, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      var params = { oauth_token: vars._token };
      exports._request('/transactions/scheduled/' + id, params, fn);
    };

   /**
     * Edit a scheduled transaction by its ID. All parameters optional
     * other than the PIN.
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.editScheduled = function(id, pin, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!id) { throw new Error('Missing arg id'); }

      params = params || {};
      params.oauth_token = vars._token;
      params.pin = pin
      exports._put('/transactions/scheduled/' + id, params, fn);
    };


    /**
     * Deletes a scheduled transaction by its ID
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.deleteScheduledById = function(id, pin, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!id) { throw new Error('Missing arg id'); }

      var params = { oauth_token: vars._token, pin: pin };
      exports._delete('/transactions/scheduled/' + id, params, fn);
    };


    /**
     * Deletes a scheduled transaction by its ID
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.deleteAllScheduled = function(pin, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }

      var params = { oauth_token: vars._token, pin: pin };
      exports._delete('/transactions/scheduled', params, fn);
    };    

};