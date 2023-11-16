<script lang="ts">
    export let id: number;
</script>

<div class="goBack-wrapper">
    <a href={"/#proj-"+id} class="txt-c-2 glass">&#8592; Back Home</a>
</div>

<style>
    .goBack-wrapper {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        padding: var(--xs);
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        border-radius: var(--lg);
        padding: var(--xxs) var(--xs);
        background-color: rgba(0, 56, 255, .8);
        transition: .5s ease-out;
    }
    a:hover { 
        background-color: var(--bg-accent);
        transition: .1s ease-out;
    }
</style>