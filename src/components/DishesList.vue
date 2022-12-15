<template>
    <div>
        <h2>Список блюд</h2>
        <div>
            <span class="column_names">
                <div class="col1">
                    <p class="dish_title" style="margin: 0">Название блюда</p>
                    <button
                            @click="$emit('sort-dishes-title', 'title')">
                        &darr;&uarr;</button>
                </div>
                <div class="col2">
                    <div class="dish_category">Категория</div>
                        <my-select
                        :options="sortOptions"
                        @update-selected-category="selectedCategoryHandler"
                        />
                </div>
                <div class="col3">
                    <div class="dish_amount">Кол-во порций</div>
                </div>
            </span>
        </div>
        <ul>
            <transition-group name="dish-list">
            <DishItem v-for="dish in dishes"
                      :key="dish.id"
                      :dish="dish"
                      @remove-dish="removeDish"
            />
            </transition-group>
        </ul>
    </div>
</template>

<script>
    import DishItem from '@/components/DishItem'
    import MySelect from "./mySelect";

    export default {
        data(){
            return {
                selectedSort: ''
            }
        },
        props: ['dishes', 'buttons','sortOptions'],
        components: {
            MySelect,
            DishItem,
        },
        methods: {
            removeDish(id) {
                this.$emit('remove-dish', id)
            },
            selectedCategoryHandler(selectedCategory) {
                this.$emit('update-selected-category', selectedCategory);
            },
        },

    }
</script>
<style scoped>
    .dish-list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .dish-list-enter-active,
    .dish-list-leave-active {
        transition: all 0.4s ease;
    }
    .dish-list-enter-from,
    .dish-list-leave-to {
        opacity: 0;
        transform: translateX(130px);
    }

    .dish-list-move {
        transition: transform 0.4s ease;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .column_names {
        display: flex;
        padding: .5rem 2rem;
    }

    .col1 {
        width: calc(37.5% - 22.5px);
        text-align: start;

    }

    .col1 p{
        display:inline-block;
    }

    .col2 {
        width: calc(37.5% - 22.5px);
        text-align: center;

    }

    .col3 {
        width: calc(25% - 15px);
        text-align: center;
    }

    button {
        height: 20px;
        width: 26px;
        background-color: snow;
        border:none;
    }
</style>