<template>
<v-app>
  <div class="container">
     <v-card
      class="mx-auto mt-10 "
      max-width="600"
      tile
  >
          <v-avatar
            class="profile"
            color="grey"
            size="164"
            tile
          >
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>

      <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>{{name}} {{firstname}}</v-list-item-title>
        <v-list-item-subtitle>{{Level}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

        <v-form class="px-3 mt-5" ref="form" v-model="valid" lazy-validation>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        outlined
        rounded
        required>
      </v-text-field>

      <v-text-field
        v-model="password"
        type="password"
        :rules="passwordRules"
        label="Mot de passe"
        outlined
        rounded
        required>
      </v-text-field>

      <v-text-field
        class="white--text"
        v-model="Lastname"
        :counter="10"
        :rules="LastnameRules"
        label="Nom"
        outlined
        rounded
        required>
      </v-text-field>

      <v-text-field
        class="white--text"
        v-model="Firstname"
        :counter="10"
        :rules="FirstnameRules"
        label="Prénom"
        outlined
        rounded
        required>
      </v-text-field>

       <v-text-field
        class="white--text"
        v-model="phoneNumber"
        :counter="10"
         type="number"
        :rules="phoneNumberRules"
        label="Numéro de téléphone"
        outlined
        rounded
        required>
      </v-text-field>

       <v-text-field
        class="white--text"
        v-model="LicenseNumber"
        :counter="12"
        type="number"
        :rules="LicenseNumberRules"
        label="Numéro de licence "
        outlined
        rounded
        required>
      </v-text-field>

       <v-btn small color="white" >Mettre à jour</v-btn>
      <v-btn small  :disabled="!valid" color="white" class="mr-4" >Enregistrer</v-btn>
      
      <br><br>

      </v-form>


  </v-card>
  </div>
</v-app>
</template>

<script>
  export default {
     data() {
    return {
      name: 'Name',
      firstname: 'Firstname',
      valid: true,
      Level: 'Débutant',
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