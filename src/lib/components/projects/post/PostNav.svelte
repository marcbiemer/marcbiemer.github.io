<script lang="ts">
    export let next: any;
    export let prev: any;
</script>

<div class='post-nav-wrapper'>
    <div class='title-wrapper'>
        <h1 class="txt-d">Explore more</h1>
        <p class="txt-b">Like what you see?</p>
    </div>
    <div class='stories-wrapper'>
        <a class='story' href={prev.path} aria-label={'Previous project: '+prev.title} style={'background-image: url("' + prev.preview.url + '360.jpg");'}>
            <div class="info-wrapper">
                <small class="txt-c-1">Previous</small>
                <h3 class="txt-t-2">{prev.title}</h3>
            </div>
            <div class="arrow-wrapper arrow-prev glass">
                <span class="arrow txt-b">&#8595;</span>
            </div>
        </a>
        <a class='story' href={next.path} aria-label={'Previous project: '+next.title} style={'background-image: url("' + next.preview.url + '360.jpg");'}>
            <div class='info-wrapper'>
                <small class="txt-c-1">Next</small>
                <h3 class="txt-t-2">{next.title}</h3>
            </div>
            <div class="arrow-wrapper arrow-next glass">
                <span class="arrow txt-b">&#8595;</span>
            </div>
        </a>
    </div>
</div>

<style>
    .post-nav-wrapper {
        box-sizing: border-box;
        margin-top: calc(var(--xxxl)*2);
        padding: var(--xxxl) var(--sm);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: calc(var(--xxl)*2);
        background-color: var(--bg-emphasis);
        min-height: calc(100vh);
        min-height: calc(var(--doc-height) - 96px);     
    }
    .title-wrapper {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        gap: var(--xxs);
    }
    .title-wrapper p {
        color: var(--bg-inset);
    }
    .stories-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: var(--lg);
    }
    .story {
        display: flex;
        width: 100%;
        aspect-ratio: 1/.4;
        position: relative;
        text-decoration: none;
        border-radius: calc(var(--lg) - var(--xs));
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: cover;
        transition: .5s ease-out;
    }
    .story:hover {
        transition: .5s ease-out;
        box-shadow:
            1px 2px 4px rgba(0, 0, 0, 0.135),
            4px 8px 10px rgba(0, 0, 0, 0.141),
            10px 22px 24px rgba(0, 0, 0, 0.147),
            40px 80px 80px rgba(0, 0, 0, 0.16)
        ;
    }
    .info-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--xxs);
        padding: var(--sm);
        background-color: rgb(28, 28, 30, .75);
        backdrop-filter: blur(var(--xxxs));
        -webkit-backdrop-filter: blur(var(--xxxs));
        transition: .5s ease-out;
    }
    .story:hover .info-wrapper {
        transition: .5s ease-out;
        background-color: rgb(28, 28, 30, .5);
    }
    .arrow-wrapper {
        position: absolute;
        top: var(--sm);
        text-align: center;
        border-radius: var(--xxxl);
        width: var(--xl);
        height: var(--xl);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .5s ease-out;
    }
    .arrow-prev {
        left: var(--sm);
    }
    .arrow-next {
        right: var(--sm);
    }
    .arrow-next .arrow {
        writing-mode: vertical-lr; 
        transform: rotate(135deg); 
    }
    .arrow-prev .arrow {
        writing-mode: vertical-lr; 
        transform: rotate(45deg); 
    }
    .story:hover .arrow-wrapper {
        background-color: var(--bg-accent);
        color: var(--fg-onEmphasis);
        transition: .5s ease-out;
    }
    @media (min-width: 750px) {
        .post-nav-wrapper {
            margin-top: calc(var(--xxxl)*4);
            padding: var(--lg);
            gap: calc(var(--xxl)*2);  
        }    
        .stories-wrapper {
            flex-direction: row;
            gap: var(--lg);
        }
        .story {
            aspect-ratio: 1/.5;
        }
    }
</style>