
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
                        icon: {
                            element: 'span',
                            class: 'fas fa-home',
                            // attributes: {}
                            // text: ''
                        }
                    },
                    {
                        href: '/profil',
                        title: 'Informations utilisateurs',
                        icon: 'fa fa-user'
                    },
                    {
                        href: '/monitor',
                        title: 'Gestion des utilisateurs',
                        icon: 'fas fa-users-cog'
                    },
                    {
                        href: '/chevaux',
                        title: 'Gestion des chevaux',
                        icon: 'fas fa-horse'
                    },
                    {
                        href: '/monitor',
                        title: 'Gestion des cours',
                        icon: 'fas fa-school'
                    },
                    {
                        href: '/planning',
                        title: 'Planning de cours',
                        icon: 'far fa-calendar-alt'
                    }
                ]
            }
        }
    }
</script> 