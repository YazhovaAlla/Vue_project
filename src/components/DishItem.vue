<template>
    <li>
        <div class="col1">
            <div class="dish_title">{{dish.title}}</div>
        </div>
        <div class="colnew2">
            <div class="dish_category">{{dish.category}}</div>
        </div>
        <div class="col2">
            <div class="dish_amount">{{dish.amount}}</div>
        </div>
        <div class="col3">
            <button class="dish_description"
                    @click="showDescription(dish.id)"
            >&#128214;
            </button>
        </div>
        <div class="col4">
            <button class="rm"
                    @click="$emit('remove-dish', dish.id)"
            >&times;
            </button>
        </div>
        <div class="dish_description-container" :id="dish.id">
            {{dish.description}}
        </div>
    </li>
</template>
<script>
    export default {
        props: {
            dish: {
                type: Object,
                required: true
            }
        },
        methods: {
            showDescription(id) {
                let descriptionBlock = document.getElementById(id);
                descriptionBlock.style.display = descriptionBlock.style.display == "block" ? "none" : "block"
            }
        }
    }
</script>
<style scoped>
    li {
        border: 1px solid #ccc;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: .5rem 2rem;
        margin-bottom: 1rem;
    }

    .rm {
        background: red;
        color: #fff;
        border: none;
        border-radius: 50%;
        font-weight: bold;
    }

    input {
        display: inline-flex;
        margin-right: 4rem;
    }

    .dish_item {
        display: inline-flex;
    }

    .dish_title {
        text-align: start;
    }

    .dish_amount {
        display: inline-flex;
    }

    .col1 {
        width: calc(37.5% - 22.5px);
    }

    .colnew2 {
        width: calc(37.5% - 22.5px);
    }

    .col2 {
        width: calc(25% - 15px);
    }

    .col3 {
        width: 30px;
    }

    .col4 {
        width: 30px;
    }

    .dish_description {
        border: none;
        background: none;
    }

    .dish_description-container {
        width: 100%;
        display: none;
    }
</style>