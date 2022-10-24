<template>
    <form @submit.prevent="onSubmit">
        <div class="form-row">
            <label >Название блюда</label>
            <input type="text" v-model="title">
        </div>
        <div class="form-row">
            <label>Количество порций</label>
            <input type="number" v-model="amount">
        </div>
        <button type="submit">Create</button>
    </form>
</template>
<script>
    export default {
        data() {
            return {
                title: '',
                amount: 1
            }
        },
        methods: {
            onSubmit() {
                if (this.title.trim()) {
                    const newDish = {
                        id: Date.now(),
                        title: this.title,
                        amount: this.amount,
                        disabled: false
                    }
                    this.$emit('add-new-dish', newDish)
                }
            }
        }
    }
</script>
<style scoped>
    form {
        display: flex;
        flex-wrap: wrap;

    }

    input {
        width: 400px;
    }

    .form-row {
        display: block;
        width: 100%;
    }

    .form-row input {
        display: inline-block;
        width: 80%;
    }

    .form-row label {
        display: inline-block;
        width: 20%;
    }

</style>