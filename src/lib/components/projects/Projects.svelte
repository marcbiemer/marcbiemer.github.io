<script>
    import ProjectTile from "./ProjectTile.svelte";
    import { projects } from '../../../data.js';
</script>

<section id="projects">
    <div class="title-wrapper">
        <h1 class="txt-d">What I do</h1>
        <span class="txt-t-1">&#8629;</span>
    </div>
    <div class="content-wrapper">
        <p class="txt-b">Explore a curated collection of real-world design projects &amp; get a glimpse into the creative process behind my work.</p>
        <ul class="project-list">
            {#each projects as p }
                <li id='proj-{projects.indexOf(p)}'>
                    <ProjectTile p={p} id={projects.indexOf(p)}/>
                </li>
            {/each}
        </ul>
    </div>
</section>

<style>
    #projects {
        display: flex;
        flex-direction: column;
        gap: var(--lg);
        width: 100vw;
        box-sizing: border-box;
        padding: var(--xxl) var(--xxs);
        margin-top: var(--xxl);
        color: var(--fg-default);
    }
    .title-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--xxxs);
        align-items: center;
    }
    .title-wrapper span {
        writing-mode: vertical-lr; 
        transform: rotate(180deg); 
        text-align: right;
    }
    .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--xxl);
    }
    .content-wrapper p {
        color: var(--fg-subtle);
    }
    .project-list {
        display: grid;
        gap: var(--sm);
        width: 100%;
        box-sizing: border-box;
        grid-template-columns: 1fr;
        transform-style: preserve-3d;
	    transform: perspective(800px);
    }
    ul li {
        border-radius: var(--lg);
        will-change: transform;
        transition: box-shadow .2s ease-out .2s, transform 0.5s ease-out 0s;
        transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
    }
    ul li:hover {
        /* To Do: Fix shadow style */
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        transition: .2s ease-out;
    }
    @media screen and (min-width: 640px) {
        .project-list {
            grid-template-columns: 1fr 1fr;
        }
    }
    @media screen and (min-width: 760px) {
        #projects {
            padding: calc(var(--xxl) * 2) var(--xxs);
            margin-top: calc(var(--xxl) * 2);
            gap: var(--xxxl);
        }
        .title-wrapper {
            gap: var(--lg);
        }
        .content-wrapper {
            flex-direction: row;
        }
        .content-wrapper p {
            width: calc(100vw / 4);
            max-width: 400px;
            margin-left: var(--xxs);
            position: -webkit-sticky;
            position: sticky;
            top: var(--xxxl);
            align-self: flex-start;
        }
    }
    @media screen and (min-width: 1240px) {
        .project-list {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>