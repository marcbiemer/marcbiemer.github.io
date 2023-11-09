<script>
    import Logo from "../navigation/Logo.svelte";
    import Socials from "../navigation/Socials.svelte";
    import MainScene from "./background/Main.svelte";
    import Intro from "./Intro.svelte";
    import Tagline from "./Tagline.svelte";
    import ScrollInfo from "../ui-elements/ScrollInfo.svelte";
    
    import { onMount } from "svelte";

    onMount(()=>{
        if('ontouchstart' in window) {
            document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`);
        } else {
            document.documentElement.style.setProperty('--doc-height', `100vh`);
        }
    });
</script>

<header>
    <Logo />
    <Socials />
    <MainScene />
    <Intro />
    <Tagline txt="Design fuelled by research & art"/>
    <ScrollInfo />
</header>

<style>
    header {
        width: calc(100vw - 2 * var(--xxs));
        height: calc(100vh - 2 * var(--xxs));
        height: calc(var(--doc-height) - 2 * var(--xxs));
        position: relative;
        box-sizing: border-box;
        margin: var(--xxs);
        border-radius: var(--lg);
        /* TO DO: UPDATE BG */
        background-color: var(--black-800);
        /* background: radial-gradient(circle, rgba(34,34,34,1) 0%, rgba(80,80,80,1) 53%, rgba(90,90,90,1) 100%); */
    }
</style>