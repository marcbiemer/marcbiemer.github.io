<svelte:head>
    <title>Marc Biemer</title>
</svelte:head>

<script>
    // Navigational Elements
    import Nav from '../components/navigation/Nav.svelte';
    import Footer from '../components/navigation/Footer.svelte';

    // Text Blocks
    import Statement from '../components/Statement.svelte';
    import Services from '../components/Services.svelte';

    // Interactives
    import ProjectList from '../components/ProjectList.svelte';    
    import Intro2D from '../components/Intro2D.svelte';
    // To Do: Upgrade to 3D canvas
    // import Intro from '../components/Intro.svelte';
</script>


<div class="nav-wrapper">
    <Nav active='home' />
</div>
<Intro2D/>
<Statement 
    title="Brands" 
    subtitle="2013 &#8212; 2023" 
    body="8fit, Allianz, Alva Labs, Audi, BMW, Bosch, Electrolux, Eon, Futurice, Global Child Forum, Gofore, Jagex, MAN, Stora Enso, Tado, Vitafy"
/>
<ProjectList/>
<Services />
<Footer/>

<style>
</style>