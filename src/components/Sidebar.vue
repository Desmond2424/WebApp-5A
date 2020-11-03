
<template>
  <sidebar-menu :menu="menu" />
</template>
 
<script>
    export default {
        computed:{
            shouldShowSidebar(){
                return this.$route.meta.sidebar!==false;
            }
        },
        data() {
            return {
                menu: [
                    {
                        header: true,
                        title: 'Centre équestre',
                        hiddenOnCollapse: true
                    },
                    {
                        href: '/home',
                        title: 'Accueil',
                        icon: 'fa fa-chart-area'
                    },
                    {
                        href: '/profil',
                        title: 'Informations utilisateurs',
                        icon: 'fa fa-chart-area'
                    },
                    {
                        href: '/monitor',
                        title: 'Gestion des utilisateurs',
                        icon: 'fa fa-chart-area'
                    },
                    {
                        href: '/monitor',
                        title: 'Gestion des chevaux',
                        icon: 'fa fa-chart-area'
                    },
                    {
                        href: '/monitor',
                        title: 'Gestion des cours',
                        icon: 'fa fa-chart-area'
                    },
                    {
                        href: '/monitor',
                        title: 'Planning de cours',
                        icon: 'fa fa-chart-area'
                    }
                ]
            }
        }
    }
</script> 