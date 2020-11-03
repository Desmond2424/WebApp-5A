<template>
<v-app>
 <v-container>
    <Sidebar v-if="shouldShowSidebar"></Sidebar> 
    <h1 class="pt-5 ContactTitle">Espace membre equestre</h1>
    <p class="grey--text">Connectez-vous à votre espace membre.</p>
   <v-card class="justify-center"> 
       <v-img
        class="white--text"
        height="550px"
        src="https://cdn.pixabay.com/photo/2018/01/22/14/13/animal-3099035_1280.jpg"
      >
      <!-- <strong><v-card-title class="align-end black--text justify-center ">SIGN IN</v-card-title></strong> -->
      </v-img>
        <v-form class="px-3" ref="form" v-model="valid" lazy-validation>

      <v-text-field
        prepend-icon="mdi-email"
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required>
      </v-text-field>

      <v-text-field
        prepend-icon="mdi-lock-question"
        v-model="password"
        type="password"
        :rules="passwordRules"
        label="Mot de passe"
        required>
      </v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="checkboxRules"
        label="Se souvenir de moi"
        required>
      </v-checkbox>
      <v-btn small to="/subscribe">S'inscrire</v-btn>
      <v-btn small  :disabled="!valid" color="green" class="mr-4" > Se connecter </v-btn>
      <br><br>


      </v-form>
    </v-card>
  </v-container>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      url: '',
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'Veuillez renseigner votre e-mail',
        v => /.+@.+\..+/.test(v) || 'Veuillez respectez le format du courriel (exemple@domain.fr)'
      ],
      password: '',
      passwordRules: [ ],
      checkbox: false,
      checkboxRules: [ ]
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    rememberMe () {
    }
}
}
</script>

<style scoped>
.pt-10{
    margin: -10px 0 0 0;
    padding: 100px;
    position:absolute;
    left: 0;
    right: 0;
}
</style>