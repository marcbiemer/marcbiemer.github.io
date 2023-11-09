<script lang="ts">
    export let title: any;
    export let body: any;
</script>

<div>
    <section>
        <h2 class="txt-h">{title}</h2>
        <p class="txt-b">{@html body}</p>
    </section>
</div>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: var(--sm);
        padding: var(--lg) var(--sm);
        border-radius: var(--lg);
        background-color: var(--bg-subtle);
        color: var(--fg-default);
    }
    h2, p {
        margin: 0;
        width: 100%;
    }
    @media (min-width: 750px) {
        section {
            flex-direction: row;
            padding: var(--xxl);
        }
	}
</style>