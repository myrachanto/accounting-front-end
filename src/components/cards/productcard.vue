<template>
  <v-card v-if="form"
            class="mx-auto"
          >
           <div
           class="height=300px"
           style="background:#CFD8DC"
           >
            <div class="d-flex justify-center">
              <v-img v-if="form.picture"
              max-height="250"
              max-width="250"
              contain
              class="pa-7 "
              :src="`http://localhost:2000/imgs/products/${form.picture}`"
            ></v-img>
            </div> 
            </div>
            <v-card-title class="display-1">Product Name:   {{form.name}}</v-card-title>
            <v-card-title >Title:   {{form.title}}</v-card-title>
            <v-card-title >Category:   {{form.category}}</v-card-title>
            <v-card-title >Major category:   {{form.majorcat}}</v-card-title>
            <v-card-title >Description:   {{form.description}}</v-card-title>
            <v-card-title >Price:   ${{form.price}}</v-card-title>

          
          </v-card>
</template>

<script>
export default {
  props:{
    form: Object
  }

}
</script>

<style>

</style>