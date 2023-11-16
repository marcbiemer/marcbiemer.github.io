<script lang="ts">
    export let title: string;
    export let year: string;
    export let contributions: Array<string>;
    export let i: any;

    import Tag from "$lib/components/ui-elements/Tag.svelte";

    let y:number = 0;
	let innerHeight: number;
    let innerWidth: number;

	function calculate(y:number, startY:number, endY:number, startValue:number, endValue:number) {
        const diffY = endY - startY
		const diffValue = endValue - startValue
		if(y < startY) {
			return startValue
		}else if(startY <= y && y <= endY) {
			const progress = (y - startY)/diffY
			return startValue + (diffValue * progress)
		}else if(endY < y){
			return endValue
		}
	}
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={innerHeight} bind:innerWidth={innerWidth}/>

<header>
    <div class="title-wrapper">
        <p class="txt-c-2">{year}</p>
        <h1 class="txt-d">{title}</h1>
        <div class="tag-wrapper">
            {#each contributions as c}
                <Tag label={c}/>
            {/each}
        </div>
    </div>
    <figure
        class='header-img-wrapper'
        style:opacity="{calculate(y, .1*innerHeight, .66*innerHeight, 1, .7)}"
        style:transform={ innerWidth > 750 ? "scale("+calculate(y, 0, .2*innerHeight, .8, 1)+")" : "scale("+calculate(y, 0, .2*innerHeight, .95, 1)+")" }
        >
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
</header>

<style>
    header {
        position: relative;
        width: 100%;
        height: calc(125vh);
        height: calc(var(--doc-height) * 1.25);        
        padding: var(--sm) 0;
        box-sizing: border-box;
        color: var(--fg-default);
    }
    .title-wrapper {
        display: flex;
        flex-direction: column;
        z-index: 5;
        align-items: center;
        gap: var(--sm);
        position: -webkit-sticky;
        position: sticky;
		top: calc(var(--doc-height) * .24);
        margin-bottom: calc(var(--doc-height) * .66 / 2);
    }
    .title-wrapper h1 {
        text-align: center;
    }
    figure {
        position: sticky;
        margin: 0;
        padding: 0;
        width: 100%;
        height: calc(66vh);
        height: calc(var(--doc-height) * .66);
        transform: scale(.8);
        overflow: hidden;
        border-radius: var(--lg);
        box-sizing: border-box;
        transition: .1s ease-out;
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
        justify-content: center;
    }
    @media (min-width: 750px) {
        header {
            height: calc(133vh);
            height: calc(var(--doc-height) * 1.33);        
            padding: var(--xxl) 0;
        }
    }
</style>