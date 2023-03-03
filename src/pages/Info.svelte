<svelte:head>
    <title>Marc Biemer &#8212; Info</title>
</svelte:head>

<script>
    // Navigation Elements
    import Nav from '../components/navigation/Nav.svelte';
    import Footer from '../components/navigation/Footer.svelte';

    // Content Elements
    import Bio from '../components/about/Bio.svelte';
    import List from '../components/about/List.svelte';

    let workExp = [
        {title: 'Senior Product Designer', 
        span: 'Aug 22 – Present', 
        sub: 'Alva Labs, Stockholm'}, 
        {title: 'Senior Digital Product Designer', 
        span: 'Feb 21 – Jul 22', 
        sub: 'Futurice, Stockholm'},
        {title: 'Designer', 
        span: 'May 18 – Jun 19', 
        sub: 'Futurice, Munich'},
        {title: 'UX Designer', 
        span: 'Jan 18 – Apr 18', 
        sub: 'Gofore, Munich'},
        {title: 'Junior UX Designer', 
        span: 'Oct 16 – Dec 17', 
        sub: 'Vitafy, Munich'},
        {title: 'Corporate Student Market Research', 
        span: 'Oct 13 – Sep 16', 
        sub: 'Bosch, Stuttgart'},
    ];
    let lecExp = [
        {title: 'Business Development', 
        span:'2022 – Present', 
        sub:'DHBW, Karlsruhe'},
        {title: 'Lean Business Model Creation', 
        span:'2022 – Present', 
        sub:'DHBW, Mosbach'},
        {title: 'Hack Design', 
        span:'2021 – Present', 
        sub:'Hyper Island, Stockholm'},
        {title: 'UX Design for Extended-Reality Applications', 
        span:'2022', 
        sub:'Hyper Island, Stockholm'},
        {title: 'Business Model Innovation', 
        span:'2021', 
        sub:'DHBW, Heilbronn'},
        {title: 'IoT Platforms for Industry 4.0', 
        span:'2018', 
        sub:'TUM/eit-Digital Summer School, Munich'},
    ]
    let speExp = [
        {title: 'Designing a Mixed Reality Game Experience to foster Social Initiation in Children with Autism', 
        stages: [
            {name: 'Code.Talks', 
            loc: 'Hamburg', 
            year:'2022', 
            url:'https://www.youtube.com/watch?v=mwWKOxKU0xc'}, 
            {name: 'Intersection', 
            loc: 'Turin', 
            year:'2022', 
            url:'https://www.youtube.com/watch?v=jW2XCKApE8s'},
            {name: 'Push UX', 
            loc: 'Munich', 
            year:'2021',},
        ]},
        {title: 'Transparency by design: Turning data into design and dark patterns in design', 
        stages: [
            {name: 'Data Natives', 
            loc: 'Berlin', 
            year:'2022', }, 
        ]},
        {title: 'Data Portraits: Turning Data into Design', 
        stages: [
            {name: 'WeAreDevelopers World Congress', 
            loc: 'Berlin', 
            year:'2022'}, 
            {name: 'Uppstart', 
            loc: 'Stockholm', 
            year:'2021', 
            url:'https://www.youtube.com/watch?v=0AFKj3Iug3I'},
        ]},
        {title: 'The occupational profile of Digital Accessibility Professionals', 
        stages: [
            {name: 'IAAP Panel Discussion', 
            loc: 'remote', 
            year:'2021', }, 
        ]},
        {title: 'Co-Founder, Host & Speaker', 
        stages: [
            {name: 'Munich Accessibility Meetup', 
            loc: 'Munich', 
            year:'2018-21',
            url: 'https://twitter.com/a11ymuc'}, 
        ]},
        ]

</script>

<Nav active='info'/>

<article>
    <Bio />
    <List type='Work' content={workExp}></List>
    <List type='Lecturing' content={lecExp}></List>
    <List type='Speaking' content={speExp}></List>
</article>

<Footer/>