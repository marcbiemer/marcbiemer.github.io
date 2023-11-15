<script lang="ts">
    export let title: string;
    export let year: string;
    export let contributions: Array<string>;
    // export let team: Array<string>;
    export let i: any;

    import Tag from "$lib/components/ui-elements/Tag.svelte";
</script>

<header>
    <figure class='header-img-wrapper'>
        <picture>
            <source 
            type="image/webp"
            srcset="
                    {i.url}360.webp 360w, 
                    {i.url}576.webp 576w, 
                    {i.url}720.webp 720w,
                    {i.url}1440.webp 1440w,
                    {i.url}2880.webp 2880w,
                " 
            />
            <img
                role='presentation'
                decoding="async"
                loading="lazy"
                sizes="
                    (max-width: 749px) calc(100vw), 
                    (max-width: 1520px) calc(100vw - 80px), 
                    1440px
                "
                srcset="
                    {i.url}360.jpg 360w, 
                    {i.url}576.jpg 576w, 
                    {i.url}720.jpg 720w,
                    {i.url}1440.jpg 1440w,
                    {i.url}2880.jpg 2880w,
                "
                src="{i.url}360.jpg"
                alt={i.imgAlt}
            />
        </picture>
        <figcaption class="screenreader-only">{i.imgAlt}</figcaption>
    </figure>
    <div class="overlay"></div>
    <p class="txt-c-2">{year}</p>
    <h1 class="txt-d">{title}</h1>
    <div class="tag-wrapper">
        {#each contributions as c}
            <Tag label={c}/>
        {/each}
    </div>
</header>

<style>
    header {
        position: relative;
        display: flex;
        width: 100%;
        height: calc(85vh);
        height: calc(var(--doc-height) * .85);        
        flex-direction: column;
        justify-content: flex-end;
        gap: var(--xxs);
        box-sizing: border-box;
        padding: var(--sm);
        color: var(--fg-default);
    }
    header :not(figure, div) {
        z-index: 5;
    }
    figure {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        align-items: stretch;
        overflow: hidden;
        border-radius: var(--lg);
    }
    figure img {
        vertical-align: middle;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .tag-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--xxs);
        margin-top: var(--sm);
    }
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, rgba(28,28,30, var(--alpha-high)) 0%, rgba(28,28,30, var(--alpha-lowest)) 66%);
    }
    @media (min-width: 750px) {
        header {
            padding: var(--xxl);
        }
    }
</style>