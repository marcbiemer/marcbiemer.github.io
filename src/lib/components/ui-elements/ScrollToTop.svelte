<script lang="ts">
    let y: number = 0;
    let h: number = 1000;
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={h} />

<button 
    on:click="{()=>{window.scrollTo({ top: 0, behavior: 'smooth' })}}" 
    class="arrow-wrapper glass"
    style="display: {y > h ? 'flex' : 'none'};"
    >
    <span class="arrow txt-b">&#8595;</span>
</button>

<style>
    .arrow-wrapper {
        position: fixed;
        bottom: var(--sm);
        right: var(--sm);
        text-align: center;
        border-radius: var(--xxxl);
        width: var(--xl);
        height: var(--xl);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .5s ease-out;
    }
    .arrow {
        writing-mode: vertical-lr; 
        transform: rotate(90deg);
        color: var(--fg-onEmphasis);
    }
    .arrow-wrapper:hover {
        background-color: var(--bg-accent);
        color: var(--fg-onEmphasis);
        transition: .5s ease-out;
    }
</style>