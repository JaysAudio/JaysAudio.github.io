

// Configuration options
var init_phones = ["MMagTech"],                             // Optional. Which graphs to display on initial load. Note: Share URLs will override this set
      DIR = "data/",                                // Directory where graph files are stored
	  DBDIR = "data/audio_db/",
      TARGETDIR = "data/targets/",
      default_channels = ["L","R"],                     // Which channels to display. Avoid javascript errors if loading just one channel per phone
      default_normalization = "Hz",                 // Sets default graph normalization mode. Accepts "dB" or "Hz"
      default_norm_db = 70,                         // Sets default dB normalization point
      default_norm_hz = 500,                        // Sets default Hz normalization point (500Hz is recommended by IEC)
      max_channel_imbalance = 5,                    // Channel imbalance threshold to show ! in the channel selector
      alt_layout = true,                            // Toggle between classic and alt layouts
      alt_sticky_graph = true,                      // If active graphs overflows the viewport, does the graph scroll with the page or stick to the viewport?
      alt_animated = false,                         // Determines if new graphs are drawn with a 1-second animation, or appear instantly
      alt_header = true,                            // Display a configurable header at the top of the alt layout
      alt_tutorial = true,                         // Display a configurable frequency response guide below the graph
      site_url = 'index.html',                              // URL of your graph "homepage"
      share_url = false,                             // If true, enables shareable URLs
      watermark_text = "Jays Audio",                 // Optional. Watermark appears behind graphs
      watermark_text2 = "vividici.github.io",
      watermark_image_url = "img/vividici.png",   // Optional. If image file is in same directory as config, can be just the filename
      page_title = "frDB",                     // Optional. Appended to the page title if share URLs are enabled
      page_description = "View and compare frequency response graphs for IEMs",
      accessories = false,                          // If true, displays specified HTML at the bottom of the page. Configure further below
      externalLinksBar = true,                      // If true, displays row of pill-shaped links at the bottom of the page. Configure further below
      restricted = false,                           // Enables restricted mode. More restricted options below
      expandable = false,                           // Enables button to expand iframe over the top of the parent page
      expandableOnly = false,                       // Prevents iframe interactions unless the user has expanded it. Accepts "true" or "false" OR a pixel value; if pixel value, that is used as the maximum width at which expandableOnly is used
      headerHeight = '0px',                         // Optional. If expandable=true, determines how much space to leave for the parent page header
      darkModeButton = true,                        // Adds a "Dark Mode" button the main toolbar to let users set preference
      targetDashed = true,                         // If true, makes target curves dashed lines
      targetColorCustom = false,                    // If false, targets appear as a random gray value. Can replace with a fixed color value to make all targets the specified color, e.g. "black"
      labelsPosition = "bottom-left",                  // Up to four labels will be grouped in a specified corner. Accepts "top-left," bottom-left," "bottom-right," and "default"
      stickyLabels = true,                          // "Sticky" labels 
      analyticsEnabled = false,                     // Enables Google Analytics 4 measurement of site usage
      extraEnabled = true,                          // Enable extra features
      extraUploadEnabled = true,                    // Enable upload function
      extraEQEnabled = true,                        // Enable parametic eq function
      extraEQBands = 10,                            // Default EQ bands available
      extraEQBandsMax = 20,                         // Max EQ bands available
      extraToneGeneratorEnabled = true;             // Enable tone generator function


// *************************************************************
// Functions to support config options set above; probably don't need to change these
// *************************************************************

// Set up the watermark, based on config options above
function watermark(svg) {
    let wm = svg.append("g")
        .attr("transform", "translate("+(pad.l+W/2)+","+(pad.t+H/2-20)+")")
        .attr("opacity",1.0);
    
    if ( watermark_image_url ) {
        wm.append("image")
            .attrs({x:-64, y:-110, width:200, height:200, "xlink:href":watermark_image_url});
    }
    
    if ( watermark_text ) {
        wm.append("text")
            .attrs({x:200, y:141, "font-size":16, "text-anchor":"middle", "class":"graph-name"})
            .text(watermark_text);
        wm.append("text")
            .attrs({x:200, y:161, "font-size":16, "text-anchor":"middle", "class":"graph-name"})
            .text(watermark_text2);	
    }
}

// If alt_header is enabled, these are the items added to the header
let headerLogoText = "Jays Audio",
headerLinks = [
// {
//     name: "GitHub",
//     url: "https://github.com/MMagTech/MMagTech.github.io"
// },
// {
//     name: "Head-Fi",
//     url: "https://www.head-fi.org/members/mmag1983.556792/"
// },
// {
//     name: "HifiGuides",
//     url: "https://forum.hifiguides.com/u/vividici_111/summary"
// },
// {
//     name: "Youtube",
//     url: "https://www.youtube.com/@jayyaudio"
// }
];

