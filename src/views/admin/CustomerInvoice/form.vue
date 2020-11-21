<template>  
<back>
          <v-form>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="12">
           
                <v-autocomplete v-if="customerslist"
                      v-model="name"
                      :items="customerslist"
                      dense
                      filled
                      label="Name"
                      @change="getCustomer(name)"
                    ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" v-if="customer">
        <v-col cols="12" sm="8" md="4">
                    <v-card
            class="mx-auto"
            >
              <v-card-title>Phone: {{customer.phone}}</v-card-title>
              <v-card-title>Code: {{code}}</v-card-title>
           </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="4">
           <v-card
            class="mx-auto"
            >
              <v-card-title>Customer Name: {{customer.name}} </v-card-title>
              <v-card-title>Company: {{customer.company}}</v-card-title>
           </v-card>
        </v-col> 
        <v-col cols="12" sm="8" md="4">
           <v-card
            class="mx-auto"
            min-height="130"
            >
            <p class="display-1"> address:{{customer.address}}</p>
           </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
             <v-col
              cols="12"
              md="3"
            >
                <v-autocomplete v-if="productlist"
                      :items="productlist"
                      v-model="form.name"
                      dense
                      filled
                      label="Product Name"
                      :value="GetProduct(form.name)"
                    ></v-autocomplete>
            </v-col>
            <v-col
              cols="12"
              md="1">
              <v-text-field
                v-model="form.quantity"
                
                label="Quantity"
                type="number"
                required
                
              ></v-text-field>
            </v-col>
             <v-col
              cols="12"
              md="2"
            >
              <v-text-field v-if="product"
                v-model="form.sprice"
                
                label="Price"
                required
              ></v-text-field>
            </v-col>
             <v-col
              cols="12"
              md="1"
            >
                <v-autocomplete v-if="taxlist"
                v-model="form.tax"
                      :items="taxlist"
                      dense
                      filled
                      label="Tax"
                    ></v-autocomplete>
            </v-col>
             <v-col
              cols="12"
              md="1"
            >
                <v-autocomplete v-if="dsicountlist"
                v-model="form.discount"
                      :items="dsicountlist"
                      dense
                      filled
                      label="Discount"
                      
                    ></v-autocomplete>
            </v-col>
            
             <v-col
              cols="12"
              md="1"
            >
            <v-btn color="blue" @click="getamount">Calculate</v-btn>
            </v-col>
             <v-col
              cols="12"
              md="1"
            >
              <span id="amount">KSH: {{productamount}}</span>
            </v-col>
             <v-col
              cols="12"
              md="2"
            >
            <v-btn color="blue" @click="addproduct">Add product</v-btn>
            </v-col>
      </v-row>
      <v-row>
             <v-col
              cols="12"
              md="12"
            >
            <v-card>
                <v-data-table v-if="items"
                :headers="headers"
                :items="items"
                :items-per-page="5"
                class="elevation-1"
              >
              <template v-slot:item.action="{ item }">
              <v-icon
                small
                @click="Delete(item.ID)"
              >
                mdi-delete
              </v-icon>
            </template>
              </v-data-table>
            </v-card>
             </v-col>
      </v-row>
      <v-row>
        <v-col
              cols="12"
              md="4"
            >
              Payment Mode
            </v-col>
        <v-col
              cols="12"
              md="4"
            >
             <v-autocomplete v-if="paymentformlist"
            :items="paymentformlist"
            dense
            filled
            label="Filled"
          ></v-autocomplete>
            </v-col>

        <v-col
              cols="12"
              md="4"
            >
            <v-card
            class="mx-auto"
            v-if="summary"
            >
              <v-card-title>Discount: {{summary.discount}}</v-card-title>
              <v-card-title>Tax: {{summary.tax}}</v-card-title>
              <v-card-title>Amount: {{summary.total}}</v-card-title>
           </v-card>
            </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12"
              md="12"
              align="center" justify="center"
            >
            <v-btn color="red">Cancel the invoice</v-btn>
            <v-btn color="green">Process the invoice</v-btn>
        </v-col>
      </v-row>
    </v-container>
          </v-form>

</back>
</template>

<script>
 import axios from '@/axios'

import back from '@/layouts/back'
// import { Paymentforms } from '../../../router/modules/paymentform'
// import { Products } from '../../../router/modules/product'
//   import { required, email, max } from 'vee-validate/dist/rules'
//   import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
//  setInteractionMode('eager')

//   extend('required', {
//     ...required,
//     message: '{_field_} can not be empty',
//   })

//   extend('max', {
//     ...max,
//     message: '{_field_} may not be greater than {length} characters',
//   })

