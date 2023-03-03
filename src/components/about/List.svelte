<script>
    export let type;
    export let content;
</script>

<section class="pd-lr pd-tb-lg max-width">
    <h2 class="txt-p txt-black">{type}</h2>
    <ol>
        {#each content as item}
        <li>
            <h3 class="txt-p txt-black">{item.title}
                {#if item.span != undefined}
                    ({item.span})
                {/if}
            </h3>

            {#if item.stages != undefined}
                {#each item.stages as stage}
                    {#if stage.url != undefined}
                        <a href={stage.url} target='_blank' rel="noreferrer" class='txt-p'>{stage.name},&nbsp;{stage.loc}&nbsp;{stage.year}</a>
                    {:else}
                        <p class='txt-p txt-grey'>{stage.name},&nbsp;{stage.loc}&nbsp;{stage.year}</p>
                    {/if}
                {/each}
            {:else}
                <p class='txt-p txt-grey'>{item.sub}</p>
            {/if}
        </li>
        {/each}
        {#if type == 'Work'}
            <div class="social txt-p">
                <a href="https://www.linkedin.com/in/marcbiemer" target='_blank' rel="noreferrer">LinkedIn</a>
                <!-- <a href="https://www.linkedin.com/in/marcbiemer" target='_blank' rel="noreferrer">Full CV</a> -->
            </div>
        {/if}
    </ol>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        gap: 64px;
    }
    section h2 {
        text-align: left;
    }
    section ol {
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 32px;
        width: 100%;
    }
    .social {
        display: flex;
        flex-direction: row;
        gap: 24px;
    }

    li {
        display: flex;
        flex-direction: column;
        gap: 0px;
    }

    li h3, li p {
        margin: 0;
        padding: 0;
    }

    li h3 {
        margin-bottom: 4px;
    }

    @media (min-width: 750px) {
		section {
            flex-direction: row;
            gap: 0px;
		}
        section h2, section ol {
            width: 50%;
        }
        section ol {
            max-width: 485px;
        }
	}
</style>