<svelte:head>
    <title>Marc Biemer &#8212; Not found</title>
</svelte:head>

<script>
    import Nav from '../components/navigation/Nav.svelte';
    import Footer from '../components/navigation/Footer.svelte';
</script>

<div class="nav-wrapper">
    <Nav />
</div>    
<div class="banner pd-lr pd-tb-lg max-width">
    <h1 class="screenreader-only">Error</h1>
    <p class="txt-h txt-black">Oh sh*t &#128517;</p>
    <p class="txt-p txt-grey">Looks like this page doesn't exist. <br>Let's go back and try again?</p>
</div>
<div class="footer-wrapper">
    <Footer />
</div>

<style>
    .banner {
        height: 100vh;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 16px;
    }
</style>