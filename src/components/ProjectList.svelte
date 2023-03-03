<script>
    // Import data and navigation
    import { projects } from '../data.js';
    import { link } from 'svelte-spa-router';
    let selectedProjects = projects.slice(0,4);

    // Handle hover effects
    function updateAngle(cx, cy, i) {
        const rec = document.getElementById('proj-'+String(i)).getBoundingClientRect();
        const x = cx - rec.left
        const y = cy - rec.top
        const xc = rec.width / 2;
        const yc = rec.height / 2;
        const dx = x - xc;
        const dy = y - yc;
        const el = document.getElementById('proj-'+String(i)).style;
        el.setProperty('--rx', `${ dy/-10 }deg`);
        el.setProperty('--ry', `${ dx/5 }deg`);
    }

    function resetAngle(e) {
        const el = document.getElementById(e).style;
        el.setProperty('--ty', '0');
        el.setProperty('--rx', '0');
        el.setProperty('--ry', '0');
    }
</script>

<section class="pd-lr pd-tb-lg max-width">
    
    <header>
        <h2 class="txt-p txt-black">Projects</h2>
        <span class="txt-p txt-black">|</span>
        <a class="txt-p" href="/projects" use:link aria-label='Go to all projects'>See more</a>
    </header>

    <ul>
        {#each selectedProjects as p}
            <li 
                id='proj-{selectedProjects.indexOf(p)}'
                on:mousemove={() => {updateAngle(event.clientX, event.clientY, selectedProjects.indexOf(p))}}
                on:mouseleave={() => {resetAngle(event.srcElement.id)}}
                >
                <a href={`/projects/${p.info.path}`} use:link aria-label={p.info.title}>
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
                                fetchpriority='low'
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
                        <figcaption class="txt-p txt-black">
                            00&#8212;{selectedProjects.indexOf(p)+1}&nbsp;&nbsp;<span class="txt-p txt-greyLight">|&nbsp;&nbsp;{p.info.title}</span>
                        </figcaption>
                    </figure>
                </a>
            </li>
        {/each}
    </ul>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 80px;
    }
    section header {
        display: flex;
        flex-direction: row;
        gap: 16px;
        align-items: baseline;
    }
    ul {
        display: flex;
        flex-direction: column;
        gap: 40px;
        transform-style: preserve-3d;
	    transform: perspective(800px);
    }
    ul li {
        width: 100%;
        transition: box-shadow 0.5s ease, transform 0.2s ease;
        will-change: transform;
        transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
    }    
    ul li a:hover {
        text-decoration: none;
    }
    ul li a:hover figcaption span {
        color: #202020;
    }
    ul li figure {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 375px;
		display: flex;
		flex-direction: row;
        gap: 8px;
    }
    ul li figcaption {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        text-align: right;
    }
    figure picture {
        width: 100%;
    }
	figure img {
        width: 100%;
		height: 100%;
        object-fit: cover;
	}
    @media (min-width: 750px) {
        ul {
            flex-direction: row;
            flex-wrap: wrap;
        } 
        ul li {
            width: 47%;
            flex-grow: 1;
        }
    }
    @media (min-width: 1240px) {
        ul {
            flex-wrap: nowrap;
        }
        ul li {
            width: 100%;
            flex-grow: 1;
        }
    }
</style>