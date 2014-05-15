Balanced.MarketplacesApplyRoute = Balanced.Route.extend({
	title: 'Apply for production access',

	setupController: function(controller) {
		var model = Balanced.ProductionAccessRequest.create({
		});

		model.set("user", this.get("user"));

		this._super(controller, model);
		this.controllerFor('marketplace').set('content', null);
	},

	// actions: {
	// 	signup: function(models) {
	// 		var self = this;
	// 		var marketplace;
	// 		function persistMarketplace(user) {
	// 			var apiKeySecret;
	//
	// 			Balanced.Utils.setCurrentMarketplace(null);
	// 			Balanced.Auth.unsetAPIKey();
	//
	// 			models.apiKey.save().then(function(apiKey) {
	// 				apiKeySecret = apiKey.get('secret');
	// 				//  set the api key for this request
	// 				Balanced.Auth.setAPIKey(apiKeySecret);
	// 				var settings = {
	// 					headers: {
	// 						Authorization: Balanced.Utils.encodeAuthorization(apiKeySecret)
	// 					}
	// 				};
	// 				return models.marketplace.save(settings);
	// 			}, onApiKeyError).then(function(response) {
	// 				// marketplace is local to the function, we need it there
	// 				// so that it can be accessed in another part of the promise chain
	// 				marketplace = response;
	// 				//  associate to login
	// 				return Balanced.UserMarketplace.create({
	// 					uri: user.api_keys_uri,
	// 					secret: apiKeySecret
	// 				}).save();
	// 			}, onMarketplaceError).then(function() {
	// 				Balanced.Auth.setAPIKey(apiKeySecret);
	// 				//  we need the api key to be associated with the user before we can create the bank account
	// 				return new Ember.RSVP.Promise(function(resolve, reject) {
	// 					resolve(!user.get('isLoaded') ? null : user.reload());
	// 				});
	// 			}, onUndeterminedError).then(function() {
	// 				//  create bank account
	// 				return models.bankAccount.tokenizeAndCreate(marketplace.get('links.owner_customer'));
	// 			}, onUserError).then(function(bankAccount) {
	// 				// we don't know the bank account's
	// 				// verification uri until it's created so we
	// 				// are forced to create it here.
	//
	// 				Balanced.Verification.create({
	// 					uri: bankAccount.get('bank_account_verifications_uri')
	// 				}).save().then(function() {
	// 					//  annnnd we're done
	// 					self.send('alert', {
	// 						type: 'success',
	// 						message: 'We\'ve received your information. In the ' + 'meantime, you may fund your balance with your ' + 'credit card to transact right away.'
	// 					});
	// 				}, onBankAccountVerificationError);
	//
	// 				// we don't actually care if the bank account creates successfully, so we can go on to the initial deposit
	// 				self.transitionTo('marketplace.initial_deposit', marketplace);
	// 			}, onBankingError);
	// 		}
	//
	// 		if (models.user) {
	// 			var password = models.user.password;
	// 			models.user.save().then(function(user) {
	// 				Balanced.Auth.signIn(models.user.email_address, password).then(function() {
	// 					persistMarketplace(self.get('user'));
	// 				}, onUserError);
	// 			});
	// 		} else {
	// 			persistMarketplace(self.get('user'));
	// 		}
	// 	}
	// }
});
