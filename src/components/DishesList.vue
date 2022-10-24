<template>
    <div>
        <div>
            <span class="column_names">
                <div class="dish_title">Название блюда</div>
                <div class="dish_amount">Кол-во порций</div>
            </span>
        </div>
        <ul>
            <DishItem v-for="dish in dishes"
                      v-bind:key="dish.id"
                      v-bind:dish="dish"
                      v-on:remove-dish="removeDish"
            />
        </ul>
    </div>
</template>

<script>
    import DishItem from '@/components/DishItem'

    export default {
        props: ['dishes', 'buttons'],
        components: {
            DishItem
        },
        methods: {
            removeDish(id) {
                this.$emit('remove-dish', id)
            }
        }
    }
</script>
<style scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .column_names {
        display: flex;
        padding: .5rem 2rem;
    }

    .dish_title {
        width: calc(60% - 36px);
        text-align: start;

    }

    .dish_amount {
        width: calc(40% - 24px);
        text-align: center;
    }
</style>