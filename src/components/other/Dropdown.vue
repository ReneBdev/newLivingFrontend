<template>
    <h3 @click="toggle" > {{this.title}} </h3>
    <div class="box">
        <p v-show="!this.collapsed" > {{this.content}} </p>
    </div>
    
       
</template>

<script>
export default {
    name: 'Dropdown',
    props: {
        title: String,
        content: String,
    },
    data() {
        return {
            collapsed: true
        }
    },
    methods: {
        toggle() {
            this.collapsed = !this.collapsed;
            console.log(this.collapsed);
        }
    }

}
</script>

<style scoped>

h3 {
    margin: 10px 20%;
    padding: 10px;
    list-style-type: none;
    border: 2px solid black;
    border-radius: 20px;
    cursor: pointer;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
}

p {
    max-width: 800px;
}


</style>

