<template>
    <form @submit.prevent="onSubmit">
        <h2>Добавление блюда</h2>
        <div class="form-row">
            <div class="col1">
                <div class="dish_title">Название блюда</div>
            </div>
            <div class="col2">
                <input type="text" v-model="title">
            </div>
        </div>
        <div class="form-row">
            <div class="col1">
                <div class="dish_category">Категория блюда</div>
            </div>
            <div class="col2">
                <select v-model="category">
                    <option>Все</option>
                    <option>Первые блюда</option>
                    <option>Вторые блюда</option>
                    <option>Выпечка</option>
                    <option>Десерты</option>
                    <option>Напитки</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="col1">
                <div class="dish_description">Описание блюда</div>
            </div>
            <div class="col2">
                <textarea v-model="description"> </textarea>
            </div>
        </div>
        <div class="form-row">
            <div class="col1">
                <div class="dish_amount">Количество порций</div>
            </div>
            <div class="col2">
                <input type="number" v-model="amount">
            </div>
        </div>
        <div class="form-row_checkbox">
            <div class="col1">
                <div class="dish_amount">Подойдёт для:</div>
            </div>
            <div class="col2">
                <label>завтрака</label>
                <input type="checkbox" value="breakfast" v-model="selectedMeals">
                <label>обеда</label>
                <input type="checkbox" value="lunch" v-model="selectedMeals">
                <label>ужина</label>
                <input type="checkbox" value="dinner" v-model="selectedMeals">
            </div>
        </div>
        <my-button class="btn" type="submit">Create</my-button>
    </form>
</template>
<script>
    import MyButton from "./MyButton";

    export default {
        components: {MyButton},
        data() {
            return {
                title: '',
                category: '',
                description: '',
                amount: 1,
                selectedMeals: []
            }
        },
        methods: {
            onSubmit() {
                if (this.title.trim()) {
                    const newDish = {
                        id: Date.now(),
                        title: this.title,
                        category: this.category,
                        description: this.description,
                        amount: this.amount,
                        disabled: false,
                        selectedMeals: this.selectedMeals
                    };
                    this.$emit('add-new-dish', newDish)
                }
            }
        }
    }
</script>
<style scoped>
    form {
        max-width: 500px;
        width: 100%;
        margin: 10px auto;

    }

    .col1 {
        width: 30%;
        text-align: start;
    }

    .col2 {
        width: 70%;
        text-align: start;
    }

    .dish_title {
        text-align: start;
    }

    .form-row {
        width: 100%;
        max-width: 500px;
        border: 1px solid #ccc;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 2rem;
        margin-bottom: 1rem;
    }

    .form-row_checkbox {
        max-width: 500px;
        width: 100%;
        border: 1px solid #ccc;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 2rem;
        margin-bottom: 1rem;
    }

    .form-row_checkbox input {
        width: 13px;
        margin: 10px;
    }

    .form-row input {
        display: inline-block;
        width: 300px;

    }
</style>