<script>
    export let title;
    export let subtitle;
    export let body;
</script>

<section class="pd-lr pd-tb-lg max-width">
    <header>
        <h2 class="txt-p txt-black">{title}</h2>
        <p class="txt-p txt-black">{subtitle}</p>
    </header>
    <p class="txt-h txt-greyLight">{body}</p>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 80px;
    }
    header{
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }
    header h2, header p {
        width: 100%;   
    }
</style>