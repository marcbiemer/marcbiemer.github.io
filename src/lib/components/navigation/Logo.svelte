<script>
    export let link = '/';
    import Rounding from "../ui-elements/Rounding.svelte";
</script>

<div class="logo-wrapper">
    <div class="logo">
        <a href={link} class="txt-h">M/\RC</a>
        <Rounding dir="tl" />
    </div>
    <Rounding dir="tl"/>
</div>

<style>
    .logo-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
    }
    .logo {
        display: flex;
        flex-direction: row;
    }
    .logo a {
        background-color: var(--bg-default);
        border-bottom-right-radius: var(--lg);
        padding: var(--xxs) var(--xl) var(--xs) var(--sm);
        text-decoration: none;
        color: var(--fg-default);
        z-index: 8;
    }
</style>