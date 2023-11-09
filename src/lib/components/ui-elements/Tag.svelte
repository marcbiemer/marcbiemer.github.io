<script lang="ts">
    export let label: string;
</script>

<small class="tag txt-c-2 glass">{label}</small>

<style>
    .tag {
        display: block;
        box-sizing: border-box;
        padding: var(--xxs) var(--sm);
        text-transform: uppercase;
        color: var(--fg-default);
        border-radius: var(--xxxl);
    }
</style>