<script lang="ts">
    export let dir: string = "bl";
</script>

<span class={dir + " rounder"}></span>

<style>
    .rounder {
        position: relative;
        overflow: hidden;
        z-index: 1;
        width: var(--lg);
        height: var(--lg);
        flex-shrink: 0;
    }
    .rounder::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: var(--lg);
        height: var(--lg);
        z-index: -1;
        box-shadow: 0 0 0 300px var(--bg-default);
    }
    .bl::after {
        border-bottom-left-radius: var(--lg);
    }
    .br::after {
        border-bottom-right-radius: var(--lg);
    }
    .tr::after {
        border-top-right-radius: var(--lg);
    }
    .tl::after {
        border-top-left-radius: var(--lg);
    }
</style>