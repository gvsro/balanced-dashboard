`import SummarySectionView from "./summary-section";`
`import Utils from "balanced-dashboard/lib/utils";`

BankAccountVerificationSummarySectionView = SummarySectionView.extend(
	statusText: Ember.computed("model.verificationStatus", ->
		verificationStatus = @get("model.verificationStatus.value")

		switch verificationStatus
			when "loading"
				"Loading status"
			when "pending"
				'Two deposits have been made to your bank account. Confirm verification by entering the amounts.'
			when "unverified"
				'You may only credit to this bank account. You must verify this bank account to debit from it.'
			when "unverifiable"
				"You may only credit to this bank account. This bank account is unverifiable because it's not associated with a customer."
			when "failed"
				'We could not verify your bank account. You may restart the verification process three business days after %@.'.fmt(Utils.humanReadableDateShort(this.get('model.verification.updated_at')))
	)

)

`export default BankAccountVerificationSummarySectionView;`
