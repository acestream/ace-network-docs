# Roadmap

<link href="{{assets_root}}/css/jquery.roadmap.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css" />

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="{{assets_root}}/javascript/jquery.roadmap.js" type="text/javascript"></script>

<div id="my-timeline"></div>

<script type="text/javascript">
    $(document).ready(function(){

        var events = [
            {
                date: 'Q2 - 2022',
                content: 'Ace Network Docs Detalization'
            },
            {
                date: 'Q2 - 2022',
                content: 'Base Network Launch'
            },
            {
                date: 'Q2 - 2022',
                content: 'Wallet and Blockchain Tools<small>Wallet beta release, blockchain explorer</small>'
            },
            {
                date: 'Q3 - 2022',
                content: 'Prediction Market<small>Decentralized betting platform</small>'
            },
            {
                date: 'Q3 - 2022',
                content: 'Ace Meta Search<small>Beta release of Ace Meta Search</small>'
            },
            {
                date: 'Q3 - 2022',
                content: 'NFT Experience in Ace Network'
            },
            {
                date: 'Q3 - 2022',
                content: 'Decentralized Exchange (DEX)'
            },
            {
                date: 'Q3 - 2022',
                content: 'Ace Stream Live TV<small>for desktop and smartphones</small>'
            },
            {
                date: 'Q4 - 2022',
                content: 'Ace Media Hub'
            },

            {
                date: 'Q1 - 2023',
                content: 'Ace Network Level 1 Launch'
            },
            {
                date: 'Q1 - 2023',
                content: 'Ace Stream Engine SDK Release'
            },
            {
                date: 'Q1 - 2023',
                content: 'Ace Surf Release'
            },
            {
                date: 'Q1 - 2023',
                content: 'Ace ID Release<small>Decentralized Identity</small>'
            },
            {
                date: 'Q2 - 2023',
                content: 'Ace Network Levels 2 and 3 Launch'
            },
            {
                date: 'Q2 - 2023',
                content: 'Decentralized Content Moderation'
            },
        ];

        $('#my-timeline').roadmap(events, {
            orientation: 'vertical',
            eventsPerSlide: 99,
            slide: 1,
            prevArrow: '<i class="material-icons">keyboard_arrow_left</i>',
            nextArrow: '<i class="material-icons">keyboard_arrow_right</i>'
        });
    });
</script>