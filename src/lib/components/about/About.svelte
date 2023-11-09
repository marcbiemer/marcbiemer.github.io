<script>
    let src = '/images/profile/profile';
</script>

<section id="about">
    <figure>
        <picture>
            <source 
            type="image/webp"
            srcset="
                    {src}_485.webp 485w, 
                    {src}_717.webp 717w,
                    {src}_970.webp 970w,
                    {src}_1067.webp 1067w,
                " 
            />
            <img
                sizes="(max-width: 749px) calc(100vw - 32px), 485px"
                srcset="
                    {src}_485.jpg 485w, 
                    {src}_717.jpg 717w,
                    {src}_970.jpg 970w,
                    {src}_1067.jpg 1067w,
                "
                src='{src}_485.jpg'
                alt="Portrait of Marc from 2021, a man in his 20s wearing a black t-shirt sitting in a window frame."
            />
        </picture>
        <figcaption class="screenreader-only">Portrait shot of Marc Biemer, 2021</figcaption>
    </figure>
    <div class="info-wrapper">
        <div class="tile-lg tile glass">
            <h1 class="txt-d">About</h1>
            <p class="txt-b">I&#39;m a passionate, hands-on designer with an analytical mindset. My work is driven by creativity, curiosity, and a persistent desire to learn. I find joy in tinkering with emerging technologies &#8212; enabling teams to turn their potential into impactful experiences.</p>
        </div>
        <div class="tile-wrapper">
            <div class="tile-sm tile glass">
                <h2 class="txt-c-1">Professional design experience</h2>
                <p class="txt-t-2">7+ yrs</p>
            </div>
            <div class="tile-sm tile glass">
                <h2 class="txt-c-1">Lecturing &amp; Public Speaking</h2>
                <p class="txt-t-2">120 h</p>
            </div>
        </div>
    </div>
</section>

<style>
    #about {
        box-sizing: border-box;
        padding: var(--xxl) var(--xxs) 0;
        display: flex;
        flex-direction: column-reverse;
        gap: var(--sm);
        color: var(--fg-default);
    }
    figure {
        margin: 0;
        border-radius: var(--lg);
        overflow: hidden;
        background-color: var(--bg-subtle);
        max-height: calc(10 * var(--xxl));
        width: 100%;
    }
    img {
        vertical-align: middle;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .info-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--sm);
        width: 100%;
    }
    .tile-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--sm);
    }
    .tile {
        border-radius: var(--lg);
        padding: var(--sm);
    }
    .tile-lg {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--xxxl);
    }
    .tile-lg p, .tile-sm h2 {
        color: var(--fg-subtle);
    }
    .tile-sm {
        display: flex;
        flex-direction: column;
        gap: var(--xxs);
        width: 100%;
        justify-content: flex-start;
    }
    @media (min-width: 750px) {
        #about {
            padding: calc(var(--xxl) * 2) var(--xxs) 0;
        }
        #about, .tile-wrapper {
            flex-direction: row;
            align-items: stretch;
        }
        figure {
            max-width: calc(100vw / 3);
            max-height: 80vh;
        }
        .tile {
            padding: var(--xl);
        }
        .tile-lg {
            height: 100%;
        }
        .tile-sm {
            width: 100%;
        }
    }
</style>