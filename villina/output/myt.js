(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["module"], factory);
    } else if (typeof exports !== "undefined") {
        factory(module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod);
        global.myt = mod.exports;
    }
})(this, function (module) {
    "use strict";

    module.exports = {
        "money_unit": "元",
        "portal_title": "Portal",
        "portal_title_Subscribtion": "My Subscribtion",
        "portal_title_bluemix": "Wanda Cloud",
        "portal_title_market": "Wanda Cloud Market",
        "portal_title_invoice": "Invoice",
        "portal_user_type_standard": "Standard",
        "portal_user_type_subscribtion": "Subscribtion",
        "portal_bluemix_tip_desc": "Balance = Recharged + Coupon - Debt",
        "portal_bluemix_tip_recharge": "Recharged",
        "portal_bluemix_tip_coupon": "Coupon",
        "portal_bluemix_tip_debt": "Debt",
        "portal_invoice_tip_desc": "Receipt = Wanda Cloud Expense + Wanda Cloud Market Expense - Receipted",
        "portal_invoice_tip_wce": "Wanda Cloud Expense",
        "portal_invoice_tip_wcme": "Wanda Cloud Market Expense",
        "portal_invoice_tip_receipted": "Receipted",
        "portal_invoice_tip_timeout": "Timout[get invoice infomation]",
        "button_recharge": "Recharge",
        "button_refund": "Refund",
        "button_apply": "Apply",
        "button_retry": "Retry",
        "menu_portal": "Portal",
        "menu_amount": "Currency",
        "menu_amount_recharge": "Recharge",
        "menu_amount_offline": "Remitance",
        "menu_amount_refund": "Refund",
        "menu_bill": "Bill",
        "menu_bill_balance": "Balances",
        "menu_bill_detail": "Details",
        "menu_bill_source": "Reports",
        "menu_coupon": "Coupon",
        "menu_invoice": "Invoice"
    };
});