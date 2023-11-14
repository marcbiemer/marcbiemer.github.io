<script lang="ts">
    export let title: any;
    export let body: any;

    let w: any;
</script>

<svelte:window bind:innerWidth={w} />

<div>
    <section>
        <h2 class="txt-c-2">{title}</h2>
        <p class={w > 750 ? "txt-t-3" : "txt-b"}>{@html body}</p>
    </section>
</div>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: var(--sm);
        padding: var(--lg) var(--sm);
        color: var(--fg-default);
        align-items: flex-start;
        position: relative;
    }
    h2, p {
        margin: 0;
        padding-top: var(--sm);
    }
    h2 {
        position: relative;
    }
    h2::before {
        content: '';
        width: calc(100vw - var(--sm) * 2 - var(--xxs) * 2);
        border-bottom: solid 1px var(--gray-900);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
    h2::after {
        content: '';
        width: 100%;
        border-bottom: solid 1px var(--white-900);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
    }
    @media (min-width: 750px) {
        section {
            flex-direction: row;
            padding: var(--xxxl) var(--xxl);
            justify-content: space-between;
        }
        p {
            max-width: 75%;
        }
        h2::before {
            width: calc(100vw - var(--xxl) * 2 - var(--xxs) * 2);
        }
	}
</style>