
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
                        href: '/',
                        title: 'Connexion',
                        icon: 'fa fa-user'
                    },
                    {
                        href: '/subscribe',
                        title: 'Inscription',
                        icon: 'fa fa-chart-area',
                        child: [
                            {
                                href: '/charts/sublink',
                                title: 'Sub Link'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script> 