odoo.define('bi_pos_reports.AddPaymentPopupWidget', function(require) {
	'use strict';

	const Popup = require('point_of_sale.ConfirmPopup');
	const Registries = require('point_of_sale.Registries');
	const PosComponent = require('point_of_sale.PosComponent');
	const rpc = require('web.rpc');

	class AddPaymentPopupWidget extends Popup {

		constructor() {
	        super(...arguments);
	    }

		addPayment () {
			var self = this;			
			let partner = this.props.partner;		
			var payment_type = $('#payment_type').val();
			var entered_amount = $("#entered_amount").val();

			if(!entered_amount || parseFloat(entered_amount) == 0){
				alert('Please enter valid amount !!!!');
			}else{			
				self.rpc({
					model: 'pos.order',
					method: 'create_customer_payment',
					args: [0, partner.id, payment_type, entered_amount],
				}).then(function(output) {
					alert('Customer Payment Created !!!!');
					self.trigger('close-popup');
				});	
			}		
		}
	};
	
	AddPaymentPopupWidget.template = 'AddPaymentPopupWidget';
	Registries.Component.add(AddPaymentPopupWidget);
	return AddPaymentPopupWidget;

});