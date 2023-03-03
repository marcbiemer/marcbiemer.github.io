<script>
    export let title;
    export let body;
    export let extraPadding = false;
</script>

<div class={extraPadding ? 'pd-tb-lg' : ''}>
    <section class="pd-lr pd-tb-lg max-width">
        <h2 class="txt-p txt-black">{title}</h2>
        <p class="txt-p txt-grey body-copy">{@html body}</p>
    </section>
</div>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    h2, p {
        margin: 0;
        width: 100%;
    }
    @media (min-width: 750px) {
        section {
            flex-direction: row;
            gap: 0;
        }
	}
</style>