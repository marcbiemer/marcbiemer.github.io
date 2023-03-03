<script>
	import { link } from 'svelte-spa-router';
    export let active = '';
    export let isMain = true;
</script>


<nav aria-label="Main" class="pd-lr pd-tb-sm max-width">
    {#if isMain}
        <ul>
            <div>
                <li><a class="txt-p txt-grey" href="/" use:link aria-current="{active === 'home' ? 'page' : undefined}">Marc Biemer</a></li>
            </div>
            <div class="nav-item-wrapper">
                <li><a class="txt-p txt-grey" href="/info" use:link aria-current="{active === 'info' ? 'page' : undefined}">Info</a></li>
                <li><a class="txt-p txt-grey" href="/projects" use:link aria-current="{active === 'projects' ? 'page' : undefined}">Projects</a></li>
                <li><a class="txt-p txt-grey" href="/contact" use:link aria-current="{active === 'contact' ? 'page' : undefined}">Contact</a></li>
            </div>
        </ul>
    {:else}
        <a href='/projects' class="project-nav txt-p txt-grey" use:link>
            <span>&#11105;</span>
            <span>Go back to all projects</span>
        </a>
    {/if}    
</nav>


<style>
    nav ul {
		display: flex;
		flex-direction: row;
        align-items: baseline;
    }
    nav ul div {
        display: flex;
        flex-direction: row;
        gap: 24px;
        width: 100%;
    }
    nav a:hover, nav [aria-current] {
		color: #202020;
	}     
    nav [aria-current]:hover {
        text-decoration: none;
        cursor: default;
    }
    .nav-item-wrapper {
        flex-direction: column;
        align-items: flex-end;
    }
    .project-nav {
        display: flex;
        flex-direction: row;
    }
    .project-nav span {
        width: 100%;
    }
	@media (min-width: 750px) {
        nav ul div {
            gap: 40px;
        }
        .nav-item-wrapper {
            flex-direction: row;
            align-items: flex-start;
        }
	}
</style>