<script lang="ts">
    export let p: any;
    export let id: number;

    import Tag from "../ui-elements/Tag.svelte";

</script>

<a href={"/projects/"+p.info.path} class="project-tile-wrapper glass" aria-label={p.info.title}>
    <figure>
        <picture>
            <source 
                type="image/webp"
                srcset="
                    {p.preview.url}360.webp 360w, 
                    {p.preview.url}576.webp 576w, 
                    {p.preview.url}720.webp 720w,
                    {p.preview.url}1440.webp 1440w,
                    {p.preview.url}2880.webp 2880w
                " 
            />
            <img
                decoding="async"
                loading="lazy"
                sizes="
                    (max-width: 749px) 100vw, 
                    (max-width: 1239px) 50vw,
                    (max-width: 1520px) 30vw, 
                    295px
                "
                srcset="
                    {p.preview.url}360.jpg 360w, 
                    {p.preview.url}576.jpg 576w, 
                    {p.preview.url}720.jpg 720w,
                    {p.preview.url}1440.jpg 1440w,
                    {p.preview.url}2880.jpg 2880w
                "
                src='{p.preview.url}360.jpg'
                alt={p.preview.imgAlt}
            />
        </picture>
        <figcaption class="txt-h">
            <span class="txt-c-1">{p.info.year}</span>
            {p.info.title}
        </figcaption>
    </figure>
    <div class="arrow-wrapper glass">
        <span class="arrow txt-b">&#8595;</span>
    </div>
    <div class="id-wrapper glass">            
        <span class="txt-c-2 id">00&#8212;{id+1}</span>
    </div>
    <div class="tag-wrapper-mask">
        <div class="tag-wrapper">
            {#each p.info.con as c}
                <Tag label={c} />
            {/each}
        </div>
    </div>
</a>

<style>
    .project-tile-wrapper {
        display: flex;
        position: relative;
        text-decoration: none; 
        transition: .5s ease-out;
        border-radius: calc(var(--md) + var(--xxs));
        color: var(--fg-default);
    }
    .project-tile-wrapper figure {
        display: flex;
        flex-direction: column;
        gap: var(--xs);
        width: 100%;
        aspect-ratio: 1/1.33;
        box-sizing: border-box;
        margin: 0;
        padding: var(--xxs) var(--xxs) var(--xs);
    }
    .project-tile-wrapper figure picture {
        flex-grow: 2;
        border-radius: var(--md);
        overflow: hidden;
    }
    .project-tile-wrapper figure img {
        vertical-align: middle;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    figcaption {
        width: 100%;
        box-sizing: border-box;
        padding: var(--xxs);
    }
    figcaption span {
        color: var(--fg-muted);
        display: block;
        margin-bottom: var(--xxxs);
    }
    .arrow-wrapper {
        position: absolute;
        top: var(--sm);
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
        transform: rotate(135deg); 
    }
    .id-wrapper {
        position: absolute;
        top: var(--sm);
        left: var(--sm);
        border-radius: var(--xxl);
        padding: var(--xxxs) var(--xs) calc(var(--xxxs) + 1px);
    }
    .tag-wrapper-mask {
        position: absolute;
        bottom: calc(58px + 2* var(--xs));
        left: var(--sm);
        width: calc(100% - 2 * var(--sm));
        box-sizing: border-box;
        overflow: hidden;
        border-bottom-left-radius: var(--md);
        border-bottom-right-radius: var(--md);
    }
    .tag-wrapper {
        position: relative;
        top: +90px;
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: var(--xxs);
        transition: .5s ease-in-out;
        padding-bottom: var(--xxs);
    }
    .project-tile-wrapper:hover {
        background-color: rgb(242, 242, 247, var(--alpha-low));
        border: 1px solid rgb(242, 242, 247, var(--alpha-med));
        transition: .5s ease-out;
    }
    .project-tile-wrapper:hover .arrow-wrapper {
        background-color: var(--bg-accent);
        color: var(--fg-onEmphasis);
        transition: .5s ease-out;
    }
    .project-tile-wrapper:hover .tag-wrapper {
        top: 0px;
        transition: .5s ease-in-out;
    }
    @media screen and (min-width: 450px) {
        .tag-wrapper-mask {
            bottom: calc(62px + 2* var(--xs));
        }
    }
</style>