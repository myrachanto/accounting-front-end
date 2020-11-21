import Vue from "vue";
import VueRouter from "vue-router";
import {front} from "./modules/front"
import {auth} from "./modules/auth"
import {general} from "./modules/general"
import {customers} from "./modules/customers"
import {Suppliers} from "./modules/supplier"
import {Products} from "./modules/product"
import {Categorys} from "./modules/category"
import {Majorcats} from "./modules/majorcat"
import {CustInvoice} from "./modules/customerinvoice"
import {Taxs} from "./modules/tax"
import {Discounts} from "./modules/discounts"
import {Prices} from "./modules/prices"
import {Paymentforms} from "./modules/paymentform"

Vue.use(VueRouter);

const routes = [
  ...front,
  ...auth,
  ...general,
  ...customers,
  ...Suppliers,
  ...Products,
  ...Categorys,
  ...Majorcats,
  ...CustInvoice,
  ...Taxs,
  ...Discounts,
  ...Prices,
  ...Paymentforms

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
