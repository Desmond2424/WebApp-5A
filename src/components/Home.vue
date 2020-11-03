<template>
  <v-app>
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
       <h1 class="display-2 font-weight-thin mb-4"> <strong>Accueil</strong> </h1>
        <p class="pt-3 pb-10 TextContact">
        Bienvenue sur le Site Web du Centre Equestre ! <br>
        Depuis 30 ans nous vous accompagnons dans l'exercice de votre passion.
      </p >
      </v-col>
    </v-row>


  <v-row justify="space-around" class="pt-12">

    <v-btn icon @click="$router.push('profil')">
    <v-avatar size="200" >
      <img src="../assets/infosUsers.png">
    </v-avatar>
    </v-btn>

        <v-btn icon @click="$router.push('planning')">
    <v-avatar size="200" >
      <img src="../assets/planning.png">
    </v-avatar>
    </v-btn>

        <v-btn icon @click="$router.push('chevaux')">
    <v-avatar size="200" >
      <img src="../assets/chevaux.png">
    </v-avatar>

    </v-btn>


  </v-row>

  <v-row justify="space-around" class="pt-12">
          <v-card-title size="200">
            <h2>Infos utilisateurs</h2>
          </v-card-title>          
          <v-card-title size="200">
            <h2>Planning de cours</h2>
          </v-card-title>          
          <v-card-title size="200">
            <h2>Chevaux</h2>
          </v-card-title>




  </v-row>
  </v-app>
</template>

<script>
export default {
}
</script>

<style scoped>
.separator {
  font: bold
}
</style>