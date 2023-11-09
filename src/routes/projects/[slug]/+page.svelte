<svelte:head>
    <title>{data ? data.info.title : 'Project not found'}</title>
</svelte:head>

<script>
	/** @type {import('./$types').PageData} */
	export let data;
    import Logo from '$lib/components/navigation/Logo.svelte';
    import TitleBlock from '$lib/components/projects/post/TitleBlock.svelte';
    import TextBlock from '$lib/components/projects/post/TextBlock.svelte';
    import ImgBlock from '$lib/components/projects/post/ImgBlock.svelte';
    import Footer from '$lib/components/navigation/Footer.svelte';
</script>

<div class="post-wrapper">
    <nav>
        <Logo link={'/#proj-'+data.id} />
    </nav>
    <article>
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
        <Footer />
    </article>
</div>

<style>
    .post-wrapper {
        display: flex;
        flex-direction: column;
        background-color: antiquewhite;
        background-color: var(--bg-default);
        padding: var(--xxs);
    }
    nav {
        display: flex;
        flex-direction: row;
        position: relative;
    }
    article {
        width: 100%;
        box-sizing: border-box;
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