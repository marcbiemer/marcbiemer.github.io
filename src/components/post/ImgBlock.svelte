<script>
    export let type;
    export let img;
    export let pd = '';

    let ratio = (type==='s'? .5 : 1);

</script>

<div class={type == 's' ? 'figure-wrapper pd-lr max-width' : 'figure-wrapper bg'}>
    {#each img as i}
        <figure class={type == 'c' ? 'img-center ' + pd : '' + pd}>
            <picture>
                <source 
                type="image/webp"
                srcset="
                        {i.src}360.webp 360w, 
                        {i.src}576.webp 576w, 
                        {i.src}720.webp 720w,
                        {i.src}1440.webp 1440w,
                        {i.src}2880.webp 2880w,
                    " 
                />
                <img
                    role='presentation'
                    decoding="async"
                    loading="lazy"
                    sizes="
                        (max-width: 749px) calc(100vw * {ratio}), 
                        (max-width: 1520px) calc((100vw * {ratio}) - 80px), 
                        1440px
                    "
                    srcset="
                        {i.src}360.jpg 360w, 
                        {i.src}576.jpg 576w, 
                        {i.src}720.jpg 720w,
                        {i.src}1440.jpg 1440w,
                        {i.src}2880.jpg 2880w,
                    "
                    src="{i.src}360.jpg"
                    alt={i.alt}
                />
            </picture>
            <figcaption class="screenreader-only">{i.alt}</figcaption>
        </figure>
    {/each}
</div>

<style>
    .figure-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .bg {
        background-color: #f9f9f9;
    }
    figure {
        width: 100%;
        margin: 0;
        align-items: stretch;
    }
    figure img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .img-center {
        width: calc(100% - 32px);
    }
    @media (min-width: 750px) {
        .img-center {
            width: calc(100% - 80px);
            max-width: 1440px;
        }
    }
</style>