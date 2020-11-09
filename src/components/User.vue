<template>
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="utilisateurs"
      sort-by="calories"
      :search="search"
      class="elevation-1 ml-16 mr-10 mt-10 pl-5"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Gestion des utilisateurs</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
      ></v-text-field>
      <v-divider class="mx-4" inset vertical></v-divider>

          <v-dialog v-model="dialog" max-width="1500px"
          >

            <template v-slot:activator="{ on, attrs }">
             <v-btn 
                small color="white" 
                class="mb-2"
                v-bind="attrs"
                v-on="on">Créer un nouvel utilisateur</v-btn>
            </template>

            <v-card>

              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              
        <v-form class="px-3 mt-5" ref="form" v-model="valid" lazy-validation>

      <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="white--text"
                        label="Nom"
                        v-model="editedItem.Nom"
                        :counter="15"
                        :rules="LastnameRules"
                        outlined
                        rounded
                        required>
                      </v-text-field>
                    </v-col>

                  <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="white--text"
                         v-model="editedItem.Prénom"
                        :counter="15"
                        :rules="FirstnameRules"
                        label="Prénom"
                        outlined
                        rounded
                        required>
                      </v-text-field>
                    </v-col>

                  <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="white--text"
                        v-model="editedItem.Rôle"
                        :rules="RôleRules"
                        label="Rôle"
                        outlined
                        rounded
                        required>
                      </v-text-field>
                    </v-col>

                  <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="white--text"
                        v-model="editedItem.Mail"
                        :rules="emailRules"
                        label="E-mail"
                        outlined
                        rounded
                        required>
                      </v-text-field>
                    </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="password"
                        type="password"
                        :rules="passwordRules"
                        label="Mot de passe"
                        outlined
                        rounded
                        required>
                  </v-text-field>
                  </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="white--text"
                        v-model="editedItem.Téléphone"
                        :counter="10"
                        type="number"
                        :rules="phoneNumberRules"
                        label="Téléphone"
                        outlined
                        rounded
                        required>
                      </v-text-field>
                    </v-col>

                  <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="white--text"
                        v-model="editedItem.Licence"
                        :counter="12"
                        type="number"
                        :rules="LicenseNumberRules"
                        label="Licence"
                        outlined
                        rounded
                        required>
                      </v-text-field>
                    </v-col>
                  </v-row>
        <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small  @click="reset">Effacer </v-btn>
                <v-btn small  @click="close">Annuler</v-btn>
               <v-btn small  :disabled="!valid" color="green" @click="save">Enregistrer</v-btn>
              </v-card-actions>
      
      <br><br>

      </v-form>

            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="headline">Etes-vous sûr de vouloir supprimer cet utilisateur</v-card-title>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn small color="white" @click="initialize"> Reset </v-btn>
      </template>

    </v-data-table>
  </v-app>
</template>
 

<script>
  export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    valid:true,
    search: '',

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

      Rôle: '',
      RôleRules: [
        v => !!v || 'Veuillez renseigner votre rôle',
      ],

      phoneNumber: '',
      phoneNumberRules: [
         v => !!v || 'Veuillez renseigner votre numéro de téléphone',
         v => (v && v.length <= 10) || 'Moins de 10 caractères attendu'
      ],

      LicenseNumber: '',
      LicenseNumberRules: [
        v => (v && v.length <= 12) || 'Moins de 12 caractères attendu'
      ],
    headers: [
      {
        text: 'No',
        align: 'start',
        sortable: false,
        value: 'Id',
      },
      { text: 'Nom', value: 'Nom' },
      { text: 'Prénom', value: 'Prénom' },
      { text: 'Rôle', value: 'Rôle' },
      { text: 'E-mail', value: 'Mail' },
      { text: 'Téléphone', value: 'Téléphone' },
      { text: 'Licence', value: 'Licence' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],

    utilisateurs: [],
    editedIndex: -1,
    editedItem: {
      Id: 0,
      Nom: '',
      Prénom: '',
      Rôle: '',
      mail: '',
      Téléphone: 0.0,
      Licence: 0.0,
    },
    defaultItem: {
      Id: 0,
      Nom: '',
      Prénom: '',
      Rôle: '',
      mail: '',
      Téléphone: 0.0,
      Licence: 0.0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nouvel utilisateur' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
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
    initialize () {
      this.utilisateurs = [
        {
          Id: 1,
          Nom: 'User1',
          Prénom: 'User',
          Rôle: 'Admin',
          Mail: "User1@eesiea.fr",
          Téléphone: 0,
          Licence: 0,
        },
        {
          Id: 2,
          Nom: 'User3',
          Prénom: 'User',
          Rôle: 'Admin',
          Mail: "User2@eesiea.fr",
          Téléphone: 0,
          Licence: 0,
        },
        {
          Id: 3,
          Nom: 'User2',
          Prénom: 'USer',
          Rôle: 'Admin',
          Mail: "User3@eesiea.fr",
          Téléphone: 0,
          Licence: 0,
        },
        {
          Id: 1,
          Nom: 'Conteh',
          Prénom: 'Desmond',
          Rôle: 'Admin',
          Mail: "Conteh@et.esiea.fr",
          Téléphone: 0,
          Licence: 0,
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.utilisateurs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.utilisateurs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.utilisateurs.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.utilisateurs[this.editedIndex], this.editedItem)
      } else {
        this.utilisateurs.push(this.editedItem)
      }
      this.close()
    },
  },
  }
</script>
