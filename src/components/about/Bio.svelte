<script>
    let name = ['Marc', 'Biemer'];
    let intro = "I'm a digital designer, researcher, and XR creator with over 7 years’ experience and a master’s degree in Cognitive Systems & Interactive Media.";
    let year = 2021;
    let loc = 'Stockholm';
    let c = '03';
    let src = 'images/profile/profile'

    // Animation
    import { fly } from 'svelte/transition';
</script>

<section class="pd-lr pd-tb-lg max-width">
    <div class="header" >
        <h1 class="txt-h txt-black" in:fly="{{delay: 300, duration: 600, x: 0, y: 200, opacity: 0}}">{name[0]}<br>{name[1]} &copy;</h1>
        <p class="txt-p txt-grey" in:fly="{{delay: 150, duration: 600, x: 0, y: 200, opacity: 0}}">{intro}</p>
    </div>
    <div class='portrait' in:fly="{{delay: 450, duration: 600, x: 0, y: 200, opacity: 0}}">
        <div class="specs">
            <span class="text-p txt-black">{loc}: {year}</span>
            <span class="text-p txt-black count">{c}</span>
        </div>
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
                    fetchpriority='high'
                    sizes="(max-width: 749px) calc(100vw - 32px), 485px"
                    srcset="
                        {src}_485.jpg 485w, 
                        {src}_717.jpg 717w,
                        {src}_970.jpg 970w,
                        {src}_1067.jpg 1067w,
                    "
                    src='{src}485.jpg'
                    alt="Portrait of Marc from 2021, a man in his 20s wearing a black t-shirt sitting in a window frame."
                />
            </picture>
            <figcaption class="screenreader-only">Portrait shot of Marc Biemer, 2021</figcaption>
        </figure>
    </div>
</section>


<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 120px;
    }
    .header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }
    .header h1 {
        margin: 16px 0;
        line-height: 94%;
    }
    .portrait {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .specs {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        gap: 24px;
        flex-basis: auto;
    }
    .count {
        flex-grow: 2;
        text-align: right;
    }
    .count::before {
        content: "";
        display: inline-block;
        width: 64%;
		border-top: 1px solid #202020;
        margin: 4px 24px;
    }
    figure {
        display: block;
        box-sizing: border-box;
        margin: 0;
    }
    img {
        width: 100%;
    }
	@media (min-width: 750px) {
        .header {
            flex-direction: row-reverse;
            align-items: flex-start;
            justify-content: space-between;
        }
        .header h1 {
            width: 50%;
        }
        .header p {
            max-width: 350px;
        }
        .portrait {
            align-items: flex-start;
        }
        .specs, figure {
            width: 50%;
            max-width: 485px;
            margin-left: 50%;
        }
	}
</style>