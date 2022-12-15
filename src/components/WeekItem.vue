<template>
    <div class="container">
        <div class="week_number">НЕДЕЛЯ {{week.weekNumber}}</div>
        <div class="ul" v-for="weekDay in week.weekDays"
            :key="weekDay.name"
        >{{weekDay.name}}
            <div v-for="meal in weekDay.meals"
                 :key="meal.name"
            >
                <div><hr style="border-color: dodgerblue"><strong>{{meal.name}}</strong></div>
                <ol>
                    <li v-for="dish in meal.dishes"
                        :key="dish"
                    >{{returnDishById(dish).title}}</li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WeekItem",
        props: ['week','dishes'],
        methods: {
            returnDishById(dishId){
                return this.dishes.find(dish => dish.id === dishId);
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: space-around;
    }
    .week_number{
        writing-mode: vertical-rl;
        text-orientation: upright;
        color: #003050;
        font-weight: bold;
    }

    .ul{
        background: linear-gradient(45deg, #003050, #00587b);
        color: white;
        text-align: initial;
        border-radius: 8px;
        padding: 10px;
        width: 136px;
    }
</style>