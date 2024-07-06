// Combined Configuration options
var config = {
    "init_phones": ["MMagTech"],
    "default_channels": ["L", "R"],
    "default_normalization": "Hz",
    "default_norm_db": 70,
    "default_norm_hz": 500,
    "max_channel_imbalance": 5,
    "alt_layout": true,
    "alt_sticky_graph": true,
    "alt_animated": false,
    "alt_header": true,
    "alt_tutorial": true,
    "site_url": "index.html",
    "share_url": false,
    "watermark_text": "Jays Audio",
    "watermark_text2": "JaysAudio.github.io",
    "watermark_image_url": "img/vividici.png",
    "page_title": "Jays Audio",
    "page_description": "View and compare frequency response graphs for IEMs",
    "accessories": false,
    "externalLinksBar": true,
    "restricted": false,
    "expandable": false,
    "expandableOnly": false,
    "headerHeight": "0px",
    "darkModeButton": true,
    "targetDashed": true,
    "targetColorCustom": false,
    "labelsPosition": "bottom-left",
    "stickyLabels": true,
    "analyticsEnabled": false,
    "extraEnabled": true,
    "extraUploadEnabled": true,
    "extraEQEnabled": true,
    "extraEQBands": 10,
    "extraEQBandsMax": 20,
    "extraToneGeneratorEnabled": true,
    "headerLogoText": "Jays Audio",
    "headerLogoImgUrl": null,
    "advanced": {
        "headerLinks": [
            {
                "name": "GitHub",
                "url": "https://github.com/JaysAudio/JaysAudio.github.io"
            },
            {
                "name": "Head-Fi",
                "url": "https://www.head-fi.org/members/jayaudio88.563753/"
            },
            {
                "name": "HiFiGuides",
                "url": "https://forum.hifiguides.com/u/vividici_111/summary"
            },
            {
                "name": "YouTube",
                "url": "https://www.youtube.com/@jayyaudio"
            }
        ],
        "footerLinks": [
            {
                "label": "More Databases",
                "links": [
                    {
                        "name": "Bad Guy",
                        "url": "https://hbbdatabase.github.io/"
                    },
                    {
                        "name": "nymz",
                        "url": "https://nymz.squig.link/"
                    },
                    {
                        "name": "PaulWasabi",
                        "url": "https://pw.squig.link/"
                    },
                    {
                        "name": "Precogvision",
                        "url": "https://precog.squig.link/"
                    },
                    {
                        "name": "RikudouGoku",
                        "url": "https://rg.squig.link/"
                    },
                    {
                        "name": "Super Review",
                        "url": "https://squig.link/"
                    }
                ]
            }
        ],
        "targets": [
            {
                "type": "Preference",
                "files": ["Bad Guy", "MMagTech", "nymz", "PaulWasabi", "Precogvision", "RikudouGoku", "Rtings", "Sonarworks", "Super Review 21", "Super Review 22"]
            },
            {
                "type": "Reference",
                "files": ["Diffuse Field", "Etymotic", "IEF Neutral", "Harman 2019v2"]
            }
        ]
    }
};

// Set up the watermark, based on config options above
function watermark(svg) {
    let wm = svg.append("g")
        .attr("transform", "translate(" + (pad.l + W / 2) + "," + (pad.t + H * 0.15) + ")")
        .attr("opacity", 1.0);

    if (config.watermark_image_url) {
        wm.append("image")
            .attrs({ x: -150, y: -150, width: 300, height: 300, "xlink:href": config.watermark_image_url });
    }

    if (config.watermark_text) {
        wm.append("text")
            .attrs({ x: 290, y: 230, "font-size": 18, "text-anchor": "middle", "class": "graph-name" })
            .text(config.watermark_text);
        wm.append("text")
            .attrs({ x: 290, y: 255, "font-size": 18, "text-anchor": "middle", "class": "graph-name" })
            .text(config.watermark_text2);
    }
}

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

    if (!config.alt_layout) {
        applyStylesheet("style.css");
    } else {
        applyStylesheet("style-alt.css");
        applyStylesheet("style-alt-theme.css");
    }
}
setLayout();

