<template>
    <select
            :value="value"
            @change="changeOption">
        <option value="">Все категории</option>
        <option v-for="option in options"
                :key="option.value"
                :value="option.value">
            {{option.name}}
        </option>
    </select>
</template>

<script>
    export default {
        name: "my-select",
        props: {
            value: {
                type: String
            },
            options: {
                type: Array,
                default: () => [],
            }
        },
        methods: {
            changeOption(event) {
                this.$emit('update:value', event.target.value);
                this.$emit('update-selected-category', event.target.value);
            }
        },
    }
</script>

<style scoped>

</style>