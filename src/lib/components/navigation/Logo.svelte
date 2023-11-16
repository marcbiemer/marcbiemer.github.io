<script>
    export let link = '/';
    export let free = false;
    import Rounding from "../ui-elements/Rounding.svelte";
</script>

<div class="logo-wrapper">
    <div class="logo">
        <a href={link} class="txt-h" style={free ? "" : "background-color: var(--bg-default);"}>
            <svg width="36" height="24" viewBox="0 0 200 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M144 16C121.909 16 104 33.9086 104 56V136H184V56C184 33.9086 166.091 16 144 16ZM16 96L16 136H96V96C96 73.9086 78.0914 56 56 56C33.9086 56 16 73.9086 16 96Z" fill="var(--bg-emphasis)"/>
            </svg>
        </a>
        {#if !free}
            <Rounding dir="tl" />
        {/if}
    </div>
    {#if !free}
        <Rounding dir="tl" />
    {/if}
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
        border-bottom-right-radius: var(--lg);
        padding: var(--xxs) var(--sm) var(--xxs) var(--xxs);
        text-decoration: none;
        color: var(--fg-default);
        z-index: 8;
    }
</style>