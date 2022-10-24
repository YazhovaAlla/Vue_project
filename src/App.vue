<template>
    <div id="app">
        <h1> What to cook application</h1>
        <NewDish
                @add-new-dish="addNewDish"
        />
        <hr>
        <DishesList
                class="dishes_list-container"
                v-bind:dishes="dishes"
                @remove-dish="removeDish"
        />
        <MenuGenerator
                @generate="generateMenu"
        />
    </div>

</template>

<script>
    import DishesList from '@/components/DishesList'
    import NewDish from '@/components/NewDish'
    import Dishes from "../cookService"
    import MenuGenerator from '@/components/MenuGenerator';

    export default {
        name: 'App',
        data() {
            let result = {
                dishes: [],
                service: new Dishes(),
            };
            return result
        },
        methods: {
            removeDish(id) {
                this.service.deleteDish(id);
                this.service.getDishesList().then(list => this.dishes = list);
            },
            addNewDish(dish) {
                this.service.addDish(dish);
                this.service.getDishesList().then(list => this.dishes = list);
            },
            generateMenu(amount){
                alert(amount)
            }
        },

        mounted() {
            this.service.getDishesList().then(list => this.dishes = list);
        },
        components: {
            DishesList, NewDish, MenuGenerator
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .dishes_list-container {
        margin: 10px auto;
        width: 100%;
        max-width: 500px;
    }
</style>
