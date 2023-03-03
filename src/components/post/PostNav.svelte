<script>
    import { link } from 'svelte-spa-router';

    export let next;
    export let prev;
    export let p;
</script>

<nav class='pd-tb-sm'>
    <picture class="bg-image">
        <source 
        type="image/webp"
        srcset="
                {p.preview.url}360.webp 360w, 
                {p.preview.url}576.webp 576w, 
                {p.preview.url}720.webp 720w,
                {p.preview.url}1440.webp 1050w,
                {p.preview.url}2880.webp 2880w
            " 
        />
        <img
            role='presentation'
            decoding="async"
            loading="lazy"
            sizes="
                (max-width: 749px) 100vw,
                (max-width: 1519px) 100vw,
                1440px
            "
            srcset="
                {p.preview.url}360.jpg 360w,
                {p.preview.url}576.jpg 576w,
                {p.preview.url}720.jpg 720w,
                {p.preview.url}1440.jpg 1440w,
                {p.preview.url}2880.jpg 2880w
            "
            src="{p.preview.url}1440.jpg"
            alt={p.preview.imgAlt}
        />
    </picture>
    <ul class="pd-lr pd-tb-lg max-width">
        <li>
            <a class={p.preview.dark ? "txt-p txt-white" : 'txt-p txt-grey'} href={prev} use:link>&#11104;&nbsp;Prev Project</a>
        </li>
        <li>
            <p class={p.preview.dark ? "txt-h txt-white" : 'txt-h txt-black'}>{p.info.title}</p>
        </li>
        <li>
            <a class={p.preview.dark ? "txt-p txt-white" : 'txt-p txt-grey'} href={next} use:link>Next Project&nbsp;&#11106;</a>
        </li>
    </ul>
</nav>


<style>
    nav {
        position: relative;
    }
    .bg-image {
        position: absolute;
        inset: 0;
        z-index: -1;
    }
    .bg-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(75%);
    }
    nav ul {
        display: flex;
        flex-direction: row;
        gap: 40px;
        justify-content: space-between;
        align-items: center;
    }
    nav ul li p {
        text-align: center;
        font-size: min(5vw, 5rem);
    }
    a.txt-white:hover {
		color: #ffffff;
	}  
    a.txt-grey:hover {
		color: #202020;
	}   
</style>