// Set restricted mode
function setRestricted() {
    if (config.restricted) {
        max_compare = 2;
        restrict_target = false;
        disallow_target = true;
        premium_html = "<h2>You gonna pay for that?</h2><p>To use target curves, or more than two graphs, <a target='_blank' href='https://crinacle.com/wp-login.php?action=register'>subscribe</a> or upgrade to Patreon <a target='_blank' href='https://www.patreon.com/join/crinacle/checkout?rid=3775534'>Silver tier</a> and switch to <a target='_blank' href='https://crinacle.com/graphs/iems/graphtool/premium/'>the premium tool</a>.</p>";
    }
}
setRestricted();

// Configure HTML accessories to appear at the bottom of the page. Displayed only if accessories (above) is true
const simpleAbout = `
    <p class="center">This web software is based on the <a href="https://github.com/mlochbaum/CrinGraph">CrinGraph</a> open source software project.</p>
`;

// Which of the above variables to actually insert into the page
const whichAccessoriesToUse = simpleAbout;

// Set up analytics
function setupGraphAnalytics() {
    if (config.analyticsEnabled) {
        const pageHead = document.querySelector("head"),
            graphAnalytics = document.createElement("script"),
            graphAnalyticsSrc = "graphAnalytics.js";

        graphAnalytics.setAttribute("src", graphAnalyticsSrc);
        pageHead.append(graphAnalytics);
    }
}
setupGraphAnalytics();

// Load the graphs
function loadGraph() {
    // Your existing graph loading logic here
    let init_phones = config.init_phones;
    let default_channels = config.default_channels;
    // Continue using config properties directly
}
loadGraph();

// Tutorial definitions
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
        name
        : 'Upper midrange',
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
let targets = config.advanced.targets;

// Parse fr text data from REW or AudioTool format with whatever separator
function tsvParse(fr) {
    return fr.split(/[\r\n]/)
        .map(l => l.trim()).filter(l => l && l[0] !== '*')
        .map(l => l.split(/[\s,;]+/).map(e => parseFloat(e)).slice(0, 2))
        .filter(t => !isNaN(t[0]) && !isNaN(t[1]));
}

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

    if (!config.alt_layout) {
        applyStylesheet("style.css");
    } else {
        applyStylesheet("style-alt.css");
        applyStylesheet("style-alt-theme.css");
    }
}
setLayout();

// Set restricted mode
function setRestricted() {
    if (config.restricted) {
        max_compare = 2;
        restrict_target = false;
        disallow_target = true;
        premium_html = "<h2>You gonna pay for that?</h2><p>To use target curves, or more than two graphs, <a target='_blank' href='https://crinacle.com/wp-login.php?action=register'>subscribe</a> or upgrade to Patreon <a target='_blank' href='https://www.patreon.com/join/crinacle/checkout?rid=3775534'>Silver tier</a> and switch to <a target='_blank' href='https://crinacle.com/graphs/iems/graphtool/premium/'>the premium tool</a>.</p>";
    }
}
setRestricted();

// Configure HTML accessories to appear at the bottom of the page. Displayed only if accessories (above) is true
const simpleAbout = `
    <p class="center">This web software is based on the <a href="https://github.com/mlochbaum/CrinGraph">CrinGraph</a> open source software project.</p>
`;

// Which of the above variables to actually insert into the page
const whichAccessoriesToUse = simpleAbout;

// Set up analytics
function setupGraphAnalytics() {
    if (config.analyticsEnabled) {
        const pageHead = document.querySelector("head"),
            graphAnalytics = document.createElement("script"),
            graphAnalyticsSrc = "graphAnalytics.js";

        graphAnalytics.setAttribute("src", graphAnalyticsSrc);
        pageHead.append(graphAnalytics);
    }
}
setupGraphAnalytics();

// Load the graphs
function loadGraph() {
    // Your existing graph loading logic here
    let init_phones = config.init_phones;
    let default_channels = config.default_channels;
    // Continue using config properties directly
}
loadGraph();
