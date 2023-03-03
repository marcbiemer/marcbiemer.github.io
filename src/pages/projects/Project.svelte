<svelte:head>
    <title>Marc Biemer &#8212; {project ? project.info.title : 'Project not found'}</title>
</svelte:head>

<script>
    // Navigation Elements
    import Nav from '../../components/navigation/Nav.svelte';
    import PostNav from '../../components/post/PostNav.svelte';
    import Footer from '../../components/navigation/Footer.svelte';
    
    // Content Elements
    import TitleBlock from '../../components/post/TitleBlock.svelte';
    import ImgBlock from '../../components/post/ImgBlock.svelte';
    import TextBlock from '../../components/post/TextBlock.svelte';
    import Error from '../Error.svelte';

    // Handle url params
    import { projects } from '../../data';
    export let params = {};
    let project;
    let nextProject;
    let prevProject;

    function refreshData() {
        projects.forEach((p) => {
            if (params.title === p.info.path) {
                project = p;
                nextProject = (projects.indexOf(p) === projects.length-1 ? 0 : projects.indexOf(p)+1);
                prevProject = (projects.indexOf(p) === 0 ? projects.length-1 : projects.indexOf(p)-1);
            }
        });
    }

    // Reset scroll
    // To Do: this shouldn't scroll but rather just start on top
    import { beforeUpdate } from 'svelte';
    beforeUpdate(() => {
        window.scrollTo(0,0); 
        refreshData();
    });
</script>


{#if project}
    <Nav isMain={false}/>
    <article >
        <TitleBlock 
            title={project.info.title}
            year={project.info.year}
            contributions={project.info.con.toString().replaceAll(',', ', ')}
        />
        {#if project.content}
            {#each project.content as b}
                {#if b.block == 'txt'}
                    <TextBlock title={b.title} body={b.body}/>
                {:else if b.block == 'img'}
                    <ImgBlock type={b.type} pd={b.pd} img={b.img}/>
                {/if}
            {/each}
        {/if}
        <PostNav
            prev={`/projects/${projects[prevProject].info.path}`}
            next={`/projects/${projects[nextProject].info.path}`}
            p={project}
        />
    </article>
    <Footer />
{:else}
    <Error/>
{/if}