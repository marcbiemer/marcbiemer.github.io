<svelte:head>
    <title>Marc Biemer &#8212; Projects</title>
</svelte:head>

<script>
    // Navigation Elements
    import Nav from '../components/navigation/Nav.svelte';
    import { link } from 'svelte-spa-router';
    
    // Fetching Projects
    import { projects } from '../data.js';

    // Animation
    import { fade, fly } from 'svelte/transition';

    // Handling Scrolling
    import { onMount, onDestroy } from 'svelte';
    onMount(() => {
        let body = document.getElementsByTagName('body')[0];
        body.style.overscrollBehavior = 'none';
    });
    onDestroy(() => {
        let body = document.getElementsByTagName('body')[0];
        body.style.overscrollBehavior = 'auto';
    });

    let iCurrent = 0;
    let iPrev = projects.length-1;
    let iNext = 1;

    function updateProject(j) {
        let direction = j - iCurrent;
        // Handle edges
        let isLast = iCurrent === projects.length-1 ? true : false;
        let isFirst = iCurrent === 0 ? true : false;
        if (isLast && j === 0) {
            direction = 1;
        }
        else if (isFirst && j === projects.length-1) {
            direction = -1;
        }

        if (direction > 0) {
            iPrev = iCurrent;
            iCurrent = j;
            iNext = (iCurrent === (projects.length-1) ? 0 : iCurrent+1);
            if (direction > 1) {
                setTimeout(() => {
                    iPrev = (iCurrent === 0 ? projects.length-1 : iCurrent-1);
                }, 1200)
            }
        }
        else {
            if (Math.abs(direction) > 1) {
                iPrev = j;
                setTimeout(() => {
                    iNext = iCurrent;
                    iCurrent = j;
                    iPrev = (iCurrent === 0 ? projects.length-1 : iCurrent-1);
                    setTimeout(() => {
                        iNext = (iCurrent === (projects.length-1) ? 0 : iCurrent+1);
                    }, 1200)
                }, 800)

            } else {
                iNext = iCurrent;
                iCurrent = j;
                iPrev = (iCurrent === 0 ? projects.length-1 : iCurrent-1);
            }

        }
    }

    let idle = true;
    let ts = 0;

    function handleWheel(d) {
        const dir = d > 0 ? 'next' : 'prev';
        if (idle) {
            idle = false;
            requestSlide(dir);
        }
    }
    function touchMove(y) {
        let dir = ts - y;
        handleWheel(dir);
    }
    function touchStart(y) {
        ts = y;
    }
    function requestSlide(dir) {
        if (dir == 'next') {
            updateProject((iCurrent === (projects.length-1) ? 0 : iCurrent+1))
        }
        else {
            updateProject((iCurrent === 0 ? projects.length-1 : iCurrent-1))
        }
        setTimeout(() => {
            idle = true;
        }, 1500)
    }
</script>

<svelte:window 
    on:wheel={() => {handleWheel(event.deltaY)}} 
    on:touchmove={() => {touchMove(event.changedTouches[0].clientY)}}
    on:touchstart={() => {touchStart(event.changedTouches[0].clientY)}}
/>