// Configure external links to appear at the bottom of the page. Displayed only if externalLinksBar (above) is true
let linkSets = [
    // {
    //     label: "More Databases",
    //     links: [
	//         {
    //             name: "Bad Guy",
    //             url: "https://hbbdatabase.github.io/"
    //         },
    //         {
    //             name: "nymz",
    //             url: "https://nymz.squig.link/"
    //         },
	//		   {
	//             name: "PaulWasabi",
    //             url: "https://pw.squig.link/"
	//		   },
    //         {
	//             name: "RikudouGoku",
    //             url: "https://rg.squig.link/"
	//		   },
	//         {
	//             name: "Precogvision",
    //             url: "https://precog.squig.link/"
	//         },
	//         {
	//             name: "Super Review",
    //             url: "https://rg.squig.link/"
	//         }
    //     ]
    // }
];

let tutorialDefinitions = [
    {
        name: 'Sub bass',
        width: '20.1%',
        description: '<b>Sub bass</b> frequencies are responsible for rumble. Elevated sub bass can lend an added sense of depth to music, and usually does not come at the expense of "bleeding into the midrange." Is there a limit to how much sub bass sounds good? Some may argue no, but I find too much sub bass can sound conspicuously disjointed from the rest of the music. It\'s notable, however, that a lot of music is light on usage of sub bass, so a sound signature that\'s big on sub-bass but light on mid bass may not sound very bassy with some popular recordings.'
    },
    {
        name: 'Mid bass',
        width: '19.2%',
        description: '<b>Mid bass</b> is responsible for a sense of punch. In contrast to sub bass, mid bass is typically more percussive and energetic, feeling like it\'s literally pushing air, and can lend a sense of body and fullness to a sound. Listeners craving a "bassy" sound will commonly be more satisfied by mid bass emphasis, as it will add a bassy punch to most common music. However, too much mid bass can give the sound a sense of bloat, or even yield the dreaded midrange "bleed" in which lower midrange notes are masked and smeared by excessive mid bass presence. Ideally, mid bass tapers off by 200Hz.'
    },
    {
        name: 'Lower midrange',
        width: '17.4%',
        description: 'A full <b>lower midrange</b>, tapering upward into the bass region, can lend a sense of thickness and warmth to the overall tone, while a "scooped" lower midrange can give a very clean sound at the cost of some thinness to the body. A lot of deep vocal micro detail depends on a well-executed lower midrange. But lower midrange is often sacrificed to create contrast between bass and treble for a typical "V-shaped" sound signature, which will commonly exhibit less natural vocal timbre than a more linear midrange tune.'
    },
    {
        name: 'Upper midrange',
        width: "20%",
        description: '<b>Upper midrange</b> is where a lot of "clarity" in a tune comes from. An elevated -- or "forward" -- upper midrange typically results in a forward vocal presentation, especially emphasizing higher-pitched vocals. Trumpets and guitars get their bite from upper midrange frequencies. Too much upper midrange can result in shrill or "shouty" vocals. Too little can result in a distant, recessed sound that\'s low on clarity. And uneven upper midrange emphasis can lead to oddly nasal or hollow vocals, with other odd timbral effects.'
    },
    {
        name: 'Presence region',
        width: '6%',
        description: 'Also commonly referred to as "lower treble," the <b>presence region</b> has a lot to do with the naturalness of vocal transients. Too much emphasis here and vocals may take on an "edgy" or metallic character. Too little emphasis and the tune can lose definition and sound soft or dark. Much of the initial bite of trumpet and acoustic guitar string transients comes from a well-tuned presence region.'
    },
    {
        name: 'Mid treble',
        width: '7.3%',
        description: 'A lot of treble harshness and fatigue comes from the <b>mid treble</b>. Peaks in this region commonly result in unpleasant sharpness, or sibilance in vocals which adds abrasive harshness to S and T sounds. Too little mid treble, however, will result in a dark or dead sound, resulting in odd timbre to cymbal strikes. Making matters difficult for us graph readers, there is a commonly-observed "resonance peak" that appears in measurements, usually situated at 8kHz, that is an artifact of the measurement process. It can often be hard to tell how much of such a peak is "real" without listening.'
    },
    {
        name: 'Air',
        width: '10%',
        description: 'In the way sub bass can add a sense of depth to the low end, <b>air</b> frequencies -- also called upper treble -- can add a dimensionality via the top end. When air frequencies are "rolled off," the sound may lose a sense of micro detail and definition, and cymbals may lose shimmer, leaving them blunt in their decay. Too much air is not common, but certainly possible, resulting in a fatiguing "shh shh" to cymbals, drum brushes, and other high-frequency sounds.'
    }
];

