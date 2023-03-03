<svelte:head>
    <title>Marc Biemer &#8212; Contact</title>
</svelte:head>

<script>
    // Navigation Elements
    import Nav from '../components/navigation/Nav.svelte';
    import Footer from '../components/navigation/Footer.svelte';
    let h = window.innerHeight;

    // Animation
    import { fly } from 'svelte/transition';
</script>

<div class="nav-wrapper">
    <Nav active='contact'/>
</div>

<div class="banner pd-lr pd-tb-lg max-width" style="height: {h};">
    <h1 class="screenreader-only">Contact</h1>
    <p class="txt-h txt-black" 
        in:fly="{{delay: 150, duration: 600, x: 0, y: 200, opacity: 0}}">
        Drop by<br>& say hello &#128075;
    </p>
    <p class="txt-p txt-grey"
        in:fly="{{delay: 300, duration: 600, x: 0, y: 200, opacity: 0}}">
        Stockholm, Sweden<br>
        CET – GMT +01:00
    </p>
    <div class="social" >
        <a class="txt-p" href="https://www.linkedin.com/in/marcbiemer" target='_blank' rel="noreferrer"
            in:fly="{{delay: 450, duration: 600, x: 0, y: 200, opacity: 0}}">
            LinkedIn
        </a>
        <a class="txt-p" href="https://www.instagram.com/marcbiemer" target='_blank' rel="noreferrer"
            in:fly="{{delay: 500, duration: 600, x: 0, y: 200, opacity: 0}}">
            Instagram
        </a>
    </div>
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
        gap: 64px;
        padding-left: 16px;
        padding-right: 16px;
    }
    .social {
        display: flex;
        flex-direction: row;
        gap: 40px;
    }
    @media (min-width: 750px) {
        .banner {
            padding-left: 0px;
            padding-right: 0px;
            width: calc(100% - 80px);
        }
    }
</style>