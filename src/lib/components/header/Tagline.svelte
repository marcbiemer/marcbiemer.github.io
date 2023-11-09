<script lang="ts">
    export let txt: string;
    import Rounding from "../ui-elements/Rounding.svelte";
</script>

<div class="tagline-wrapper">
    <Rounding />
    <div class="txt-wrapper">
        <p class="txt-c-1">{txt}</p>
        <Rounding />
    </div>
</div>

<style>
    .tagline-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        max-width: calc(100vw - var(--lg) * 2 - var(--xxs) * 2);
        box-sizing: border-box;
    }
    .txt-wrapper {
        display: flex;
        flex-direction: row;
        align-items: end;
    }
    .txt-wrapper p {
        background-color: var(--bg-default);
        padding: var(--xs) var(--xl) var(--xs) var(--xs);
        border-top-right-radius: var(--lg);
        color: var(--fg-muted);
    }
</style>