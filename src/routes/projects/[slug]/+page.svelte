<svelte:head>
    <title>{data ? data.info.title : 'Project not found'}</title>
</svelte:head>

<script>
	/** @type {import('./$types').PageData} */
	export let data;
    import GoBack from '$lib/components/ui-elements/GoBack.svelte';
    import TitleBlock from '$lib/components/projects/post/TitleBlock.svelte';
    import TextBlock from '$lib/components/projects/post/TextBlock.svelte';
    import ImgBlock from '$lib/components/projects/post/ImgBlock.svelte';
    import PostNav from '$lib/components/projects/post/PostNav.svelte';
    import Footer from '$lib/components/navigation/Footer.svelte';
    import ScrollToTop from '$lib/components/ui-elements/ScrollToTop.svelte';

    import { onMount } from "svelte";

    onMount(()=>{
        if('ontouchstart' in window) {
            document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`);
        } else {
            document.documentElement.style.setProperty('--doc-height', `100vh`);
        }
    });
</script>

<div >
    <GoBack />
    <article class="post-wrapper">
        <main>
            <TitleBlock title={data.info.title} year={data.info.year} contributions={data.info.con} i={data.preview}/>
            {#if data.content}
            {#each data.content as b}
                {#if b.block == 'txt'}
                    <TextBlock title={b.title} body={b.body}/>
                {:else if b.block == 'img'}
                    <ImgBlock type={b.type} pd={b.pd} img={b.img}/>
                {/if}
            {/each}
        {/if}
        </main>
    </article>
    <PostNav previews={data.previews} />
    <Footer />
    <ScrollToTop />
</div>

<style>
    .post-wrapper {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        background-color: var(--bg-default);
        padding: var(--xxs);
    }
    main {
        display: flex;
        flex-direction: column;
        gap: var(--sm);
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
    }
</style>