// Specify which targets to display
let targets = [
    // { type:"Preference",   
	//     files:["Bad Guy","MMagTech","nymz","PaulWasabi","Precogvision","Rtings","Sonarworks","Super Review 21","Super Review 22"] },
    // { type:"Reference", 
	//     files:["Diffuse Field","Etymotic","IEF Neutral","Harman 2019v2"] }
];


// Parse fr text data from REW or AudioTool format with whatever separator
function tsvParse(fr) {
    return fr.split(/[\r\n]/)
        .map(l => l.trim()).filter(l => l && l[0] !== '*')
        .map(l => l.split(/[\s,;]+/).map(e => parseFloat(e)).slice(0, 2))
        .filter(t => !isNaN(t[0]) && !isNaN(t[1]));
}
    
     
d3.json('config_vividici.json').then(function(mycfg){
    init_phones = mycfg.init_phones;
    default_channels = mycfg.default_channels; 
    default_normalization = mycfg.default_normalization; 
    default_norm_db = mycfg.default_norm_db;   
    default_norm_hz = mycfg.default_norm_hz;  
    max_channel_imbalance = mycfg.max_channel_imbalance;  
    alt_layout = mycfg.alt_layout;
    alt_sticky_graph = mycfg.alt_sticky_graph; 
    alt_animated = mycfg.alt_animated;
    alt_header = mycfg.alt_header; 
    alt_tutorial = mycfg.alt_tutorial;  
    site_url = mycfg.site_url;
    share_url = mycfg.site_url;
    watermark_text = mycfg.watermark_text;
    watermark_text2 = mycfg.watermark_text2;
    watermark_image_url = mycfg.watermark_image_url;
    page_title = mycfg.page_title; 
    page_description = mycfg.page_description;
    accessories = mycfg.accessories;
    externalLinksBar = mycfg.externalLinksBar;
    restricted = mycfg.restricted;
    expandable = mycfg.expandable;
    expandableOnly = mycfg.expandableOnly;
    headerHeight = mycfg.headerHeight;  
    darkModeButton = mycfg.darkModeButton;  
    targetDashed = mycfg.targetDashed;
    targetColorCustom = mycfg.targetColorCustom;    
    labelsPosition = mycfg.labelsPosition;   
    stickyLabels = mycfg.stickyLabels;          
    analyticsEnabled = mycfg.analyticsEnabled;  
    extraEnabled = mycfg.extraEnabled;       
    extraUploadEnabled = mycfg.extraUploadEnabled;     
    extraEQEnabled = mycfg.extraUploadEnabled;
    extraEQBands = mycfg.extraEQBands;           
    extraEQBandsMax = mycfg.extraEQBandsMax;
    extraToneGeneratorEnabled = mycfg.extraToneGeneratorEnabled; 
    targets = mycfg.advanced.targets;
    headerLinks = mycfg.advanced.headerLinks;
    linkSets = mycfg.advanced.footerLinks;
    headerLogoText = mycfg.headerLogoText;
    headerLogoImgUrl = mycfg.headerLogoImgUrl;
    // alert(watermark_text);

    // load graphs
    loadGraph();    
	
    // Apply stylesheet based layout options above
    function setLayout() {
        function applyStylesheet(styleSheet) {
            var docHead = document.querySelector("head"),
                linkTag = document.createElement("link");
            
            linkTag.setAttribute("rel", "stylesheet");
            linkTag.setAttribute("type", "text/css");
            
            linkTag.setAttribute("href", styleSheet);
            docHead.append(linkTag);
        }

        if ( !alt_layout ) {
            applyStylesheet("style.css");
        } else {
            applyStylesheet("style-alt.css");
            applyStylesheet("style-alt-theme.css");
        }
    }
    setLayout();



    // Set restricted mode
    function setRestricted() {
        if ( restricted ) {
            max_compare = 2;
            restrict_target = false;
            disallow_target = true;
            premium_html = "<h2>You gonna pay for that?</h2><p>To use target curves, or more than two graphs, <a target='_blank' href='https://crinacle.com/wp-login.php?action=register'>subscribe</a> or upgrade to Patreon <a target='_blank' href='https://www.patreon.com/join/crinacle/checkout?rid=3775534'>Silver tier</a> and switch to <a target='_blank' href='https://crinacle.com/graphs/iems/graphtool/premium/'>the premium tool</a>.</p>";
        }
    }
    setRestricted();



    // Configure HTML accessories to appear at the bottom of the page. Displayed only if accessories (above) is true
    // There are a few templates here for ease of use / examples, but these variables accept any HTML
    const 
        // Short text, center-aligned, useful for a little side info, credits, links to measurement setup, etc. 
        simpleAbout = `
            <p class="center">This web software is based on the <a href="https://github.com/mlochbaum/CrinGraph">CrinGraph</a> open source software project.</p>
        `,
        // Slightly different presentation to make more readable paragraphs. Useful for elaborated methodology, etc.
        paragraphs = `
            <h2>Viverra tellus in hac</h2>

            <p>Lorem ipsum dolor sit amet, <a href="">consectetur adipiscing elit</a>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque non tellus orci ac. Dictumst quisque sagittis purus sit amet volutpat consequat. Vitae nunc sed velit dignissim sodales ut. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Dignissim enim sit amet venenatis urna cursus eget nunc. Mi proin sed libero enim. Ut sem viverra aliquet eget sit amet. Integer enim neque volutpat ac tincidunt vitae. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Lacus luctus accumsan tortor posuere ac ut consequat semper. Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Aliquam sem et tortor consequat id. Cursus sit amet dictum sit amet justo donec. Donec adipiscing tristique risus nec feugiat in fermentum posuere.</p>

            <p>Diam donec adipiscing tristique risus nec. Amet nisl purus in mollis. Et malesuada fames ac turpis egestas maecenas pharetra. Ante metus dictum at tempor commodo ullamcorper a. Dui id ornare arcu odio ut sem nulla. Ut pharetra sit amet aliquam id diam maecenas. Scelerisque in dictum non consectetur a erat nam at. In ante metus dictum at tempor. Eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Euismod nisi porta lorem mollis aliquam ut porttitor leo a. Malesuada proin libero nunc consequat interdum. Turpis egestas sed tempus urna et pharetra pharetra massa massa. Quis blandit turpis cursus in hac habitasse. Amet commodo nulla facilisi nullam vehicula ipsum a.</p>

            <p>Mauris ultrices eros in cursus turpis massa tincidunt. Aliquam ut porttitor leo a diam sollicitudin. Curabitur vitae nunc sed velit. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Lectus nulla at volutpat diam ut. Nibh nisl condimentum id venenatis a condimentum vitae sapien. Tincidunt id aliquet risus feugiat in ante metus. Elementum nibh tellus molestie nunc non blandit massa enim. Ac tortor vitae purus faucibus ornare suspendisse. Pellentesque sit amet porttitor eget. Commodo quis imperdiet massa tincidunt. Nunc sed id semper risus in hendrerit gravida. Proin nibh nisl condimentum id venenatis a condimentum. Tortor at risus viverra adipiscing at in. Pharetra massa massa ultricies mi quis hendrerit dolor. Tempor id eu nisl nunc mi ipsum faucibus vitae.</p>

            <h2>Tellus orci</h2>

            <p>Viverra mauris in aliquam sem. Viverra tellus in hac habitasse platea. Facilisi nullam vehicula ipsum a arcu cursus. Nunc sed augue lacus viverra vitae congue eu. Pretium fusce id velit ut tortor pretium viverra suspendisse. Eu scelerisque felis imperdiet proin. Tincidunt arcu non sodales neque sodales ut etiam sit amet. Tellus at urna condimentum mattis pellentesque. Congue nisi vitae suscipit tellus. Ut morbi tincidunt augue interdum.</p>

            <p>Scelerisque in dictum non consectetur a. Elit pellentesque habitant morbi tristique senectus et. Nulla aliquet enim tortor at auctor urna nunc id. In ornare quam viverra orci. Auctor eu augue ut lectus arcu bibendum at varius vel. In cursus turpis massa tincidunt dui ut ornare lectus. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. A diam sollicitudin tempor id. Tellus mauris a diam maecenas sed enim ut sem. Pellentesque id nibh tortor id aliquet lectus proin. Fermentum et sollicitudin ac orci phasellus. Dolor morbi non arcu risus quis. Bibendum enim facilisis gravida neque. Tellus in metus vulputate eu scelerisque felis. Integer malesuada nunc vel risus commodo. Lacus laoreet non curabitur gravida arcu.</p>
        `,
        // Customize the count of widget divs, and customize the contents of them. As long as they're wrapped in the widget div, they should auto-wrap and maintain margins between themselves
        widgets = `
            <div class="accessories-widgets">
                <div class="widget">
                    <img width="200" src="/img/vividici-logo.svg"/>
                </div>

                <div class="widget">
                    <img width="200" src="/img/vividici-logo.svg"/>
                </div>

                <div class="widget">
                    <img width="200" src="cringraph-logo.svg"/>
                </div>
            </div>
        `,
        // Which of the above variables to actually insert into the page
        whichAccessoriesToUse = simpleAbout;



    



    // Set up analytics
    function setupGraphAnalytics() {
        if ( analyticsEnabled ) {
            const pageHead = document.querySelector("head"),
                graphAnalytics = document.createElement("script"),
                graphAnalyticsSrc = "graphAnalytics.js";
            
            graphAnalytics.setAttribute("src", graphAnalyticsSrc);
            pageHead.append(graphAnalytics);
        }
    }
    setupGraphAnalytics();

});
