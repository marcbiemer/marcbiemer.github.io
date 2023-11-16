<script lang="ts">
    export let id: number;
</script>

<button>
    <a href={id ? "/#proj-"+id : "/"} class="txt-c-2">&#8592; Home</a>
</button>

<style>
    button {
        position: absolute;
        top: var(--xxxs);
        left: var(--xxxs);
        z-index: 5;
        padding: var(--sm);
        box-sizing: border-box;
        border: 1px solid transparent;
        background-color: var(--bg-default);
    }
    button a {
        text-decoration: none;
    }
</style>