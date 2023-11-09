<script>
    import IconButton from "../ui-elements/IconButton.svelte";
</script>

<div class="socials-wrapper">
    <ul>
        <li>
            <IconButton icon="li" url="https://www.linkedin.com/in/marcbiemer" ariaLabel="Marc's profile on LinkedIn"/>
        </li>
        <li>
            <IconButton icon="in" url="https://www.instagram.com/marcbiemer" ariaLabel="Marc's profile on Instagram"/>
        </li>
    </ul>
</div>

<style>
    .socials-wrapper {
        position: absolute;
        top: var(--xs);
        right: var(--xs);
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--xxs);
        align-items: center;
    }
    ul li {
        pad: 0;
        margin: 0;
    }
</style>