<div class="projects-wrapper">
    <div class="nav-wrapper">
        <Nav active='projects'/>
    </div>
    <div id="hero-slider" class="pd-lr max-width" in:fly="{{delay: 150, duration: 600, x: 0, y: 200, opacity: 0}}">
        <div id="slideshow">
            <div id="slides-main" class="slides">
                {#each projects as p}
                    <a 
                        href={`/projects/${p.info.path}`} use:link 
                        class={
                            (iCurrent==projects.indexOf(p) ? "slide active bg-default" : 
                            (iPrev==projects.indexOf(p) ? "slide prev bg-default" : 
                            (iNext==projects.indexOf(p) ? "slide next bg-default" : "slide bg-default")))} 
                            data-index={projects.indexOf(p)}>
                        <div class="abs-mask">
                            <picture class="slide-image">
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
                                    role='presentation'
                                    fetchpriority={[iPrev, iCurrent, iNext].includes(projects.indexOf(p)) ? "high" : "low"}
                                    decoding={[iPrev, iCurrent, iNext].includes(projects.indexOf(p)) ? "" : "async"}
                                    loading={[iPrev, iCurrent, iNext].includes(projects.indexOf(p)) ? "" : "lazy"}
                                    style="width: 100%; height: 100%; object-fit: cover;"
                                    sizes="
                                        (max-width: 749px) calc(100vw - 32px),
                                        (max-width: 1519px) calc(100vw - 80px),
                                        1440px
                                    "
                                    srcset="
                                        {p.preview.url}360.jpg 360w,
                                        {p.preview.url}576.jpg 576w,
                                        {p.preview.url}720.jpg 720w,
                                        {p.preview.url}1440.jpg 1440w,
                                        {p.preview.url}2880.jpg 2880w
                                    "
                                    src="{p.preview.url}360.jpg"
                                    alt={p.preview.imgAlt}
                                />
                            </picture>
                        </div>
                        <div class="slide-title" data-index={projects.indexOf(p)}>
                            <div class="title-wrapper">
                                <h1 class="txt-h txt-black">{p.info.title}</h1>
                                <p class="txt-p txt-black year"><span>00&#8212;{(projects.indexOf(p)+1)}</span><span>{p.info.year}</span></p>    
                            </div>
                            <ul class="con-wrapper">
                                {#each p.info.con as con}
                                    <li class="txt-p txt-black">{con}</li>
                                {/each}
                            </ul>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    </div>
</div>
<!-- Slider Controls -->
<nav class="slider-controls" in:fade>
    {#each projects as p}
        <li><button class={iCurrent == projects.indexOf(p) ? 'active' : undefined} on:click={() => updateProject(projects.indexOf(p))}><span class='screenreader-only'>Show Project {projects.indexOf(p)}</span></button></li>
    {/each}
</nav>

<style>
    .projects-wrapper {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .nav-wrapper {
        position: relative;
    }
    a:hover {
        text-decoration: none;
    }

    /* Slide Img */
    #hero-slider {
        display: flex;
        height: 100%;
        width: 100%;
    }
    #slideshow {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    #slides-main  {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .slide {
        position: absolute;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 152px);
        width: calc(100vw - 32px);
        max-width: 1440px;
        overflow: hidden;
        will-change: transform;
    }
    .slide:hover {
        text-decoration: none;
    }
    .abs-mask {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .slide-image {
        width: 100%;
        height: 100%;
        will-change: transform;
        background-color: #f9f9f9;
    }

    /* Slide Title */
    .slide-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        gap: 16px;
        margin: 40px 0;
    }
    .title-wrapper {
        display: flex;
        flex-direction: column-reverse;
        gap: 16px;
        width: 100%;
    }
    .year {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .year span {
        width: 100%;
    }
    .year :last-child {
        text-align: right;
        width: 150%;
    }
    .year :last-child::before {
        content: "";
        display: inline-block;
        width: 50%;
		border-top: 1px solid #202020;
        margin: 4px 16px 5px;  
    }
    .con-wrapper {
        display: none;
    }
    .con-wrapper li {
        padding-bottom: 4px;
    }

    /* Control Styling */
    .slider-controls {
        position: fixed;
        bottom: 50vh;
        right: 0;
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
        transform: translate(0, +50%);
        width: 72px;
        z-index: 100;
    }
    .slider-controls button {
        display: block;
        background-color: transparent;
        height: 4px;
        padding: 4px 0;
        margin: 0;
        border: 1px solid transparent;
        border-top: 1px solid #202020;
        width: 72px;
        box-sizing: border-box;
        transition: transform 0.25s ease-out;
        transform: scaleX(.54);
        transform-origin: center center;
    }
    .slider-controls .active {
        transform: scaleX(1);
    }
    .slider-controls button:hover {
        cursor: pointer;
        transform: scaleX(1);
        transform-origin: center center;
    }
    @media (min-width: 750px) {
        .slide {
            height: calc(100vh - 107px);
            width: calc(100vw - 80px);
        }
        .year {
            width: 80%;
        }
        .year :last-child::before {
            width: 50%;
        }
        .con-wrapper {
            display: block;
            width: 33%;
        }
        .slider-controls {
            width: 120px;
        }
        .slider-controls button {
            width: 120px;
            transform: scaleX(.33);
        }
    }

    /* ANIMATION */
    /* handle previous slide */
    #slides-main .slide.prev {
        z-index: 5;
        transform: translate3d(0, -100%, 0);
        transition: 1s cubic-bezier(0.694, 0, 0.335, 1);
    }
    #slides-main .slide.prev .abs-mask {
        transform: translateY(80%);
        transition: 1s cubic-bezier(0.694, 0, 0.335, 1);
    }
    #slides-main .slide.prev .slide-title {
        opacity: 0;
        transition: .375s ease-out;
    }
    /* handle active slide */
    #slides-main .slide.active {
        z-index: 10;
        transform: translate3d(0, 0, 0);
        transition: transform 1s cubic-bezier(0.694, 0, 0.335, 1);
    }
    #slides-main .slide.active .abs-mask {
        transform: translate3d(0, 0, 0);
        transition: transform 1s cubic-bezier(0.694, 0, 0.335, 1);
    }
    #slides-main .slide.active .slide-title {
        opacity: 1;  
        transition: .1s ease-out;
    }
    /* handle next slides */
    #slides-main .slide.next {
        z-index: -1;
        transform: translate3d(0, +100%, 0);
        transition: 1s cubic-bezier(0.694, 0, 0.335, 1);
    }
    #slides-main .slide.next .abs-mask {
        transform: translateY(-80%);
        transition: 1s cubic-bezier(0.694, 0, 0.335, 1);
    }
    #slides-main .slide.next .slide-title {
        opacity: 0;
        transition: .375s ease-out;
    }
    /* handle other slides */
    #slides-main .slide:not(.prev):not(.active):not(.next) {
        z-index: -1;
        transform: translate3d(0, +100%, 0);
    }
    #slides-main .slide:not(.prev):not(.active):not(.next) .abs-mask {
        transform: translateY(-80%);
    }
</style>