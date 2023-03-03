<script>
    // Animation
    import { fly , fade } from 'svelte/transition';

    // React to mouse location
    let m = { x: 0, y: 0 };
    let h;
    let w;
    function updateLoc(event) {
		m.x = event.clientX;
		m.y = event.clientY;
        document.getElementById('cw-1').style.top = String((44 + 4 * (m.y/h))+'%');
        document.getElementById('cw-1').style.left = String((4 + 4 * (m.x/w))+'%');
        document.getElementById('cw-2').style.top = String((12 + 4 * (m.y/h))+'%');
        document.getElementById('cw-2').style.right = String((12 + 4 * (m.x/w))+'%');
	}
</script>

<section class="intro-wrapper bg-default" on:mousemove={updateLoc} bind:clientWidth={w} bind:clientHeight={h}>
    <div class="container" in:fade>
        <div id='cw-1' class="circle-wrapper">
            <div id="c-1" class="circle"></div>
            <div id="c-2" class="circle"></div>
            <div id="c-3" class="circle"></div>
            <div id="c-4" class="circle"></div>
        </div>
        <div id='cw-2' class="circle-wrapper">
            <div id="c-1" class="circle"></div>
            <div id="c-2" class="circle"></div>
            <div id="c-3" class="circle"></div>
            <div id="c-4" class="circle"></div>
        </div>
    </div>
    <div class="blur"></div>
    <h1 class="txt-h txt-black" in:fly="{{delay: 300, duration: 600, x: 0, y: 200, opacity: 0}}">
        Turning ideas
        <span id='bar-1'></span><br><span id='bar-2'></span>
        into reality</h1>
</section>


<style>
    .intro-wrapper {
        width: 100vw;
        height: 100vh;
    }
    .intro-wrapper h1 {
        position: absolute;
        width: calc(100% - 32px);
        max-width: 1440px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #bar-1::before {
        content: "";
        display: inline-block;
        width: 24%;
		border-top: 1px solid #202020;
        margin: 8px 24px;
    }
    #bar-2::before{
        content: "";
        display: inline-block;
        width: 5%;
    }
    #bar-2::after {
        content: "";
        display: inline-block;
        width: 12%;
		border-top: 1px solid #202020;
        margin: 8px 24px;
    }
    .container {
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .circle-wrapper {
        position: absolute;
        overflow: hidden;
        width: 50vw;
        height: 50vw;
        border-radius: 1000px;
    }
    #cw-1 {
        top: 44%;
        left: 4%;
        animation: rotate 180s infinite;
        animation-delay: 2s;
    }
    #cw-2 {
        top: 12%;
        right: 12%;
        animation: rotate 120s infinite;
    }
    @keyframes gradient {
        70% {
            transform: scale(1.5) translate(100px);
        }
    }
    @keyframes rotate {
        80% {
            -webkit-transform: rotate(360deg);
        }
    }
    .container .circle {
        position: absolute;
        border-radius: 330px;
        animation: gradient 8s infinite;
    }
    #c-1 {
        width: 80%;
        height: 90%;
        left: -20%;
        top: -10%;
    }
    #c-2 {
        width: 70%;
        height: 80%;
        right: -20%;
        bottom: -15%;
    }
    #c-3 {
        width: 80%;
        height: 65%;
        right: -12%;
        top: -12%;
    }
    #c-4 {
        width: 75%;
        height: 50%;
        left: -18%;
        bottom: -10%;
    }
    #cw-1 #c-1 {
        background-color: #2980B9;
        animation-delay: .2s;
    }
    #cw-1 #c-2 {
        background-color: #f9f9f9;
        animation-delay: 1.2s;
    }
    #cw-1 #c-3 {
        background-color: #ffffff;
        animation-delay: 2.4s;
    }
    #cw-1 #c-4 {
        background-color: #6DD5FA;
        animation-delay: .8s;
    }
    #cw-2 #c-1 {
        background-color: #1FA2FF;
        animation-delay: 1.6s;
    }
    #cw-2 #c-2 {
        background-color: #A6FFCB;
        animation-delay: 2s;
    }
    #cw-2 #c-3 {
        background-color: #12D8FA;
        animation-delay: .6s;
    }
    #cw-2 #c-4 {
        background-color: #f9f9f9;
        animation-delay: .4s;
    }
    .blur {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        height: 100vh;
        width: 100vw;
        background-color: rgba(255, 255, 255, 0.48);  
        backdrop-filter: blur(64px);
    }
    @media (min-width: 750px) {
        .intro-wrapper h1 {
            width: calc(100% - 80px);
        }
        #bar-1::before {
            width: 20%;
            margin: 16px 24px;
        }
        #bar-2::after {
            width: 8%;
            margin: 16px 24px;
        }
        .circle-wrapper {
            width: 25vw;
            height: 25vw;
        }
    }
</style>