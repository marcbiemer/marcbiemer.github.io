<svelte:head>
    <title>Marc Biemer &#8212; Design Portfolio</title>
</svelte:head>

<script lang="ts">
  import Header from '$lib/components/header/Header.svelte';
  import Footer from '$lib/components/navigation/Footer.svelte';
  import Brands from '$lib/components/about/Brands.svelte';
  import Projects from '$lib/components/projects/Projects.svelte';
  import About from '$lib/components/about/About.svelte';
</script>

<main>
  <Header />
  <Projects />
  <Brands />
  <About />
  <Footer />
</main>