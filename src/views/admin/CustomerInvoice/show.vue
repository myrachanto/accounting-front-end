<template>  
<back>
          <v-form>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
           <v-card
            class="mx-auto"
            >
              <v-card-title>First Name: </v-card-title>
              <v-card-title>Phone: </v-card-title>
           </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="4">
           <v-card
            class="mx-auto"
            >
              <v-card-title>Last Name: </v-card-title>
              <v-card-title>Company: </v-card-title>
           </v-card>
        </v-col> 
        <v-col cols="12" sm="8" md="4">
           <v-card
            class="mx-auto"
            min-height="130"
            >
            <p> address</p>
           </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
             <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="form.name"
                
                label="Product"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="1">
              <v-text-field
                v-model="form.qty"
                
                label="Quantity"
                required
              ></v-text-field>
            </v-col>
             <v-col
              cols="12"
              md="2"
            >
              <v-text-field
                v-model="form.price"
                
                label="Price"
                required
              ></v-text-field>
            </v-col>
             <v-col
              cols="12"
              md="1"
            >
              <v-text-field
                v-model="form.tax"
                
                label="Tax"
                required
              ></v-text-field>
            </v-col>
             <v-col
              cols="12"
              md="1"
            >
              <v-text-field
                v-model="form.discount"
                
                label="Discount"
                required
              ></v-text-field>
            </v-col>
             <v-col
              cols="12"
              md="1"
            >
              <span id="amount">Amout</span>
            </v-col>
             <v-col
              cols="12"
              md="3"
            >
            <v-btn color="red">Add product</v-btn>
            </v-col>
      </v-row>
      <v-row>
             <v-col
              cols="12"
              md="12"
            >
            <v-card>
                <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="5"
                class="elevation-1"
              ></v-data-table>
            </v-card>
             </v-col>
      </v-row>
      <v-row>
        <v-col
              cols="12"
              md="4"
            >
              <h1>Payment Mode</h1>
            </v-col>
        <v-col
              cols="12"
              md="4"
            >
             <v-autocomplete
            :items="payments"
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
            >
              <v-card-title>Total amount: </v-card-title>
              <v-card-title>Discount: </v-card-title>
              <v-card-title>Tax: </v-card-title>
              <v-card-title>Amount: </v-card-title>
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

export default {
  name: "Customershow",
  components: {
      back
    },
  data(){
    return{
       form:{},
        errs:{},
        option:{},
        title:'Create',
        init:'api/invoice',
        redirect: '/invoice',
        store: 'api/invoice',
        method: 'post',
        snackbar:false,
        timeout:3000
    }
  },
  created(){
      this.fetchData()
  },
  methods:{
    Edit(id){
      this.$router.push(`${this.redirect}/${id}/edit`)
    },
    Back(){
      this.$router.push(this.redirect)
    },
  
  async fetchData(){
      try{
          const {data} = await axios.get(`${this.store}/${this.$route.params.id}`)
          this.form = data
        }catch(err){
         this.snackbar = true
        //   console.log(err)
        this.errs = err.response.data
        }
    }
  },    
  }
</script>

<style>

</style>