//   extend('email', {
//     ...email,
//     message: 'Email must be valid',
//   })

export default {
  name: "login",
  components: {
      // ValidationProvider,
      // ValidationObserver,
      back
    },
  data(){
    return{
        form:{
            name:'',
            quantity: 0,
            sprice: 0,
            discount: 0,
            tax: 0
        },
        name:'',
        customer:{},
        errs:{},
        option:[],
        code:"",
        cartdata:{},
        customers:[],
        products:[],
        customerslist:[],
        productlist:[],
        dsicountlist:[],
        paymentformlist:[],
        taxlist:[],
        title:'Create',
        init:'api/invoice/view',
        addcart: 'api/carts',
        cartview:'api/carts/view',
        redirect: '/invoice',
        store: 'api/invoice',
        method: 'post',
        snackbar:false,
        timeout:3000,
        product:{},
        productamount: 0,
        summary:{
          discount: 0,
          tax: 0,
          total: 0
        },
        headers:[
          { text: 'Product Name', value: 'name' },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Price', value: 'SPrice' },
          { text: 'Tax', value: 'tax'},
          { text: 'Discount', value: 'discount'},
          { text: 'Total', value: 'Total'},
          { text: 'Action', value: 'action'},
        ],
        items:[],
    }
  },
  created(){
    this.fetchData()

  },
  
  methods:{
     async addproduct(){
      try{
            let fd = new FormData();
                 fd.append("customername", this.name)
                 fd.append("name", this.form.name)
                 fd.append("code", this.code)
                 fd.append("quantity", this.form.quantity)
                 fd.append("sprice", this.form.sprice)
                 fd.append("tax", this.form.tax)
                 fd.append("discount", this.form.discount)
                const response = await axios.post(this.addcart, fd ,{'Content-Type': 'multipart/form-data'})
                if(response.status === 201){
                  
                    this.fetchCartData(this.code)
                }
        }catch(err){
            this.snackbar = true
            this.errs = err.response.data
    
        }
    },
    getamount(){
      let grossamount = parseFloat(this.form.quantity) * parseFloat(this.form.sprice)
      let taxamount = parseFloat(this.form.tax)/100 * grossamount
      let discountamount = parseFloat(this.form.discount)/100 * grossamount
      console.log(grossamount,taxamount,taxamount)
      this.productamount = grossamount - discountamount + taxamount
    },
    Back(){
      this.$router.push(this.redirect)
    },
    getCustomer(name){
      const customerinfo = this.customers.find(customer => {
        return customer.name == name
      })
      this.customer = customerinfo
    },
    GetProduct(name){
      if(name){
      let productinfo = this.products.find(product => {
        return product.name == name
      })
      this.product = productinfo
      // this.form.name =productinfo.name
      // this.form.sprice =productinfo.sprice
      }
    },
   
   async save(){
        try{
          if(this.product.quantity < this.form.quantity){
            throw ("this is quantity is way above what we have!")
          }
          // console.log(this.form)
                const response = await axios.post(this.store,this.form)
                if(response.status === 201){
                    this.$router.push(this.redirect)
                }
        }catch(err){
            this.snackbar = true
            // console.log(err)
            this.errs = err.response.data
    
        }
    },
    async fetchData(){
        try{
            // console.log(this.code)
           const {data} = await axios.get(`${this.init}`)
           const {code,customers,taxs,products,discounts,paymentforms} = data
            this.customers = customers
            this.products = products
            const customerslist = customers.map(d => {
              return d.name
            })
            const productlist = products.map(d => {
              return d.name
            })
            const taxlist = taxs.map(d => {
              return d.title
            })
            const dsicountlist = discounts.map(d => {
              return d.title
            })
            const paymentformlist = paymentforms.map(d => {
              return d.name
            })
            this.customerslist =customerslist
            this.taxlist =taxlist
            this.dsicountlist =dsicountlist
            this.productlist=productlist
            this.paymentformlist = paymentformlist
            this.code = code
            this.fetchCartData(this.code)
        }catch(err){
           console.log(err)
        }
    }, 
     async fetchCartData(code){
        try{
          //  console.log(this.code)
           let {data} = await axios.get(`${this.cartview}/${code}`)
           this.items = data
           data.forEach(item => {
              this.summary.tax =+ item.tax
              this.summary.discount =+ item.discount
              this.summary.total =+ item.Total
              return this.summary
            })
        }catch(err){
          //  console.log(err)
        }
    },  

     async Delete(id){
        try{
          //  console.log(this.code)
           await axios.delete(`${this.addcart}/${id}`)
            this.fetchCartData(this.code)
        }catch(err){
          //  console.log(err)
        }
    },  
  }
  }
</script>

<style>

</style>