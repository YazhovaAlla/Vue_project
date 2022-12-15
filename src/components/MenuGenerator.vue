<template>
    <div>
        <my-button class="btn"
                   @click="menuGenerator">
            Generate
        </my-button>

    </div>
</template>
<script>
    import MyButton from "./MyButton";

    export default {
        components: {MyButton},
        data() {
            return {
                daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                meals: ['breakfast', 'lunch', 'dinner']
            }
        },
        props: ['dishes'],
        methods: {
            menuGenerator() {
                console.log('menuGenerator');
                let mealsPlan = [];
                this.daysOfWeek.forEach(dayOfWeek => {
                    let dayInfo = {
                        name: dayOfWeek,
                        meals: []
                    };
                    this.meals.forEach(meal => {
                        let mealInfo = {
                            name: meal,
                            dishes: []
                        };
                        let filteredMeals = this.dishes.filter(dish => dish.selectedMeals?.includes(meal));
                        let random = Math.floor(Math.random() * filteredMeals.length);
                        mealInfo.dishes.push(filteredMeals[random].id);
                        dayInfo.meals.push(mealInfo);
                    });
                    mealsPlan.push(dayInfo);
                });
                let weeksPlan = [
                    {
                        "weekNumber": 1,
                        "weekDays": mealsPlan
                    }
                ];
                this.$emit('save-generated-plan', weeksPlan);
            }

        }
    }
</script>
<style scoped>

</style>