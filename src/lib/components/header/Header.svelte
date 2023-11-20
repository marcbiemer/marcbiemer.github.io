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
    <Tagline txt="Design fuelled by data"/>
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
        background-color: var(--black-800);
        background: radial-gradient(circle, rgba(0, 56, 255, 0.4) 0%, rgba(0, 56, 255, 0.33) 60%, rgba(0, 56, 255, .66) 100%);
    }
</style>