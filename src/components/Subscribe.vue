<template>
<v-app>
  <v-container>
    <h1 class="pt-5 ContactTitle">Bienvenue ! Inscription au centre equestre.</h1>
    <p class="grey--text">Inscrivez-vous pour créer votre espace membre.</p>

       <v-card class="justify-center"> 
       <v-img
        class="white--text"
        height="500px"
        src="https://images.unsplash.com/photo-1508343919546-4a5792fee935?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      >
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

      <v-text-field
        class="black--text"
        prepend-icon="mdi-account"
        v-model="Lastname"
        :counter="10"
        :rules="LastnameRules"
        label="Nom"
        required>
      </v-text-field>

      <v-text-field
        class="black--text"
        prepend-icon="mdi-account"
        v-model="Firstname"
        :counter="10"
        :rules="FirstnameRules"
        label="Prénom"
        required>
      </v-text-field>

       <v-text-field
        class="black--text"
        prepend-icon="mdi-phone"
        v-model="phoneNumber"
        :counter="10"
         type="number"
        :rules="phoneNumberRules"
        label="Numéro de téléphone"
        required>
      </v-text-field>

       <v-text-field
        class="black--text"
        prepend-icon="mdi-counter"
        v-model="LicenseNumber"
        :counter="12"
        type="number"
        :rules="LicenseNumberRules"
        label="Numéro de licence "
        required>
      </v-text-field>

    <v-btn small  :disabled="!valid" color="green">Enregistrer</v-btn>
    <v-btn small  :disabled="!valid" class="mr-4" @click="reset">Clear </v-btn>

      
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
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'Veuillez renseigner votre e-mail',
        v => /.+@.+\..+/.test(v) || 'Veuillez respectez le format du courriel (exemple@domain.fr)'
      ],

      password: '',
      passwordRules: [ ],

      Lastname: '',
      LastnameRules: [
        v => !!v || 'Veuillez renseigner votre nom',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      
      Firstname: '',
      FirstnameRules: [
        v => !!v || 'Veuillez renseigner votre prénom',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],

      phoneNumber: '',
      phoneNumberRules: [
         v => !!v || 'Veuillez renseigner votre numéro de téléphone',
         v => (v && v.length <= 10) || 'Moins de 10 caractères attendu'
      ],

      LicenseNumber: '',
      LicenseNumberRules: [
        v => (v && v.length <= 12) || 'Moins de 12 caractères attendu'
      ]
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