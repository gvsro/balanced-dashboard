`import Ember from "ember";`
`import BankAccount from "balanced-addon-models/models/bank-account";`
`import StatusCalculator from "./status-calculator";`

BkBankAccount = BankAccount.extend(
	lastFour: Ember.computed("account_number", ->
		num = @get("account_number")
		if Ember.typeOf(num) == "string"
			return num.substr(num.length - 4, 4)
		else
			null
	)

	canCreateVerificationStatus: Ember.computed("canCredit", "canDebit", ->
		status = StatusCalculator.create()
		if @get("canDebit") || !@get("hasCustomer") || !@get("canCredit")
			status.error("negative", "Verification cannot be created")
		else
			@fetchVerifications().then (verifications) ->
				if verifications.isAny("verification_status", "pending")
					status.error("negative", "Verification cannot be created")
				else
					status.success("positive", "Verification can be created")
		status
	)

	verificationStatus: Ember.computed("canCredit", "canDebit", ->
		status = StatusCalculator.create()

		if @get("canDebit")
			status.success("verified", "Verified")
		else if @get("hasCustomer")
			@fetchVerifications().then (verifications) ->
				if verifications.isAny("verification_status", "pending")
					status.warning("pending", "Verification pending")
				else if verifications.isEvery("verification_status", "failed")
					status.warning("failed", "Verification failed")
				else
					status.warning("unknown", "Unknown state")
		else
			status.error("unverifiable", "Unverifiable")

		status
	)

	canDebit: Ember.computed.reads("can_debit")
	canCredit: Ember.computed.reads("can_credit")

	hasCustomer: Ember.computed.notEmpty("customer_uri")
	hasVerification: Ember.computed.notEmpty("verification")
)

`export default BkBankAccount;`
