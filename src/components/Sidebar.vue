
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
                        icon: 'fa fa-user'
                    },
                    {
                        href: '/profil',
                        title: 'Informations utilisateurs',
                        icon: 'fa fa-chart-area'
                    }
                    ,
                    {
                        href: '/monitor',
                        title: 'Gestion',
                        icon: 'fa fa-chart-area'
                    }
                ]
            }
        }
    }
</script> 