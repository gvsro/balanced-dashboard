require("./table_cell_base_view");

Balanced.LinkedTransactionCellView = Balanced.LinkedTextCellView.extend({
	routeName: Ember.computed.oneWay("item.route_name"),
});

Balanced.TransactionTypeCellView = Balanced.LinkedTransactionCellView.extend({
	labelText: Ember.computed.oneWay("item.type_name"),
	classNameBindings: [":type", "transactionTypeClass"],
	transactionTypeClass: Balanced.computed.downcase("item.type_name")
});

Balanced.TransactionStatusCellView = Balanced.LinkedTransactionCellView.extend({
	labelText: Ember.computed.oneWay("item.status"),
	classNameBindings: [":status", "statusClass"],
	statusClass: Balanced.computed.downcase("item.status")
});

Balanced.TransactionDescriptionCellView = Balanced.LinkedTransactionCellView.extend({
	title: Ember.computed.oneWay("item.description"),
	classNameBindings: [":description", "item.description::null-field"],
	attributeBindings: ["title"],
	labelText: function() {
		return this.get("item.description") || "None";
	}.property("item.description")
});

Balanced.TransactionCustomerCellView = Balanced.LinkedTransactionCellView.extend({
	title: Ember.computed.oneWay("item.customer_name_summary"),
	classNameBindings: [":account", "item.customer::null-field"],
	attributeBindings: ['title'],
	labelText: Ember.computed.oneWay("item.customer_name_summary")
});

Balanced.TransactionAmountCellView = Balanced.LinkedTransactionCellView.extend({
	classNameBindings: [":amount", ":num"],
	labelText: function() {
		return Balanced.Utils.formatCurrency(this.get("item.amount"));
	}.property("item.amount"),
});
