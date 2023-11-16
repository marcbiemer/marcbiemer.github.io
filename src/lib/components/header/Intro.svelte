<script>
    import Tag from "../ui-elements/Tag.svelte";
</script>

<div class="intro-wrapper">
    <h1 class="txt-d">Marc Biemer</h1>
    <p class="txt-b">I&#39;m a digital designer, researcher, and XR creator with over 7 years&#39; experience and a master&#39;s degree in Cognitive Systems &amp; Interactive Media.</p>    
    <div class="tag-wrapper">
        <Tag label="UX/UI" />
        <Tag label="XR" />
        <Tag label="Research" />
    </div>
</div>

<style>
    .intro-wrapper {
        position: absolute;
        top: 50%;
        left: 0;
        padding: 0 var(--xxs);
        display: flex;
        flex-direction: column;
        gap: var(--sm);
        color: var(--fg-default);
        transform: translateY(-50%);
    }
    p {
        color: var(--fg-subtle);
    }
    .tag-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--xxs);
        margin-top: var(--xxs);
    }
    @media (min-width: 750px) {
        .intro-wrapper {
            padding: 0 var(--xxxl);
            max-width: 450px;
        }
    }
</style>