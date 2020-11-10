<template>
  <v-app>

  <v-container>
    <v-row >
      <v-col>
        <v-sheet>
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            :first-interval= 8
            :interval-count= 13
            color="primary"
            type="week"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      today: '2020-11-10',
      events: [
        {
          name: 'Entrainement',
          start: '2020-11-10 09:00',
          end: '2020-11-10 10:00',
        },
        {
          name: `Exam officiel`,
          start: '2020-11-10',
        },
        {
          name: 'Cours collectif',
          start: '2020-11-10 12:30',
          end: '2020-11-10 15:30',
        },
      ],
    }),
    mounted () {
      this.$refs.calendar.scrollToTime('08:00')
    },
  }
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}

.row{
  padding : 5
}
</style>
