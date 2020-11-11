<template>
  <v-app id="inspire">

    <v-data-table
      :headers="headers"
      :items="chevaux"
      sort-by="calories"
      :search="search"
      class="elevation-1 ml-16 mr-10 mt-10 pl-5"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Gestion des chevaux</v-toolbar-title>
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
                v-on="on">Création de chevaux</v-btn>
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
                         v-model="editedItem.Type"
                        :counter="15"
                        :rules="TypeRules"
                        type="string"
                        label="Type"
                        outlined
                        rounded
                        required>
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="white--text"
                        v-model="editedItem.Poids"
                        :counter="10"
                        type="number"
                        :rules="weightRules"
                        label="Poids"
                        outlined
                        rounded
                        required>
                      </v-text-field>
                    </v-col>

                  <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="white--text"
                        v-model="editedItem.Taille"
                        :counter="12"
                        type="number"
                        :rules="SizeRules"
                        label="Taille"
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
              <v-card-title class="headline">Etes-vous sûr de vouloir supprimer ce cheval</v-card-title>
              
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

      Lastname: '',
      LastnameRules: [
        v => !!v || 'Veuillez renseigner votre nom',
        v => (v && v.length <= 10) || 'Moins de 10 caractères attendu'
      ],
      
      Type: '',
      TypeRules: [
        v => !!v || 'Veuillez renseigner le type de cheval',
        v => (v && v.length <= 10) || 'Moins de 10 caractères attendu'
      ],

      Weight: '',
      weightRules: [
        v => !!v || 'Veuillez le poids du cheval',
      ],

      Size: '',
      SizeRules: [
         v => !!v || 'Veuillez renseigner la taille du cheval',
         v => (v && v.length <= 5) || 'Moins de 5 caractères attendu'
      ],
    headers: [
      {
        text: 'No',
        align: 'start',
        sortable: false,
        value: 'Id',
      },
      { text: 'Nom', value: 'Nom' },
      { text: 'Type', value: 'Type' },
      { text: 'Poids', value: 'Poids' },
      { text: 'Taille', value: 'Taille' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],

    chevaux: [],
    editedIndex: -1,
    editedItem: {
      Id: 0,
      Nom: '',
      Type: '',
      Poids: 0,
      Taille: 0,
    },
    defaultItem: {
       Id: 0,
      Nom: '',
      Type: '',
      Poids: 0,
      Taille: 0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nouveau chev' : 'Edit Item'
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
      this.chevaux = [
        {
        Id: 1,
        Nom: 'Fabien',
        Type: 'Poney',
        Poids: 169,
        Taille: 1.8,
        },
        {
        Id: 2,
        Nom: 'Didier',
        Type: 'Horse',
        Poids: 169,
        Taille: 1.8,
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.chevaux.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.chevaux.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.chevaux.splice(this.editedIndex, 1)
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
        Object.assign(this.chevaux[this.editedIndex], this.editedItem)
      } else {
        this.chevaux.push(this.editedItem)
      }
      this.close()
    },
  },
  }
</script>
