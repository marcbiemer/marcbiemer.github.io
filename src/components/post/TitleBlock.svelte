<script>
    export let title;
    export let year;
    export let contributions;

    // Animation
    import { fly } from 'svelte/transition';

</script>

<header class="pd-lr pd-t-lg pd-tb-sm max-width">
    <div class="title" in:fly="{{delay: 300, duration: 600, x: 0, y: 200, opacity: 0}}">
        <h1 class="txt-h txt-black">{title}</h1>
        <p class="txt-p txt-grey">Project</p>
    </div>
    <div class="subtitle" in:fly="{{delay: 450, duration: 600, x: 0, y: 200, opacity: 0}}">
        <p class="txt-p txt-grey">Contributions</p>
        <p class="txt-h txt-black">{contributions}</p>
    </div>
    <div class="subtitle" in:fly="{{delay: 600, duration: 600, x: 0, y: 200, opacity: 0}}">
        <p class="txt-p txt-grey">Year</p>
        <p class="txt-h txt-black">{year}</p>
    </div>
</header>

<style>
    header {
        display: flex;
        flex-direction: column;
    }
    .title {
        display: flex;
        flex-direction: column-reverse;
        width: 100%;
    }
    .subtitle {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .title :first-child, .subtitle :last-child {
        padding-top: 48px;
    }
    .title::before, .subtitle::after {
        content: "";
        display: inline-block;
        width: 100%;
		border-top: 1px solid #202020;
        margin: 24px 0;
    }
</style>