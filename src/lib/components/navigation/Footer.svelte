<script>
    export let dark = false;
</script>

<footer class={dark ? 'dark' : ''}>
    <small class="txt-c-1">All rights reserved</small>
    <small class="txt-c-1">&#169; 2023</small>
</footer>

<style>
    footer {
        width: 100%;
        margin: 0;
        padding: var(--xxl) var(--lg);
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        gap: var(--xxxs);
    }
    small {
        color: var(--fg-muted);
    }
    .dark {
        background-color: var(--bg-emphasis);
    }
    .dark  small {
        color: var(--fg-onEmpasis);
    }
    @media (min-width: 750px) {
        footer {
            justify-content: space-between;
        }
    }
</style>