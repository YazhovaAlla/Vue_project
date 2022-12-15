<template>
    <div id="app">
        <h1> What to cook application</h1>
        <WeeksList :weeks="returnMealsPlan"
                   :dishes="sortedDishes"
        >

        </WeeksList>
        <input
                v-model="searchQuery"
                placeholder="Поиск...."
        >
        <div>
            <my-button
                    class="btn"
                    style="align-self: flex-end"
                    @click="showDialog">
                Добавить блюдо
            </my-button>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <NewDish
                    @add-new-dish="addNewDish"
            />
        </my-dialog>

        <hr>
        <div v-if="dishes && dishes.length > 0">
            <DishesList class="dishes_list-container"
                        :dishes="sortedAndSearchedDishes"
                        :sortOptions="sortOptions"
                        @remove-dish="removeDish"
                        @sort-dishes-title="alphabetSort"
                        @update-selected-category="selectedCategoryHandler"
            />
            <MenuGenerator
                    @save-generated-plan="generateMenu"
                    :dishes="dishes"
            />
        </div>
        <h2 v-else style="color: red">
            Список блюд пуст
        </h2>
    </div>
</template>

<script>
    import DishesList from '@/components/DishesList'
    import NewDish from '@/components/NewDish'
    import {Dishes, Weeks} from '../cookService'
    import MyDialog from '@/components/MyDialog'
    import MenuGenerator from '@/components/MenuGenerator'
    import MyButton from "./components/MyButton"
    import WeeksList from "./components/WeeksList";

    export default {
        name: 'App',
        data() {
            return {
                selectedSort: '',
                sortOptions: [
                    {value: 'Первые блюда', name: 'Первые блюда'},
                    {value: 'Вторые блюда', name: 'Вторые блюда'},
                    {value: 'Выпечка', name: 'Выпечка'},
                    {value: 'Десерты', name: 'Десерты'},
                    {value: 'Напитки', name: 'Напитки'}
                ],
                dishes: [],
                weeks: [],
                service: new Dishes(),
                weeksService: new Weeks(),
                searchQuery: '',
                dialogVisible: false,
                sortDirection: 0,
                selectedCategoryFilter: '',
            }
        },
        methods: {
            removeDish(id) {
                this.service.deleteDish(id);
                this.service.getDishesList().then(list => this.dishes = list);
            },
            addNewDish(dish) {
                this.service.addDish(dish);
                this.service.getDishesList().then(list => this.dishes = list);
                this.dialogVisible = false;
            },
            generateMenu(mealsPlan) {
                console.log('generateMenu');
                console.log(mealsPlan);
                this.weeksService.saveWeeksList(mealsPlan).then(response => {
                    console.log(response);
                    this.weeksService.getWeeksList().then(list => {
                        this.weeks = list;
                    });
                })
            },
            showDialog() {
                this.dialogVisible = true;
            },
            selectedCategoryHandler(selectedCategory) {
                this.selectedCategoryFilter = selectedCategory;

            },
            alphabetSort(sortField) {
                if (this.selectedSort !== sortField) {
                    this.sortDirection = 0;
                } else {
                    if (this.sortDirection == 1) {
                        this.sortDirection = 0;
                    } else {
                        this.sortDirection = 1;
                    }
                }
                this.selectedSort = sortField;

            }
        },
        mounted() {
            this.service.getDishesList().then(list => this.dishes = list);
            this.weeksService.getWeeksList().then(list => {
                this.weeks = list;
            });
        },

        computed: {
            sortedDishes() {
                return [...this.dishes].sort((dish1, dish2) => {
                    if (this.sortDirection == 0) {
                        return dish1[this.selectedSort]?.localeCompare(dish2[this.selectedSort]);
                    } else {
                        return dish2[this.selectedSort]?.localeCompare(dish1[this.selectedSort]);
                    }
                })
            },
            sortedAndSearchedDishes() {
                let filteredDishes = this.sortedDishes.filter(dish => dish.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
                if (this.selectedCategoryFilter !== '') {
                    console.log(this.selectedCategoryFilter);
                    filteredDishes = filteredDishes.filter(dish => dish.category.toLowerCase().includes(this.selectedCategoryFilter.toLowerCase()));
                }
                return filteredDishes;
            },
            returnMealsPlan() {
                return [...this.weeks];
            }
        },

        components: {
            MyButton,
            DishesList,
            NewDish,
            MenuGenerator,
            MyDialog,
            WeeksList
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

    input {
        margin: 10px auto;
        width: 100%;
        max-width: 500px;
    }

    .dishes_list-container {
        margin: 10px auto;
        width: 100%;
        max-width: 700px;
    }
</style>
