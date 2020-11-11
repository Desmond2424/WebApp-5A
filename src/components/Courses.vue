<template>
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="cours"
      sort-by="cours"
      :search="search"
      class="elevation-1 ml-16 mr-10 mt-10 pl-5"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Gestion des cours</v-toolbar-title>
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
                v-on="on">Plannifier un nouveau cours</v-btn>
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
                        label="Nom du cours"
                        v-model="editedItem.  Nom"
                        :rules="NameRules"
                        outlined
                        rounded
                        required>
                      </v-text-field>
                    </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="editedItem.Classe"
                        :rules="ClassNameRules"
                        label="Classe"
                        outlined
                        rounded
                        required>
                  </v-text-field>
                  </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="white--text"
                        v-model="editedItem.Professeur"
                        :rules="ProfesseurRules"
                        label="Professeur"
                        outlined
                        rounded
                        required>
                      </v-text-field>
                    </v-col>

                  <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="white--text"
                        v-model="editedItem.Date"
                        :counter="16"
                        :rules="DateRules"
                        label="Date (yyyy-mm-dd hh:mm)"
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
              <v-card-title class="headline">Etes-vous sûr de vouloir supprimer ce cours</v-card-title>
              
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

      Name: '',
      NameRules: [
        v => !!v || 'Veuillez renseigner le nom du cours',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters'
      ],
      
      ClassName: '',
      ClassNameRules: [
        v => !!v || 'Veuillez renseigner le nom de la classe',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters'
      ],

      Professeur: '',
      ProfesseurRules: [
        v => !!v || 'Veuillez renseigner le nom du professeur',
      ],

      Date: '',
      DateRules: [
        v => (v && v.length <= 15) || 'Veuillez renseigner la date du cours',
      ],
    headers: [
      {
        text: 'No',
        align: 'start',
        sortable: false,
        value: 'Id',
      },
      { text: 'Nom du cours', value: 'Nom' },
      { text: 'Classe', value: 'Classe' },
      { text: 'Professeur', value: 'Professeur' },
      { text: 'Date', value: 'Date' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],

    cours: [],
    editedIndex: -1,
    editedItem: {
      Id: 0,
      Nom: '',
      Classe: '',
      Professeur: '',
      Date: ''
    },
    defaultItem: {
      Id: 0,
      Nom: '',
      Classe: '',
      Professeur: '',
      Date: ''
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? ' Plannifier un cours' : 'Edit Item'
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
      this.cours = [
        {
          Id: 1,
          Nom: 'Entrainement débutant',
          Classe: 'Classe débutante',
          Professeur: 'Michael Hors',
          Date: '2020/12/20 9:30'
        },
        {
          Id: 2,
          Nom: 'Entrainement intermédiaire',
          Classe: 'Classe intermédiaire',
          Professeur: 'Elise Hors',
          Date: '2020/12/20 10:30'
        },
        {
          Id: 3,
          Nom: 'Entrainement Pro',
          Classe: 'Classe pro',
          Professeur: 'Cedric Soumaila',
          Date: '2020/12/20 15:30'
        },
        {
          Id: 4,
          Nom: 'Expédition en nature',
          Classe: 'Classe découverte',
          Professeur: 'Ben Harris',
          Date: '2020/12/20 14:30'
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.cours.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.cours.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.cours.splice(this.editedIndex, 1)
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
        Object.assign(this.cours[this.editedIndex], this.editedItem)
      } else {
        this.cours.push(this.editedItem)
      }
      this.close()
    },
  },
  }
</script>
