<template>

    <WeekItem v-for="week in weeks"
              :key="week.weekNumber"
              :week="week"
              :dishes="dishes"
    >
    </WeekItem>
</template>

<script>
    import WeekItem from "./WeekItem";

    export default {
        props: ['weeks','dishes'],
        name: "WeeksList",
        components: {WeekItem}
    }
</script>

<style scoped>

</style>