<script>
    import { page } from '$app/stores';
    import Logo from '$lib/components/navigation/Logo.svelte';
</script>

<div class="content-wrapper">
    <Logo />
    <span class="txt-d">&#128563;</span>
    <h1 class="txt-d">{$page.status}</h1>
    <p class="txt-b"> {$page.error.message}</p>
    <div class="resolver">
        <p class="txt-b">Oh, how did we get here? That wasn't supposed to happen.</p>
        <a class="txt-b" href='/'>Let's go back and try again</a>
    </div>
</div>
  


<style>
    .content-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--xs);
        width: calc(100vw - 2 * var(--xxs));
        height: calc(100vh - 2 * var(--xxs));
        height: calc(var(--doc-height) - 2 * var(--xxs));
        margin: var(--xxs);
        box-sizing: border-box;
        background-color: var(--bg-subtle);
        color: var(--fg-default);
        border-radius: var(--lg);
    }
    .resolver {
        margin-top: var(--lg);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--md);
    }
</style>