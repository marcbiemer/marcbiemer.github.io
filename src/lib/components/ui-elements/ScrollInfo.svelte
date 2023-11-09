<script>
    import Rounding from "./Rounding.svelte";
</script>

<div class="scroll-wrapper">
    <Rounding dir="br" />
    <div class="txt-wrapper">
        <Rounding dir="br" />
        <span class="txt txt-h">&#8595;</span>
    </div>
</div>

<style>
    .scroll-wrapper {
        display: none;
        position: absolute;
        bottom: 0;
        right: 0;
        flex-direction: column;
        align-items: flex-end;
    }
    .txt-wrapper {
        display: flex;
        flex-direction: row;
        align-items: end;
    }
    .txt {
        background-color: var(--bg-default);
        padding: var(--sm);
        border-top-left-radius: var(--lg);
        text-align: center;
        color: var(--fg-muted);
    }
    @media (min-width: 750px) {
        .scroll-wrapper {
            display: flex;
        }
    }
</style>