<script>
    let brands = ['8fit', 'Allianz', 'Alva Labs', 'Audi', 'BMW', 'Bosch', 'Electrolux', 'Eon', 'Futurice', 'Global Child Forum', 'Gofore', 'Jagex', 'MAN', 'Stora Enso', 'Tado', 'Vitafy']
    import Tag from "../ui-elements/Tag.svelte";
</script>

<section id="brands">
    <div class="brands-wrapper">
        <h1 class="txt-d">Brands</h1>
        <p class="txt-b">I've supported and worked for in my career</p>
        <ul>
            {#each brands as b}
                <li><Tag label={b}/></li>
            {/each}
        </ul>
    </div>
</section>

<style>
    #brands {
        box-sizing: border-box;
        padding: var(--xxl) var(--xxs);
    }
    .brands-wrapper {
        background-color: var(--bg-accent);
        color: var(--fg-onEmphasis);
        box-sizing: border-box;
        border-radius: var(--lg);
        padding: var(--lg) var(--sm);
        display: flex;
        flex-direction: column;
        gap: var(--xxs);
    }
    ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--xxs);
        margin-top: var(--xxl);
    }
    @media screen and (min-width: 760px) {
        #brands {
            padding: calc(var(--xxl) * 2) var(--xxs);
        }
        .brands-wrapper {
            padding: var(--xxxl) var(--xl);
        }
    }
</style>