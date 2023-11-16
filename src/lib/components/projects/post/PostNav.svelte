<script lang="ts">
    export let previews: any;
    import SmallProjectTile from "./SmallProjectTile.svelte";
</script>

<div class='post-nav-wrapper'>
    <div class='title-wrapper'>
        <h1 class="txt-d">Explore more</h1>
        <p class="txt-b">Like what you see?</p>
    </div>
    <div class='stories-wrapper'>
        {#each previews as p}
            <SmallProjectTile p={p} />
        {/each}
    </div>
</div>

<style>
    .post-nav-wrapper {
        box-sizing: border-box;
        margin: calc(var(--xxxl)*2) var(--xxs) var(--sm);
        padding: var(--xxxl) var(--sm);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: calc(var(--xxl)*2);
        background-color: var(--bg-emphasis);
        border-radius: var(--lg); 
    }
    .title-wrapper {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        gap: var(--xxs);
    }
    .title-wrapper p {
        color: var(--bg-inset);
    }
    .stories-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: var(--lg);
    }
    @media (min-width: 750px) {
        .post-nav-wrapper {
            margin-top: calc(var(--xxxl)*4);
            padding: calc(var(--lg)*4) var(--sm);
            gap: calc(var(--xxl)*2);  
        }    
        .stories-wrapper {
            flex-direction: row;
            gap: var(--sm);
        }
    }
</style>